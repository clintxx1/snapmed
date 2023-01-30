import { Icon, Input } from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface InputTypes {
  field: any;
  iconName: any;
  buttonColor: string;
  iconSize: number;
  iconColor: string;
  iconMarginLeft: string;
  placeholder: string;
  inputType?: string;
}

const CustomInput = ({ field, inputType = "text", iconName, placeholder, iconColor, iconMarginLeft, buttonColor, iconSize, ...rest }: InputTypes|any) => {
  return (
    <Input
      value={field.value}
      onChangeText={field.onChange}
      InputLeftElement={
        <Icon
          as={<MaterialIcons name={iconName} />}
          size={iconSize}
          ml={iconMarginLeft}
          color={iconColor}
        />
      }
      placeholder={placeholder}
      _focus={{
        borderColor: buttonColor,
      }}
      type={inputType}
      {...rest}
    />
  );
};

export default CustomInput;
