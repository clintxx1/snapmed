import { Text } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";

const FavoriteView = () => {
  const { hehe } = useContext(ScreenContext);
  return <Text>FavoriteView</Text>;
};

export default FavoriteView;
