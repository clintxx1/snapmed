import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import { Base64Binary } from "../constants/util";
import { Dimensions } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

const { height: DEVICE_HEIGHT, width: DEVICE_WIDTH } = Dimensions.get("window");
const BITMAP_DIMENSION = 224;

const modelJson = require("../assets/model/model.json");
const modelWeights = require("../assets/model/weights.bin");

const TENSORFLOW_CHANNEL = 3;

export const getModel = async () => {
  try {
    const model = await tf.loadLayersModel(
      bundleResourceIO(modelJson, modelWeights)
    );
    return model;
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

export const convertBase64ToTensor = async (base64) => {
  try {
    const uIntArray = Base64Binary.decode(base64);
    const decodedImage = decodeJpeg(uIntArray, 3);
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
    const output = await model.predict(tensor);
    return output.dataSync();
  } catch (error) {
    console.log("Error predicting from tesor image", error);
  }
};

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
