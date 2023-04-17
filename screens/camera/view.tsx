import { Camera, CameraType } from "expo-camera";
import React, { useContext } from "react";
import { HStack, Spinner, Text, View } from "native-base";
import { LogBox, TouchableOpacity } from "react-native";
import { ScreenContext } from "../../providers/context";
import { textColor } from "../../constants/color";
import { useIsFocused } from "@react-navigation/native";
LogBox.ignoreAllLogs(true);
const CameraView = () => {
  const { camera, takePictureHandler, loading, cameraDisabled } =
    useContext(ScreenContext);
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
            disabled={cameraDisabled}
            style={{
              position: "absolute",
              backgroundColor: "#fff",
              width: 70,
              height: 70,
              bottom: 50,
              borderRadius: 50,
              alignSelf: "center",
              zIndex: 9999,
            }}
            onPress={() => takePictureHandler()}
          />
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
              justifyContent={"center"}
            >
              <Text color={"white"} bold>
                Click the button to capture image
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
          <Spinner
            color={textColor}
            mb={30}
            size="lg"
            style={{ transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }] }}
          />
          <Text bold color={textColor} fontSize="2xl">
            Recognizing Image
          </Text>
        </HStack>
      )}
    </View>
  );
};

export default CameraView;
