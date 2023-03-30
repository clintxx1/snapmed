import { Text, View } from "native-base";
import React, { useContext } from "react";
import { textColor } from "../../constants/color";
import { ScreenContext } from "../../providers/context";

const AccountView = () => {
  const { text } = useContext(ScreenContext);
  return (
    <View flex={1} bg={"white"} alignItems={"center"} justifyContent={"center"}>
      <Text fontSize={24} italic fontWeight={200} color={textColor} mx={20}>
        Account Details Not Yet Implemented
      </Text>
    </View>
  );
};

export default AccountView;
