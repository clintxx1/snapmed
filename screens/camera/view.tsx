import { Camera, CameraType } from "expo-camera";
import React, { useContext } from "react";
import { View } from "native-base";
import { LogBox, TouchableOpacity } from "react-native";
import { ScreenContext } from "../../providers/context";
LogBox.ignoreAllLogs(true);
const CameraView = () => {
  const {
    camera,
    takePictureHandler,
    prediction,
  } = useContext(ScreenContext);
  console.log("camera? ", prediction);

  return (
    <View flex={1} style={{ backgroundColor: "transparent" }}>
      {/* {startCamera ? ( */}
        <Camera
          type={CameraType.back}
          style={{ flex: 1 }}
          ratio={"4:3"}
          ref={camera}
          autoFocus={true}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              width: 70,
              height: 70,
              bottom: 10,
              borderRadius: 50,
              alignSelf: "center",
            }}
            onPress={() => takePictureHandler()}
          />
        </Camera>
      {/* ):(
        <View h={100} w={"100%"} flexDirection={"column"} alignItems={"center"}>
          <Image
            source={currentPhoto}
            alt="image"
            size={200}
            resizeMode={"cover"}
            alignSelf={"center"}
          />
        <Text>{prediction}</Text>
          {prediction &&
            prediction.map((p: any, index: number) =>
              renderPrediction(p, index)
            )} 
        </View>
      )}
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
      /> */}
    </View>
  );
};

export default CameraView;
