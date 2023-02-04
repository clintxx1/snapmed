import React from "react";
import { Card, View, Text, Image } from "native-base";

const CustomCard = (props: any) => {
  return (
    <Card {...props}>
      <View alignItems={"center"} justifyContent={"center"}>
        <Image
          source={props.image}
          alt="image"
          size={200}
          resizeMode={"cover"}
          background={"white"}
          alignSelf={"center"}
        />
        <Text>{props.text}</Text>
      </View>
    </Card>
  );
};

export default CustomCard;
