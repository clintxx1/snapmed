/** Libraries */
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** Context */
// import { AppContext } from "../providers/context";

/** Stack Screens */
import PublicScreens from "./public-screens";
import { useAuth } from "../providers/context";
import PrivateScreens from "./private-screens";
import { buttonColor } from "../constants/color";

const MainStack = createNativeStackNavigator();

const MainNavigation = () => {
  const { currentUser } = useAuth();
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
          {/* {currentUser ? ( */}
            <MainStack.Screen
              name="Private"
              component={PrivateScreens}
              options={{ headerShown: false }}
            />
          {/* ) : (
            <MainStack.Screen
              name="Public"
              component={PublicScreens}
              options={{ headerShown: false }}
            />
          )}  */}
        </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
