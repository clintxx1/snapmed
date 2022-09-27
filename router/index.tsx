/** Libraries */
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/** Context */
import { AppContext } from "../providers/context";

/** Stack Screens */
import PublicScreens from "./public-screens";
// import DrawerScreens from "./DrawerScreens";

const MainStack = createNativeStackNavigator();

const MainNavigation = () => {
  const { user } = useContext(AppContext);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Public">
        {/* {user ? (
          <MainStack.Screen
            name="Private"
            component={DrawerScreens}
            options={{ headerShown: false }}
          />
        ) : ( */}
          <MainStack.Screen
            name="Public"
            component={PublicScreens}
            options={{ headerShown: false }}
          />
        {/* )} */}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
