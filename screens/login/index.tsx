/**Libraries */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

/**Context */
import { ScreenContext, useAuth } from "../../providers/context";

/**Components */
import LoginView from "./view";

/**Helpers */
import { GetErrorMessage } from "../../lib/helper";
import { DASHBOARD, FORGOT_PASSWORD, SIGNUP } from "../../constants/screen-names";

/**Types */
type FormInputs = {
  username: string;
  password: string;
  resendverificationCode?: string;
};

const LoginScreen = ({ navigation }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onChange" });
  const { login, logout } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<object>({});
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const loginHandler = async (data: FormInputs) => {
    try {
      await login(data.username, data.password)
      setLoadingButton(() => false);
      navigation.navigate(DASHBOARD);
    } catch (e) {
      setAlertMessage(() => ({
        header: "Incorrect Account",
        body: GetErrorMessage("NON_EXISTING_USER"),
      }));
      setShowAlert(() => true);
      return;
    }
    setLoadingButton(() => false);
  };

  const forgotPassword = () => {
    navigation.navigate(FORGOT_PASSWORD);
  }

  const signup = async () => {
    navigation.navigate(SIGNUP)
  }

  const handleShowPassword = () => setShowPassword(!showPassword);

  const submitHandler = (data: FormInputs) => {
    setLoadingButton(() => true);
    loginHandler(data);
  };

  const handleAlertButton = () => {
    setShowAlert(() => false);
    setLoadingButton(() => false);
  };

  const values = {
    handleSubmit,
    control,
    errors,
    isValid,
    showPassword,
    showAlert,
    alertMessage,
    loadingButton,
    handleShowPassword,
    submitHandler,
    handleAlertButton,
    setShowAlert,
    forgotPassword,
    signup,
  };

  return (
    <ScreenContext.Provider value={values}>
      <LoginView />
    </ScreenContext.Provider>
  );
};

export default LoginScreen;
