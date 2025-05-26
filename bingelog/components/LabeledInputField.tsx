import React, { useState } from "react";
import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

// Extending TextInputProps allows passing native TextInput props (e.g., keyboardType) using ...rest
interface Props extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

const LabeledInputField = ({ label, isPassword, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-[90vw]">
      <Text className="text-foreground font-nunitoRegular text-lg">
        {label}
      </Text>

      <View
        className={`flex flex-row items-center w-full bg-background-input rounded-md mt-4 px-4 border-2  ${
          isFocused ? "border-accent" : "border-background-input"
        } `}
      >
        <TextInput
          className="text-foreground font-nunitoRegular text-base flex-1"
          placeholderTextColor={Colors.foreground.muted}
          selectionColor={Colors.foreground.muted}
          cursorColor={Colors.accent}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)} // Triggered when input gains focus
          onBlur={() => setIsFocused(false)} // Triggered when input loses focus
          {...rest} // value, onChangeText, placeholder, keyboardType
        />
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={Colors.foreground.secondary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default LabeledInputField;
