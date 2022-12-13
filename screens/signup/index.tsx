import { Text } from "native-base";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { LOGIN } from "../../constants/screen-names";
import { GetErrorMessage } from "../../lib/helper";
import { ScreenContext, useAuth } from "../../providers/context";
import SignupView from "./view";

type FormInputs = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  permission: string;
};

const Signup = ({ navigation }: any) => {
  const { currentUser } = useAuth();
  const {
    handleSubmit,
    watch,
    setError,
    control,
    handleSubmit: handleOTPButton,
    control: controlOTP,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onChange" });
  const title = "Sign Up";
  const { signup, logout } = useAuth();
  const [modal, setModal] = useState(false);
  const [loadingregisterButton, setLoadingRegisterButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneInputBorderColor, setPhoneInputBorderColor] = useState("#f3f4f6");

  const handleShowPassword = () => setShowPassword(!showPassword);

  const registerHandler = async (data: FormInputs) => {
    // data.permission = "mobile";

    try {
      await signup(data.email, data.password);
      Alert.alert("Success", GetErrorMessage("REGISTER_SUCCESS"), [
        { text: "OK", onPress: () => navigation.navigate(LOGIN) },
      ]);
      await logout();
      setLoadingRegisterButton(false);
    } catch (e) {
      Alert.alert("Warning", GetErrorMessage("SOMETHING_WENT_WRONG"), [
        { text: "OK", onPress: () => setLoadingRegisterButton(false) },
      ]);
    }
  };

  const proceedToLogin = () => {
    navigation.navigate(LOGIN);
  };

  const submitHandler = (data: FormInputs) => {
    setLoadingRegisterButton(() => true);
    registerHandler(data);
  };

  const values = {
    currentUser,
    title,
    submitHandler,
    handleSubmit,
    proceedToLogin,
    control,
    modal,
    setModal,
    handleOTPButton,
    controlOTP,
    errors,
    watch,
    setError,
    loadingregisterButton,
    setLoadingRegisterButton,
    showPassword,
    setShowPassword,
    handleShowPassword,
    isValid,
    phoneInputBorderColor,
    setPhoneInputBorderColor,
  };
  return (
    <ScreenContext.Provider value={values}>
      <SignupView />
    </ScreenContext.Provider>
  );
};

export default Signup;
