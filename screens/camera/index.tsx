import { useEffect, useRef, useState } from "react";
import { ScreenContext } from "../../providers/context";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { BackHandler } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as FileSystem from "expo-file-system";
import CameraView from "./view";
import { getModel } from "../../lib/tensor-helper";
import { DASHBOARD, PLANT_INFO } from "../../constants/screen-names";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";

const OUTPUT_TENSOR_WIDTH = 270;
const OUTPUT_TENSOR_HEIGHT = 480;
const CustomCamera = ({ navigation }: any) => {
  const [model, setModel] = useState<any>();
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [textChange, setTextChange] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderState, setLoaderState] = useState<string>("Constructing Image");
  const [currentPhoto, setCurrentPhoto] = useState<any>();
  const [cameraDisabled, setCameraDisabled] = useState<boolean>(false);
  let camera = useRef<Camera>();

  const customCrop = (tensor: any) => {
    const f =
      (OUTPUT_TENSOR_HEIGHT - OUTPUT_TENSOR_WIDTH) / 2 / OUTPUT_TENSOR_HEIGHT;
    const cropped = tf.image.cropAndResize(
      tensor,
      tf.tensor2d([f, 0, 1 - f, 1], [1, 4]),
      [0],
      [224, 224]
    );

    return cropped;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setStartCamera(true);
      } else {
        setStartCamera(false);
      }

      tf.setBackend("cpu");
      await tf.ready();
      setModel(await getModel());
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(DASHBOARD, { keyState: 0 });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const takePictureHandler = async () => {
    try {
      if (camera.current) {
        setCameraDisabled(true);
        const imageData = await camera.current.takePictureAsync({
          base64: true,
        });
        setLoading(true);
        setCurrentPhoto(imageData);

        const res = await processImagePrediction(imageData);
        setLoading(false);
        setCameraDisabled(false);
        setStartCamera((prev) => !prev);
        navigation.navigate(PLANT_INFO, res);
        setTextChange("Constructing Image");
      }
    } catch (err) {
      setCameraDisabled(false);
      console.log("ERR: ", err);
    }
  };

  const processImagePrediction = async (base64Image: CameraCapturedPicture) => {
    const imgB64 = await FileSystem.readAsStringAsync(base64Image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const predictedData = tf.tidy(() => {
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      setTextChange("Constructing Image");
      const raw = new Uint8Array(imgBuffer);
      let imageTensor = decodeJpeg(raw);
      setTextChange("Decoding Image");
      const tensorScaled = imageTensor.expandDims(0).div(127.5).sub(1);
      const img = customCrop(tensorScaled);
      setTextChange("Recognizing Image");
      const predict = model.predict(img);
      let result = predict.dataSync();
      const highestPrediction = result.indexOf(Math.max.apply(null, result));
      const percent = Math.pow(10, 2) * result[highestPrediction];
      return {
        prediction: highestPrediction,
        percentage: percent.toFixed(2),
      };
    });

    return predictedData;
  };

  useEffect(() => {
    if (textChange) {
      setLoaderState(textChange);
    }
  }, [textChange]);

  const values = {
    camera,
    takePictureHandler,
    loading,
    cameraDisabled,
  };

  return (
    <ScreenContext.Provider value={values}>
      <CameraView />
    </ScreenContext.Provider>
  );
};

export default CustomCamera;
