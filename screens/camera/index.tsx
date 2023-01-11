import React, { useContext, useEffect, useRef, useState } from "react";
import { ScreenContext } from "../../providers/context";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera, CameraType } from "expo-camera";
import { Dimensions, LogBox, Platform } from "react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import { View } from "native-base";

LogBox.ignoreAllLogs(true);
const TensorCamera = cameraWithTensors(Camera);
const { height, width } = Dimensions.get("window");
const CustomCamera = () => {
  const { text } = useContext(ScreenContext);
  const [model, setModel] = useState<cocoSsd.ObjectDetection>();
  let context = useRef<CanvasRenderingContext2D>();
  let canvas = useRef<Canvas>();

  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };

  const handleCameraStream = (images: any) => {
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor)
        throw new Error("No Model or image tensor");
      model
        .detect(nextImageTensor)
        .then((prediction) => {
          drawRectangle(prediction, nextImageTensor);
        })
        .catch((error) => {
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
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await tf.ready();
      setModel(await cocoSsd.load());
    })();
  }, []);
  return (
    <View flex={1} backgroundColor={"#fff"}>
      <TensorCamera
        style={{ height: "100%", width: "100%" }}
        type={CameraType.back}
        cameraTextureHeight={textureDims.height}
        cameraTextureWidth={textureDims.width}
        resizeHeight={200}
        resizeWidth={152}
        resizeDepth={3}
        onReady={handleCameraStream}
        autorender={true}
        useCustomShadersToResize={false}
      />
      <Canvas
        ref={handleCanvas}
        style={{
          position: "absolute",
          zIndex: 1000000,
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
};

export default CustomCamera;
