import { useContext, useEffect, useRef, useState } from "react";
import { ScreenContext } from "../../providers/context";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { Dimensions, Platform, Image, BackHandler } from "react-native";
import { Text } from "native-base";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import * as FileSystem from "expo-file-system";
// import * as tmImage from "@teachablemachine/image";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import CameraView from "./view";
import {
  convertBase64ToTensor,
  cropPicture,
  getModel,
  startPrediction,
} from "../../lib/tensor-helper";
import { DASHBOARD, PLANT_INFO } from "../../constants/screen-names";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";

const RESULT_MAPPING = [
  "Akapulko",
  "Ampalaya",
  "Bawang",
  "Bayabas",
  "Lagundi",
  "Sambong",
  "Tsaang-gubat",
  "Ulasimang-bato",
  "Yerba-buena",
];
const OUTPUT_TENSOR_WIDTH = 270;
const OUTPUT_TENSOR_HEIGHT = 480;
const URL = "https://teachablemachine.withgoogle.com/models/U--trar6n/";
const { height, width } = Dimensions.get("window");
const CustomCamera = ({ navigation }: any) => {
  const [model, setModel] = useState<any>();
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [textChange, setTextChange] = useState<string>("")
  const [accuracyPercentage, setAccuracyPercentage] = useState<number|null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderState, setLoaderState] = useState<string>("Constructing Image");
  // const [prediction, setPrediction] = useState<any>();
  const [currentPhoto, setCurrentPhoto] = useState<any>();
  let camera = useRef<Camera>();
  let context = useRef<CanvasRenderingContext2D>();
  let canvas = useRef<Canvas>();
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  let frame = 0;
  const computeRecognitionEveryNFrames = 60;
  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };

  const customCrop = (tensor: any) => {
    const f =
      (OUTPUT_TENSOR_HEIGHT - OUTPUT_TENSOR_WIDTH) / 2 / OUTPUT_TENSOR_HEIGHT;
    const cropped = tf.image.cropAndResize(
      // Image tensor.
      tensor,
      // Boxes. It says we start cropping from (x=0, y=f) to (x=1, y=1-f).
      // These values are all relative (from 0 to 1).
      tf.tensor2d([f, 0, 1 - f, 1], [1, 4]),
      // The first box above
      [0],
      // The final size after resize.
      [224, 224]
    );

    return cropped;
  };

  const handleCameraStream = async (images: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      if (frame % computeRecognitionEveryNFrames === 0) {
        const nextImageTensor = images
          .next()
          .value.expandDims(0)
          .div(127.5)
          .sub(1);

        const results = model.predict(customCrop(nextImageTensor));
        const prediction = results.dataSync();
        const highestPrediction = prediction.indexOf(
          Math.max.apply(null, prediction)
        );

        // const imageData2 = tf.image.resizeBilinear(nextImageTensor,[224,224])
        // const prediction = await startPrediction(model, tf.expandDims(imageData2, 0));
        console.log(RESULT_MAPPING[highestPrediction]);
        tf.dispose([nextImageTensor]);
      }
      frame += 1;
      frame = frame % computeRecognitionEveryNFrames;

      requestAnimationFrame(loop);
    };
    loop();
    /* const loop = async () => {
      // if (!model || !nextImageTensor)
      // throw new Error("No Model or image tensor");
      if (frame % computeRecognitionEveryNFrames === 0) {
        const nextImageTensor = images.next().value;
        if(nextImageTensor ){
          const tensor = tf.image.resizeBilinear(nextImageTensor, [224,224]);
          const prediction = await startPrediction(model, tf.expandDims(tensor, 0))
          
          console.log("PREDICT: ", prediction);
          tf.dispose([nextImageTensor]);
        }
        /* model
          .detect(nextImageTensor)
          .then((prediction: any) => {
            drawRectangle(prediction, nextImageTensor);
          })
          .catch((error: any) => {
            console.log("error ini", error);
          });

        requestAnimationFrame(loop);
      }
      loop();
    }; */
  };
  /*   
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

      tf.setBackend("cpu");
      await tf.ready();
      // tf.getBackend();
      // setModel(await cocoSsd.load());
      // setModel(await tmImage.load(modelURL, metadataURL));
      setModel(await getModel());
    })();
  }, []);

  useEffect(() => {
    console.log("Trigger", loaderState);
    
  }, [loaderState])

  useEffect(() => {
    const backAction = () => {
      navigation.navigate(DASHBOARD, {keyState: 0})
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
        // const imageData = await camera.current.takePictureAsync();
        const imageData = await camera.current.takePictureAsync({
          base64: true,
        });
        setCurrentPhoto(imageData);

        const res = await processImagePrediction(imageData);
        console.log("PREDICTION: ", res);
        setLoading(false);
        setStartCamera((prev) => !prev);
        navigation.navigate(PLANT_INFO, res);
        setTextChange("Constructing Image");
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
      console.log("ERR: ", err);
    }
    // setPickedImage(image.uri)
    // props.onImageTaken(image.uri)
  };

  const processImagePrediction = async (base64Image: CameraCapturedPicture) => {
    setLoading(true)
    const imgB64 = await FileSystem.readAsStringAsync(base64Image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const predictedData = tf.tidy(() => {
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      setTextChange("Constructing Image");
      console.log("construct");
      const raw = new Uint8Array(imgBuffer);
      let imageTensor = decodeJpeg(raw);
      setTextChange("Decoding Image");
      console.log("decode");
      const tensorScaled = imageTensor.expandDims(0).div(127.5).sub(1);
      const img = customCrop(tensorScaled);
      setTextChange("Recognizing Image")
      console.log("predict");
      const predict = model.predict(img);
      let result = predict.dataSync();
      const highestPrediction = result.indexOf(Math.max.apply(null, result));
      const percent = Math.pow(10,2) * result[highestPrediction]
      console.log("PERCENTAGE: ", percent.toFixed(2));
      return {
        prediction: highestPrediction,
        percentage: percent.toFixed(2)
      }
    });

    return predictedData;
    // const scalar = tf.scalar(127.5);
    // imageTensor = tf.image.resizeNearestNeighbor(imageTensor, [224, 224]);
    // const tensorScaled = imageTensor.div(scalar);
    // const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);
    // const predict = await model.predict(imageTensor.expandDims(0).div(127.5).sub(1))
    // console.log("FINAL RES: ", cleanUpResult?.print());

    // const croppedData: any = await cropPicture(base64Image, 350);
    // const tensor = await convertBase64ToTensor(croppedData.base64);
    // console.log("TENSOR: ", tensor?.print());
    // // const croppedData: any = await cropPicture(base64Image, 300);
    // // const tensor = imageToTensor(croppedData.base64);
    // console.log("TENSOR: ", tensor?.print());
    // const predictionL = await startPrediction(model, tensor);
    // console.log("PREDICTION: ", predictionL);
    // const highestPrediction = predictionL.indexOf(
    //   Math.max.apply(null, predictionL)
    // );
    // setPrediction(RESULT_MAPPING[highestPrediction]);
    // navigation.navigate(PLANT_INFO, {
    //   prediction: RESULT_MAPPING[highestPrediction],
    // });
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

  useEffect(() => {
    if(textChange){
      setLoaderState(textChange)
    }
  }, [textChange]);

  const values = {
    handleCameraStream,
    textureDims,
    // handleCanvas,
    startCamera,
    camera,
    takePictureHandler,
    renderPrediction,
    // prediction,
    currentPhoto,
    loading,
    loaderState,
  };

  return (
    <ScreenContext.Provider value={values}>
      <CameraView />
    </ScreenContext.Provider>
  );
};

export default CustomCamera;
