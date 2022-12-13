import { Text } from "native-base";
import React, { useContext } from "react";
import { ScreenContext } from "../../providers/context";

const AccountView = () => {
  const { text } = useContext(ScreenContext);
  return <Text>{text}</Text>;
};

export default AccountView;
