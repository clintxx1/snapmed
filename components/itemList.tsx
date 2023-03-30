import { useNavigation } from "@react-navigation/native";
import { Card, View, Image, VStack, Text, Button, HStack } from "native-base";
import React from "react";
import {
  buttonColor,
  containerColor,
  fadeText,
  textColor,
} from "../constants/color";

const ItemList = (props: any) => {
  return (
    <Card bgColor={containerColor} borderRadius={10} m={3} key={props.id}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <HStack space={5}>
          <Image
            source={props.image}
            alt="image"
            size={50}
            resizeMode={"cover"}
            background={"transparent"}
            alignSelf={"center"}
          />
          <VStack mt={2}>
            <Text color={textColor} bold fontSize={18}>
              {props.title}
            </Text>
            <Text color={fadeText} italic>
              {props.scientificName}
            </Text>
          </VStack>
        </HStack>
        <Button bgColor={buttonColor} onPress={props.onPress}>
          View
        </Button>
      </HStack>
    </Card>
  );
};

export default ItemList;