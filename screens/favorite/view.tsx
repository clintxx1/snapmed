import { Text, View } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";

const FavoriteView = () => {
  const { text } = useContext(ScreenContext);
  
  return (
    <View flex={1} backgroundColor={"#fff"}>
      <Text>{text}</Text>
    </View>
  );
};

export default FavoriteView;
