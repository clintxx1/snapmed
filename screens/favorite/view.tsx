import { Text, View } from "native-base";
import React, { useContext } from "react";
import { textColor } from "../../constants/color";
import { ScreenContext } from "../../providers/context";

const FavoriteView = () => {
  const { text } = useContext(ScreenContext);

  return (
    <View flex={1} bg={"white"} alignItems={"center"} justifyContent={"center"}>
      <Text fontSize={24} italic fontWeight={200} color={textColor}>
        No Favorites
      </Text>
    </View>
  );
};

export default FavoriteView;
