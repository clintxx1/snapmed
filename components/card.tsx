import React from "react";
import { View, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { containerColor } from "../constants/color";

const CustomCard = (props: any) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        display: "flex",
        borderRadius: 8,
        margin: 3,
        width: 200,
        backgroundColor: containerColor,
      }}
    >
      <View alignItems={"center"} justifyContent={"center"}>
        <Image
          source={props.image}
          alt="image"
          size={200}
          resizeMode={"contain"}
          background={"transparent"}
          alignSelf={"center"}
        />
        <Text fontWeight={500} fontSize={16} my={2}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCard;
