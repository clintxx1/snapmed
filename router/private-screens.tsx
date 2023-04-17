/**Libraries */
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";

/**Constants */
import {
  DASHBOARD,
  LIST,
  PLANT_INFO,
  TSCAMERA,
} from "../constants/screen-names";

import Dashboard from "../screens/dashboard";
import { Icon, Image } from "native-base";
import { useAuth } from "../providers/context";
import { Alert, TouchableOpacity, View } from "react-native";
import List from "../screens/list";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabIconHandleChange } from "../lib/helper";
import CustomCamera from "../screens/camera";
import PlantInfo from "../screens/plant-info";

const CustomTabButton = ({ children, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 13.5,
        elevation: 5,
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "green",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
const PrivateStack = createBottomTabNavigator();
const PrivateScreens = ({ navigation }: any) => {
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
      screenOptions={({ route }) => ({
        tabBarButton: [PLANT_INFO].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              as={
                <MaterialCommunityIcons
                  name={tabIconHandleChange(route.name, focused).iconText}
                />
              }
              color="gray.700"
              size="md"
              opacity={tabIconHandleChange(route.name, focused).opacity}
            />
          );
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        },
        title: "",
      })}
    >
      <PrivateStack.Screen
        name={DASHBOARD}
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          headerTitle: "Discover",
          headerTitleAlign: "center",
        }}
      />
      <PrivateStack.Screen
        name={TSCAMERA}
        component={CustomCamera}
        options={{
          tabBarLabel: "",
          headerTitle: "Camera",
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/camera.png")}
              resizeMode="contain"
              style={{
                top: "50%",
                width: 50,
                height: 50,
                tintColor: "#fff",
              }}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              onPress={() => navigation.navigate(TSCAMERA)}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <PrivateStack.Screen
        name={LIST}
        component={List}
        options={{
          tabBarLabel: "List",
          headerTitle: "List of Medicinal Plants",
          headerTitleAlign: "center"
        }}
      />
      <PrivateStack.Screen
        name={PLANT_INFO}
        component={PlantInfo}
        options={{
          tabBarStyle: { display: "none" },
        }}
      />
    </PrivateStack.Navigator>
  );
};

export default PrivateScreens;
