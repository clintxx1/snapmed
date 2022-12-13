import { Button, FormControl, Text, Input, VStack } from "native-base";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import { buttonColor, onFocusedButton } from "../../constants/color";
import { ScreenContext } from "../../providers/context";

const ForgotPasswordView = () => {
  const {
    control,
    errors,
    handleSubmit,
    submitHandler,
    loadingButton,
    isValid,
  } = useContext(ScreenContext);

  return (
    <VStack p="5%" w="100%" h="100%" bg="white">
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={24}
        alignSelf="flex-start"
        mt="2"
      >
        Forgot Password
      </Text>
      <Text mt="2%" fontSize="14" textAlign="left" alignSelf="flex-start">
        Enter the email that you used to sign up for your account to reset your
        password.
      </Text>
      <Text
        mt="5%"
        fontWeight="bold"
        textAlign="left"
        fontSize="14"
        alignSelf="flex-start"
      >
        Email
      </Text>
      <FormControl fontSize="16" isInvalid={"email" in errors}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Required field",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email format.",
            },
          }}
          render={({ field }) => (
            <Input
              type="email"
              w="100%"
              mt="2%"
              borderStyle="solid"
              alignSelf="center"
              textAlign="center"
              fontSize="lg"
              value={field.value}
              onChangeText={field.onChange}
              _focus={{
                borderColor: buttonColor,
              }}
            />
          )}
        />
      </FormControl>
      <Button
        fontSize="16"
        isDisabled={!isValid}
        borderRadius="full"
        isLoading={loadingButton}
        bg={buttonColor}
        h="54"
        mt="5%"
        size="lg"
        colorScheme="info"
        onPress={handleSubmit(submitHandler)}
        _text={{ fontSize: "16", fontWeight: "bold" }}
        _disabled={{ backgroundColor: "#bbbbbb", _text: { color: "white" } }}
        _focus={{
          bg: onFocusedButton,
        }}
      >
        Continue
      </Button>
    </VStack>
  );
};

export default ForgotPasswordView;
