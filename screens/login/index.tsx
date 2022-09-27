/**Libraries */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

/**Context */
import { ScreenContext } from "../../providers/context";

/**Components */
import LoginView from "./view";

/**Helpers */
import { GetErrorMessage } from "../../lib/helper";

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
    handleSubmit: handleresendOTP,
  } = useForm<FormInputs>({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<object>({});
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const userName: string = "admin";
  const password: string = "pass123";

  const loginHandler = (data: FormInputs) => {
    if (data.username === userName && data.password === password) {
      alert("Main Page will be added soon.");
      setLoadingButton(() => false);
    } else {
      setAlertMessage(() => ({
        header: "Incorect Account",
        body: GetErrorMessage("NON_EXISTING_USER"),
      }));
      setShowAlert(() => true);
      return;
    }
    setLoadingButton(() => false);
  };
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
  };

  return (
    <ScreenContext.Provider value={values}>
      <LoginView />
    </ScreenContext.Provider>
  );
};

export default LoginScreen;
