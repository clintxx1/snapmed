/**Libraries */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**Constants */
import { DASHBOARD } from "../constants/screen-names";

import Dashboard from "../screens/dashboard";
import { Link } from "native-base";
import { useAuth } from "../providers/context";
import { Alert } from "react-native";

const PrivateStack = createNativeStackNavigator();
const PrivateScreens = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    Alert.alert("Warning", "Are you sure you want to logout?", [
      {
        text: "Ok",
        onPress: async () => await logout(),
      },
      {
        text: "Cancel",
      },
    ]);
  };
  return (
    <PrivateStack.Navigator
      screenOptions={{
        title: "",
        headerBackTitleVisible: false,
        headerTintColor: "black",
        headerShadowVisible: false,
      }}
    >
      <PrivateStack.Screen
        name={DASHBOARD}
        component={Dashboard}
        options={{
          headerBackVisible: false,
          title: "Discover",
          headerRight: () => (
            <Link isUnderlined={false} onPress={handleLogout}>
              Logout
            </Link>
          ),
        }}
      />
    </PrivateStack.Navigator>
  );
};

export default PrivateScreens;
