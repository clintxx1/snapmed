/**Libraries */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "react-native-vector-icons";

/**Constants */
import { ACCOUNT, DASHBOARD, FAVORITE, LIST } from "../constants/screen-names";

import Dashboard from "../screens/dashboard";
import { Icon, Link } from "native-base";
import { useAuth } from "../providers/context";
import { Alert } from "react-native";
import Favorite from "../screens/favorite";
import Account from "../screens/account";
import List from "../screens/list";

const PrivateStack = createNativeStackNavigator();
const PrivateScreens = ({navigation}:any) => {
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
          headerLeft: () => (
            <Icon
                as={<MaterialIcons name="menu" />}
                color="gray.300"
                size="sm"
              />
          ),
          headerBackVisible: false,
          headerTitle: "Discover",
          headerTitleAlign: "center",
          headerRight: () => (
            <Link isUnderlined={false} onPress={handleLogout}>
              Logout
            </Link>
          ),
        }}
      />
      <PrivateStack.Screen
        name={FAVORITE}
        component={Favorite}
        options={{
          headerLeft: () => (
            <Icon
                as={<MaterialIcons name="menu" />}
                color="gray.300"
                size="sm"
              />
          ),
          headerTitle: "Favorite",
          headerTitleAlign: "center",
          headerRight: () => (
            <Link isUnderlined={false} onPress={handleLogout}>
              Logout
            </Link>
          ),
        }}
      />
      <PrivateStack.Screen
        name={LIST}
        component={List}
        options={{
          headerLeft: () => (
            <Icon
                as={<MaterialIcons name="menu" />}
                color="gray.300"
                size="sm"
              />
          ),
          headerBackVisible: false,
          headerTitle: "Discover",
          headerTitleAlign: "center",
          headerRight: () => (
            <Link isUnderlined={false} onPress={handleLogout}>
              Logout
            </Link>
          ),
        }}
      />
      <PrivateStack.Screen
        name={ACCOUNT}
        component={Account}
        options={{
          headerLeft: () => (
            <Icon
                as={<MaterialIcons name="menu" />}
                color="gray.300"
                size="sm"
              />
          ),
          headerBackVisible: false,
          headerTitle: "Discover",
          headerTitleAlign: "center",
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
