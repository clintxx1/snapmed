import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { LOGIN } from "../../constants/screen-names";
import { GetErrorMessage } from "../../lib/helper";
import { ScreenContext, useAuth } from "../../providers/context";
import ForgotPasswordView from "./view";

type FormInputs = {
  email: string;
};

const ForgotPassword = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onChange" });
  const { resetPassword } = useAuth();
  const [loadingButton, setLoadingButton] = useState(false);

  const verifyEmailHandler = async (data: FormInputs) => {
    try {
      setLoadingButton(false);
      await resetPassword(data.email);
      Alert.alert("Success", GetErrorMessage("RESET_PASSWORD_CONFIRMATION"), [
        {
          text: "Ok",
          onPress: () => navigation.navigate(LOGIN),
        },
      ]);
    } catch (e) {
      Alert.alert("Warning", GetErrorMessage("NON_EXISTING_USER"), [
        {
          text: "Ok",
          onPress: () => setLoadingButton(false),
        },
      ]);
    }
  };

  const submitHandler = (data: FormInputs) => {
    verifyEmailHandler(data);
    setLoadingButton(true);
  };

  const values = {
    control,
    errors,
    handleSubmit,
    submitHandler,
    loadingButton,
    isValid,
  };

  return (
    <ScreenContext.Provider value={values}>
      <ForgotPasswordView />
    </ScreenContext.Provider>
  );
};

export default ForgotPassword;
