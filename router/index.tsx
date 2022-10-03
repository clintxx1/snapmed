/** Libraries */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** Context */
// import { AppContext } from "../providers/context";

/** Stack Screens */
import PublicScreens from "./public-screens";
import { useAuth } from "../providers/context";
import PrivateScreens from "./private-screens";

const MainStack = createNativeStackNavigator();

const MainNavigation = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Public">
        {currentUser ? (
          <MainStack.Screen
            name="Private"
            component={PrivateScreens}
            options={{ headerShown: false }}
          />
        ) : (
          <MainStack.Screen
            name="Public"
            component={PublicScreens}
            options={{ headerShown: false }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
