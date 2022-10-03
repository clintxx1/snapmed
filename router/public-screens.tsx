/**Libraries */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**Constants */
import {DASHBOARD, FORGOT_PASSWORD, LOGIN} from "../constants/screen-names";

/**Screens */
import LoginScreen from "../screens/login";
import ForgotPassword from "../screens/forgot-password";
import Dashboard from "../screens/dashboard";
import { Button } from "native-base";

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
        options={{ headerShadowVisible: false }}
      />
      <PublicStack.Screen
        name={FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{ headerShadowVisible: false }}
      />
    </PublicStack.Navigator>
  );
};

export default PublicScreens;
