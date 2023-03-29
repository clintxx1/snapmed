import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";

import { Base64Binary } from "../constants/util";
const BITMAP_DIMENSION = 224;

const modelJson = require("../assets/model/model.json");
const modelWeights = require("../assets/model/weights.bin");
const modelMetadata = require("../assets/metadata.json");

// 0: channel from JPEG-encoded image
// 1: gray scale
// 3: RGB image
const TENSORFLOW_CHANNEL = 3;

export const getModel = async () => {
  /* try {
    // wait until tensorflow is ready
    await tf.ready();
    // load the trained model
    return await tf
      .loadLayersModel(bundleResourceIO(modelJson, modelWeights))
      .catch((err) => console.log("##ERR: ", err));
  } catch (error) {
    console.log("Could not load model", error);
  } */

  //EXPERIMENT 2
  try {
    // const model = tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights, modelMetadata));
    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    console.log("MODEL: ", model);
    return model;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const convertBase64ToTensor = async (base64) => {
  try {
    const uIntArray = Base64Binary.decode(base64);
    // decode a JPEG-encoded image to a 3D Tensor of dtype
    const decodedImage = decodeJpeg(uIntArray, 3);
    // reshape Tensor into a 4D array
    return decodedImage.reshape([
      1,
      BITMAP_DIMENSION,
      BITMAP_DIMENSION,
      TENSORFLOW_CHANNEL,
    ]);
  } catch (error) {
    console.log("Could not convert base64 string to tesor", error);
  }
};

export const startPrediction = async (model, tensor) => {
  try {
    // predict against the model
    const output = await model.predict(tensor);
    
    // return typed array
    return output.dataSync();
  } catch (error) {
    console.log("Error predicting from tesor image", error);
  }
};

import { Dimensions } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");

export const cropPicture = async (imageData, maskDimension) => {
  try {
    const { uri, width, height } = imageData;
    const cropWidth = maskDimension * (width / DEVICE_WIDTH);
    const cropHeight = maskDimension * (height / DEVICE_HEIGHT);
    const actions = [
      {
        crop: {
          originX: width / 2 - cropWidth / 2,
          originY: height / 2 - cropHeight / 2,
          width: cropWidth,
          height: cropHeight,
        },
      },
      {
        resize: {
          width: BITMAP_DIMENSION,
          height: BITMAP_DIMENSION,
        },
      },
    ];
    const saveOptions = {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
      base64: true,
    };
    return await ImageManipulator.manipulateAsync(uri, actions, saveOptions);
  } catch (error) {
    console.log("Could not crop & resize photo", error);
  }
};
