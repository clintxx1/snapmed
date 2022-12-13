import { Text } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";

const ListView = () => {
  const { text } = useContext(ScreenContext);
  return <Text>List{text}</Text>;
};

export default ListView;
