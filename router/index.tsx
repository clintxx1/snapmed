/** Libraries */
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** Stack Screens */
import PrivateScreens from "./private-screens";
import { buttonColor } from "../constants/color";

const MainStack = createNativeStackNavigator();

const MainNavigation = () => {
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: buttonColor,
    },
  };
  return (
    <NavigationContainer theme={customTheme}>
      <MainStack.Navigator initialRouteName="Private">
        <MainStack.Screen
          name="Private"
          component={PrivateScreens}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
