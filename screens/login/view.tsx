/**Libraries */
import {
  VStack,
  FormControl,
  Input,
  IconButton,
  Link,
  HStack,
  AlertDialog,
  Button,
  Text,
  Checkbox,
  Image,
  Icon,
  Stagger,
  Slide,
} from "native-base";
import React, { useContext, useRef } from "react";
import { Controller } from "react-hook-form";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

/**Context */
import { ScreenContext } from "../../providers/context";

/**Helpers */
import { fadeText, buttonColor, inputBg, onFocusedButton } from "../../constants/color";
import CustomSlide from "../../components/slide";

/**Image */
const headerImage = require("../../assets/mainLogo.png");

const LoginView = () => {
  const {
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
    forgotPassword,
    signup
  } = useContext(ScreenContext);
  return (
    <>
      <VStack h="100%" w="100%" p="5%" bg="white">
        <Image
          source={headerImage}
          alt="image"
          size={250}
          resizeMode={"contain"}
          background="white"
          alignSelf={"center"}
        />
        {/* <CustomSlide images={images} /> */}
        <Text
          fontSize="24"
          fontFamily="Bold"
          alignSelf={"center"}
          color={fadeText}
        >
          Login to your account{process.env.REACT_APP_FIREBASE_API_KEY}
        </Text>
        <FormControl mt="5%">
          <FormControl.Label _text={{ fontFamily: "Bold", fontSize: "14" }}>
            Username
          </FormControl.Label>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Required field.",
            }}
            render={({ field }) => (
              <Input
                // bg={inputBg}
                p="4%"
                fontSize="16"
                fontFamily="Bold"
                value={field.value}
                onChangeText={field.onChange}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.500"
                  />
                }
                placeholder="Username"
                _focus={{
                  borderColor: buttonColor,
                }}
              />
            )}
          />
        </FormControl>
        <FormControl mt="4%">
          <FormControl.Label _text={{ fontFamily: "Bold", fontSize: "14" }}>
            Password
          </FormControl.Label>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Required field." }}
            render={({ field }) => (
              <Input
                p="4%"
                fontSize="16"
                // bg={inputBg}
                fontFamily="Bold"
                type={showPassword ? "text" : "password"}
                value={field.value}
                onChangeText={field.onChange}
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lock" />}
                    size={5}
                    ml="2"
                    color="muted.500"
                  />
                }
                placeholder="Password"
                InputRightElement={
                  <IconButton
                    onPress={handleShowPassword}
                    mr="3%"
                    icon={
                      <FontAwesome5
                        name={field.value ? showPassword ? "eye-slash" : "eye" : ""}
                        size={24}
                        color={fadeText}
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
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            mt="1.5"
          >
            <Checkbox value={"remembered"} _text={{ color: fadeText }} colorScheme={"green"}>
              Remember me
            </Checkbox>
            <Link
              _text={{
                fontSize: "16",
                color: buttonColor,
                fontFamily: "Bold",
              }}
              isUnderlined={false}
              onPress={forgotPassword}
            >
              Forgot password?
            </Link>
          </HStack>
        </FormControl>
        <Button
          isDisabled={!isValid || "username" in errors || "password" in errors}
          isLoading={loadingButton}
          onPress={handleSubmit(submitHandler)}
          mt="6%"
          bg={buttonColor}
          borderRadius="full"
          h="54"
          _text={{ fontSize: "16", fontFamily: "Bold" }}
          _disabled={{ backgroundColor: "#bbbbbb", _text: { color: "white" } }}
          _focus={{
            backgroundColor: onFocusedButton,
          }}
        >
          Login
        </Button>
        <HStack mt="6%" justifyContent="center">
          <Text fontFamily="Bold" fontSize="14">
            Don't have an account?&nbsp;
          </Text>
          <Link
            onPress={signup}
            _text={{
              color: buttonColor,
              fontFamily: "Bold",
              fontSize: "14",
            }}
            isUnderlined={false}
          >
            Sign up.
          </Link>
        </HStack>

        <AlertDialog leastDestructiveRef={useRef(null)} isOpen={showAlert}>
          <AlertDialog.Content
            w="100%"
            bg="white"
            maxW="92%"
            shadow="5"
            fontFamily="Regular"
          >
            <Text
              textAlign="center"
              fontFamily="Bold"
              fontSize="16"
              mt="5%"
              mb="2%"
            >
              {alertMessage.header}
            </Text>
            <AlertDialog.Body
              _text={{
                textAlign: "center",
                fontFamily: "Bold",
                fontSize: "14",
              }}
              px="4%"
            >
              {alertMessage.body}
            </AlertDialog.Body>
            <AlertDialog.Footer justifyContent="center" bg="white">
              <Button
                onPress={() => handleAlertButton()}
                colorScheme="info"
                variant="ghost"
                _text={{ fontSize: "16", color: "#0369a1", fontFamily: "Bold" }}
                _pressed={{ backgroundColor: "white" }}
              >
                OK
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </VStack>
    </>
  );
};

export default LoginView;
