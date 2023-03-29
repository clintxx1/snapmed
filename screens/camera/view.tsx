import { Camera, CameraType } from "expo-camera";
import React, { useContext, useState } from "react";
import { Heading, HStack, Spinner, Text, View } from "native-base";
import { Alert, LogBox, TouchableOpacity} from "react-native";
import { ScreenContext } from "../../providers/context";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { containerColor, textColor } from "../../constants/color";
import { useIsFocused } from "@react-navigation/native";
LogBox.ignoreAllLogs(true);
const CameraView = () => {
  const {
    camera,
    takePictureHandler,
    prediction,
    textureDims,
    handleCameraStream,
    loading,
    loaderState,
    startCamera,
  } = useContext(ScreenContext);
  const TensorCamera = cameraWithTensors(Camera);
  console.log("camera? ", loaderState);
  const [zoom, setZoom] = useState(0);
  const isFocused = useIsFocused();
  return (
    <View flex={1} bgColor={"white"}>
      {!loading && isFocused ? (
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
          <View
            position={"absolute"}
            flex={1}
            bottom={0}
            w={"full"}
            alignItems={"center"}
            flexDirection={"row"}
            // mx={5}
            justifyContent={"center"}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: 5,
                // position: "absolute",
                backgroundColor: "#fff",
                width: 30,
                height: 30,
                bottom: 190,
                borderRadius: 50,
                // alignSelf: "center",
              }}
              onPress={() => setZoom(0.25)}
            />
            <TouchableOpacity
              style={{
                // position: "absolute",
                marginHorizontal: 5,
                backgroundColor: "#fff",
                width: 30,
                height: 30,
                bottom: 190,
                borderRadius: 50,
                // alignSelf: "center",
              }}
              onPress={() => setZoom(0)}
            />
            <TouchableOpacity
              style={{
                // position: "absolute",
                marginHorizontal: 5,
                backgroundColor: "#fff",
                width: 30,
                height: 30,
                bottom: 190,
                borderRadius: 50,
                // alignSelf: "center",
              }}
              onPress={() => setZoom(0.1)}
            />
          </View>
          <View
            bgColor={"black"}
            opacity={0.7}
            w="full"
            position={"absolute"}
            bottom={0}
            h={180}
          >
            <View
              mx={7}
              mt={1}
              flex={1}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Text
                color={"white"}
                bold
                onPress={() => Alert.alert("Coming soon...")}
              >
                Documents
              </Text>
              <Text
                color={"white"}
                bold
                onPress={() => Alert.alert("Coming soon...")}
              >
                Video
              </Text>
              <Text color={"yellow.300"} bold>
                Photo
              </Text>
              <Text
                color={"white"}
                bold
                onPress={() => Alert.alert("Coming soon...")}
              >
                Portrait
              </Text>
              <Text
                color={"white"}
                bold
                onPress={() => Alert.alert("Coming soon...")}
              >
                Night
              </Text>
            </View>
          </View>
        </Camera>
      ) : (
        <HStack
          flex={1}
          flexDirection={"column"}
          space={2}
          justifyContent="center"
          alignItems="center"
          bg={"white"}
        >
          {/* <ActivityIndicator size={"large"}/> */}
          <Spinner
            color={textColor}
            mb={30}
            size="lg"
            style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
          />
          <Text bold color={textColor} fontSize="2xl">
            Predicting Image
          </Text>
        </HStack>
      )}
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
      <Canvas
      ref={handleCanvas}
      style={{
        position: "absolute",
        zIndex: 1000000,
        width: "100%",
        height: "100%",
      }}
    /> */}

      {/* <TensorCamera
      style={{ height: "100%", width: "100%" }}
      type={CameraType.back}
      cameraTextureHeight={1920}
      cameraTextureWidth={1080}
      resizeHeight={224}
      resizeWidth={224}
      resizeDepth={3}
      onReady={handleCameraStream}
      autorender={true}
      useCustomShadersToResize={false}
    /> */}
    </View>
  );
};

export default CameraView;
