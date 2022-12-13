import React, { useContext, useEffect } from "react";
import {
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Link,
  IconButton,
} from "native-base";
import { Controller } from "react-hook-form";
import { ScreenContext } from "../../providers/context";
import { FontAwesome5 } from "@expo/vector-icons";
import SignupWrapper from "../../components/signupWrapper";
import PhoneInput from "react-native-phone-number-input";
import { buttonColor, onFocusedButton } from "../../constants/color";

const SignupView = () => {
  const {
    currentUser,
    title,
    submitHandler,
    handleSubmit,
    control,
    errors,
    watch,
    setError,
    loadingregisterButton,
    showPassword,
    handleShowPassword,
    isValid,
    proceedToLogin,
    phoneInputBorderColor,
    setPhoneInputBorderColor,
  } = useContext(ScreenContext);

  const watchPassword = watch && watch("password");
  const watchConfirmPassword = watch && watch("confirm_password");

  useEffect(() => {
    if (watchPassword !== watchConfirmPassword) {
      setError &&
        setError("confirm_password", {
          type: "focus",
          message: "Password did not match!",
        });
    }
  }, [watchPassword, watchConfirmPassword]);

  return (
    <SignupWrapper>
      <VStack w="85%" h="100%" alignSelf="center">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontFamily="Bold"
        >
          {title}
        </Heading>

        {currentUser && <FormControl isInvalid={"username" in errors}>
          <FormControl.Label
            _text={{
              color: "muted.900",
              fontSize: "14",
              fontFamily: "Bold",
            }}
          >
            Username
          </FormControl.Label>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Required field",
              minLength: {
                value: 6,
                message: "Username must have at least 6 characters.",
              },
              maxLength: {
                value: 25,
                message: "Username must not exceed 25 characters.",
              },
            }}
            render={({ field }) => (
              <Input
                fontFamily="Regular"
                fontSize="16"
                height="55"
                value={field.value}
                onChangeText={field.onChange}
                _focus={{
                  borderColor: buttonColor,
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.username?.message}
          </FormControl.ErrorMessage>
        </FormControl>}

        {currentUser && (
          <>
            {" "}
            <FormControl isInvalid={"first_name" in errors}>
              <FormControl.Label
                _text={{
                  color: "muted.900",
                  fontSize: "14",
                  fontFamily: "Bold",
                }}
              >
                First Name
              </FormControl.Label>
              <Controller
                control={control}
                name="first_name"
                rules={{
                  required: "Required field",
                }}
                render={({ field }) => (
                  <Input
                    fontFamily="Regular"
                    fontSize="16"
                    height="55"
                    value={field.value}
                    onChangeText={field.onChange}
                    _focus={{
                      borderColor: buttonColor,
                    }}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                {errors.first_name?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={"last_name" in errors}>
              <FormControl.Label
                _text={{
                  color: "muted.900",
                  fontSize: "14",
                  fontFamily: "Bold",
                }}
              >
                Last Name
              </FormControl.Label>
              <Controller
                control={control}
                name="last_name"
                rules={{
                  required: "Required field",
                }}
                render={({ field }) => (
                  <Input
                    fontFamily="Regular"
                    fontSize="16"
                    height="55"
                    value={field.value}
                    onChangeText={field.onChange}
                    _focus={{
                      borderColor: buttonColor,
                    }}
                  />
                )}
              />
              <FormControl.ErrorMessage>
                {errors.last_name?.message}
              </FormControl.ErrorMessage>
            </FormControl>
          </>
        )}

        <FormControl isInvalid={"email" in errors}>
          <FormControl.Label
            _text={{
              color: "muted.900",
              fontSize: "14",
              fontFamily: "Bold",
            }}
          >
            Email Address
          </FormControl.Label>
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
                fontFamily="Regular"
                fontSize="16"
                height="55"
                value={field.value}
                onChangeText={field.onChange}
                _focus={{
                  borderColor: buttonColor,
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        {currentUser && (
          <FormControl isInvalid={"phone" in errors}>
            <FormControl.Label
              _text={{
                color: "muted.900",
                fontSize: "14",
                fontFamily: "Bold",
              }}
            >
              Mobile Number
            </FormControl.Label>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Required field",
                pattern: {
                  value: /^(09|\+639)\d{9}$/,
                  message: "Invalid phone number",
                },
                maxLength: {
                  value: 13,
                  message: "Invalid phone number.",
                },
              }}
              render={({ field }) => (
                <PhoneInput
                  defaultCode="PH"
                  layout="second"
                  placeholder=" "
                  value={field.value}
                  onChangeFormattedText={field.onChange}
                  containerStyle={{
                    borderColor: phoneInputBorderColor,
                    borderWidth: 1.5,
                    width: "100%",
                    borderRadius: 5,
                  }}
                  textInputStyle={{
                    fontFamily: "Regular",
                    fontSize: 16,
                  }}
                  textContainerStyle={{
                    backgroundColor: "transparent",
                  }}
                  textInputProps={{
                    onFocus: () => {
                      setPhoneInputBorderColor("#67e8f9");
                    },
                    onBlur: () => {
                      setPhoneInputBorderColor("#f3f4f6");
                    },
                  }}
                />
              )}
            />
            <FormControl.ErrorMessage>
              {errors.phone?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={"password" in errors}>
          <FormControl.Label
            _text={{
              color: "muted.900",
              fontSize: "14",
              fontFamily: "Bold",
            }}
          >
            Password
          </FormControl.Label>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Required field",
            }}
            render={({ field }) => (
              <Input
                fontFamily="Regular"
                fontSize="16"
                height="55"
                type={showPassword ? "text" : "password"}
                value={field.value}
                onChangeText={field.onChange}
                InputRightElement={
                  <IconButton
                    onPress={handleShowPassword}
                    mr="3%"
                    icon={
                      <FontAwesome5
                        name={showPassword ? "eye-slash" : "eye"}
                        size={24}
                        color="black"
                      />
                    }
                  />
                }
                _focus={{
                  borderColor: buttonColor,
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={"confirm_password" in errors}>
          <FormControl.Label
            _text={{
              color: "muted.900",
              fontSize: "14",
              fontFamily: "Bold",
            }}
          >
            Confirm Password
          </FormControl.Label>
          <Controller
            control={control}
            name="confirm_password"
            rules={{
              required: "Required field",
            }}
            render={({ field }) => (
              <Input
                fontFamily="Regular"
                fontSize="16"
                height="55"
                type={showPassword ? "text" : "password"}
                value={field.value}
                onChangeText={field.onChange}
                InputRightElement={
                  <IconButton
                    onPress={handleShowPassword}
                    mr="3%"
                    icon={
                      <FontAwesome5
                        name={showPassword ? "eye-slash" : "eye"}
                        size={24}
                        color="black"
                      />
                    }
                  />
                }
                _focus={{
                  borderColor: buttonColor,
                }}
              />
            )}
          />
          <FormControl.ErrorMessage>
            {errors.confirm_password?.message}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          w="100%"
          alignSelf="center"
          rounded="3xl"
          isLoading={loadingregisterButton}
          isDisabled={!isValid}
          onPress={handleSubmit(submitHandler)}
          colorScheme="info"
          borderRadius="full"
          mt="6"
          h="54"
          bg={buttonColor}
          _text={{ fontSize: "16", fontFamily: "Bold" }}
          _disabled={{
            backgroundColor: "#bbbbbb",
            _text: { color: "white" },
          }}
          _focus={{
            bg: onFocusedButton,
          }}
        >
          Continue
        </Button>
        <HStack
          justifyContent="center"
          alignContent="center"
          mt="5"
          flexWrap="wrap"
        >
          <Text alignSelf="center" fontSize="14" fontFamily="Regular">
            Alread have an account?
          </Text>
          <Link
            onPress={proceedToLogin}
            isUnderlined={false}
            _text={{
              color: "#38bdf8",
              fontSize: "14",
              fontFamily: "Regular",
            }}
          >
            Login.
          </Link>
        </HStack>
      </VStack>
    </SignupWrapper>
  );
}

export default SignupView;
