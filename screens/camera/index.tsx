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
import { decodeJpeg, fetch } from "@tensorflow/tfjs-react-native";

const RESULT_MAPPING = ["Akapulko", "Bayabas", "Lagundi", "Sambong", "Ulasimang Bato", "Yerba Buena"];
const OUTPUT_TENSOR_WIDTH = 270;
const OUTPUT_TENSOR_HEIGHT = 480;
const URL = "https://teachablemachine.withgoogle.com/models/U--trar6n/";
const { height, width } = Dimensions.get("window");
const CustomCamera = ({ navigation }: any) => {
  const [model, setModel] = useState<any>();
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<any>();
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

  const handleCameraStream = async (images: IterableIterator<tf.Tensor3D>) => {
    const loop = async () => {
      if(frame % computeRecognitionEveryNFrames === 0){
        // const nextImageTensor = images.next().value;
        const nextImageTensor = images.next().value.expandDims().div(127.5).sub(1);
        console.log(nextImageTensor, "tensor");
        
        const f =
          (OUTPUT_TENSOR_HEIGHT - OUTPUT_TENSOR_WIDTH) /
          2 /
          OUTPUT_TENSOR_HEIGHT;
        const cropped = tf.image.cropAndResize(
          // Image tensor.
          nextImageTensor,
          // Boxes. It says we start cropping from (x=0, y=f) to (x=1, y=1-f).
          // These values are all relative (from 0 to 1).
          tf.tensor2d([f, 0, 1 - f, 1], [1, 4]),
          // The first box above
          [0],
          // The final size after resize.
          [224, 224]
        );
        const results = model.predict(cropped);
        const prediction = results.dataSync();
        console.log("PREDICTION: ", prediction)
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
  }
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

      await tf.setBackend('cpu');
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
    const fileUri = base64Image.uri;
    // const response = await fetch(fileUri, {}, {isBinary: true});
    // const rawImageData = await response.arrayBuffer();
    // const imageTensor = imageToTensorf(rawImageData);
    // console.log(`Shape of image tensor -> ${imageTensor.shape}`);
    // const results = model.predict(imageTensor);
    // console.log("PRED: ", results.dataSync());
    
    const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    let imageTensor = decodeJpeg(raw);
    const scalar = tf.scalar(255);
    imageTensor = tf.image.resizeNearestNeighbor(imageTensor, [224, 224]);
    const tensorScaled = imageTensor.div(scalar);
    const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);
    console.log("IMG: ", img);
    
    const results = model.predict(img);
    let pred = results.dataSync();
    console.log("PREDICTION: ", pred);
    

    // const reshapedTensor = tf.image.resizeBilinear(imageTensor, [224, 224]).reshape([1, 224, 224, 3]);
    // const reshapedTensor = imageTensor.resizeBilinear([224, 224]).reshape([1, 224, 224, 3])
    // const reshapedTensor = tf.expandDims(imageTensor, 0).resizeBilinear([224, 224]);
    // const results = model.evaluate(reshapedTensor)
    // const results1 = model.
    // const prediction = results.dataSync();
    // console.log("PREDICTION: ", prediction)
    // const highestPrediction = prediction.indexOf(
    //   Math.max.apply(null, prediction)
    // );

    /* const croppedData: any = await cropPicture(base64Image, 350);
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
      prediction: RESULT_MAPPING[highestPrediction],
    }); */
  };

  const imageToTensorf = (rawImageData:any) => {
    console.log("Converting Image to tensor");
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, {useTArray: TO_UINT8ARRAY});
    console.log(`width of the image -> ${width} and ${height}`);

    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    const normed = [];
    for (let i = 0; i < buffer.length; i++) normed[i] = buffer[i] / 224.0; // Normalize

    return tf.tensor3d(normed, [height, width, 3]).expandDims();
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
    handleCameraStream,
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
