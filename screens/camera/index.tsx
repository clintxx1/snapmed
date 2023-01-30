import { useContext, useEffect, useRef, useState } from "react";
import { ScreenContext } from "../../providers/context";
import { Camera } from "expo-camera";
import { Dimensions, Platform, Image } from "react-native";
import { Text } from "native-base";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import * as FileSystem from "expo-file-system";
import * as tmImage from "@teachablemachine/image";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import CameraView from "./view";
import {
  convertBase64ToTensor,
  cropPicture,
  getModel,
  startPrediction,
} from "../../lib/tensor-helper";
import { PLANT_INFO } from "../../constants/screen-names";

const RESULT_MAPPING = ["Lagundi", "Bayabas", "Tsaang-Gubat"];
const URL = "https://teachablemachine.withgoogle.com/models/U--trar6n/";
const { height, width } = Dimensions.get("window");
const CustomCamera = ({navigation}:any) => {
  const [model, setModel] = useState<any>();
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<any>();
  const [currentPhoto, setCurrentPhoto] = useState<any>();
  let camera = useRef<Camera>();
  let context = useRef<CanvasRenderingContext2D>();
  let canvas = useRef<Canvas>();
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };

  /*   const handleCameraStream = (images: any) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor)
        throw new Error("No Model or image tensor");
      model
        .detect(nextImageTensor)
        .then((prediction: any) => {
          drawRectangle(prediction, nextImageTensor);
        })
        .catch((error: any) => {
          console.log("error ini", error);
        });

      requestAnimationFrame(loop);
    };
    loop();
  };

  const drawRectangle = (
    predictions: cocoSsd.DetectedObject[],
    nextImageTensor: any
  ) => {
    if (!context.current || !canvas.current) return;

    const scaleWidth = width / nextImageTensor.shape[1];
    const scaleHeight = height / nextImageTensor.shape[0];

    const flipHorizontal = Platform.OS == "ios" ? false : true;

    context.current.clearRect(0, 0, width, height);

    for (const prediction of predictions) {
      const [x, y, width, height] = prediction.bbox;

      const boundingBoxX = flipHorizontal
        ? canvas.current.width - x * scaleWidth - width * scaleWidth
        : x * scaleWidth;
      const boundingBoxY = y * scaleHeight;

      context.current.strokeRect(
        boundingBoxX,
        boundingBoxY,
        width * scaleWidth,
        height * scaleHeight
      );
      context.current.strokeText(
        prediction.class,
        boundingBoxX - 5,
        boundingBoxY - 5
      );
    }
  };
  const handleCanvas = (can: Canvas) => {
    if (can) {
      can.width = width;
      can.height = height;
      const ctx: CanvasRenderingContext2D = can.getContext("2d");
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.lineWidth = 1;

      context.current = ctx;
      canvas.current = can;
    }
  }; */

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setStartCamera(true);
      } else {
        setStartCamera(false);
      }

      await tf.ready();
      // setModel(await cocoSsd.load());
      // setModel(await tmImage.load(modelURL, metadataURL));
      setModel(await getModel());
    })();
  }, []);

  const takePictureHandler = async () => {
    try {
      if (camera.current) {
        const imageData = await camera.current.takePictureAsync({
          base64: true,
        });
        setCurrentPhoto(imageData);

        processImagePrediction(imageData);
        setStartCamera((prev) => !prev);
        /* const options = {
          quality: 0.5,
          base64: true,
          skipProcessing: true,
        };
        let photo = await camera.current.takePictureAsync(options);
        const imageAssetPath = Image.resolveAssetSource(photo);
        setCurrentPhoto(imageAssetPath.uri);
        const imgB64 = await FileSystem.readAsStringAsync(imageAssetPath.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
        const raw = new Uint8Array(imgBuffer);
        const imageTensor = imageToTensor(raw);
        console.log("imageTensor: ", imageTensor);
        const { pose, posenetOutput } = await model.estimatePose(photo);
        let p = await model.predict(posenetOutput);
        console.log("PREDICTION: ", p);
        setPrediction(p);
        setStartCamera(prev => !prev)  */

        // this.setState({ predictions: predictions })

        // setPic(photo.uri)
        // dispatch(takePicture(photo.uri))
        // setShowModal(true)
      }
    } catch (err) {
      console.log("hehe", err);
    }
    // setPickedImage(image.uri)
    // props.onImageTaken(image.uri)
  };

  const processImagePrediction = async (base64Image: any) => {
    const croppedData: any = await cropPicture(base64Image, 350);
    const tensor = await convertBase64ToTensor(croppedData.base64);
    console.log("TENSOR: ", tensor?.print());
    // const croppedData: any = await cropPicture(base64Image, 300);
    // const tensor = imageToTensor(croppedData.base64);
    console.log("TENSOR: ", tensor?.print());
    const predictionL = await startPrediction(model, tensor);
    console.log("PREDICTION: ", predictionL);
    const highestPrediction = predictionL.indexOf(
      Math.max.apply(null, predictionL)
    );
    setPrediction(RESULT_MAPPING[highestPrediction]);
    navigation.navigate(PLANT_INFO, {
      prediction: RESULT_MAPPING[highestPrediction]
    })

  };

  const imageToTensor = (rawImageData: Uint8Array) => {
    const { width, height, data } = jpeg.decode(rawImageData, {
      useTArray: true,
    });
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  };

  const renderPrediction = (prediction: any, index: any) => {
    const pclass = prediction.class;
    const score = prediction.score;
    const x = prediction.bbox[0];
    const y = prediction.bbox[1];
    const w = prediction.bbox[2];
    const h = prediction.bbox[3];
    console.log("RENDER DATA: ", prediction);

    return (
      <Text key={index}>
        Prediction: {pclass} {", "} Probability: {score} {", "} Bbox: {x} {", "}{" "}
        {y} {", "} {w} {", "} {h}
      </Text>
    );
  };

  const values = {
    // handleCameraStream,
    textureDims,
    // handleCanvas,
    startCamera,
    camera,
    takePictureHandler,
    renderPrediction,
    prediction,
    currentPhoto,
  };

  return (
    <ScreenContext.Provider value={values}>
      <CameraView />
    </ScreenContext.Provider>
  );
};

export default CustomCamera;
