import { VStack } from "native-base";
import React from "react";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const DetailsWrapper = ({ children, ...rest }: any) => {
  return (
    <VStack w={width - 50} my={4} {...rest}>
      {children}
    </VStack>
  );
};

export default DetailsWrapper;
