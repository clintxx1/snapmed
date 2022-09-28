/**Libraries */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**Constants */
import {LOGIN} from "../constants/screen-names";

/**Screens */
import LoginScreen from "../screens/login";

const PublicStack = createNativeStackNavigator();
const PublicScreens = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        title: "",
        headerBackTitleVisible: false,
        headerTintColor: "black",
        headerShadowVisible: false,
      }}
    >
      <PublicStack.Screen
        name={LOGIN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </PublicStack.Navigator>
  );
};

export default PublicScreens;
