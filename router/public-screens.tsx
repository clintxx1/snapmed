/**Libraries */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/**Constants */
import Screen from "../constants/screen-names"

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
      <PublicStack.Screen name={Screen.login} component={LoginScreen} />
      {/* <PublicStack.Screen
        name={ENTRY_SCREEN}
        component={EntryScreen}
        options={{ headerShown: false }}
      />
      <PublicStack.Screen
        name={TERMS_AND_SERVICES_SCREEN}
        component={TermsAndServicesScreen}
        options={{ title: "Terms and Services" }}
      />
      <PublicStack.Screen
        name={PRIVACY_POLICY_SCREEN}
        component={PrivacyPolicyScreen}
        options={{ title: "Privacy Policy" }}
      />
      <PublicStack.Screen
        name={REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ headerShadowVisible: false }}
      />
      <PublicStack.Screen
        name={VERIFY_REGISTER_CODE_SCREEN}
        component={VerifyRegisterCodeScreen}
        options={{ headerShadowVisible: false }}
      />
      <PublicStack.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
        options={{ headerShadowVisible: false }}
      />
      <PublicStack.Screen
        name={VERIFY_FORGOT_PASSWORD_SCREEN}
        component={VerifyCodeScreen}
        options={{ headerShadowVisible: false }}
      />
      <PublicStack.Screen
        name={RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
        options={{ headerShadowVisible: false }}
      /> */}
    </PublicStack.Navigator>
  );
};

export default PublicScreens;
