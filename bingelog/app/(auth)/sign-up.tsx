import React, { useState } from "react";
import { View, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ScrollScreenWrapper from "@/components/ScrollScreenWrapper";
import Logo from "@/components/Logo";
import LabeledInputField from "@/components/LabeledInputField";
import CTAButton from "@/components/CTAButton";
import AuthRedirectPrompt from "@/components/AuthRedirectPrompt";
import { handleSignUp } from "@/features/auth/signUp";

const SignUp = () => {
  // State for input values — separate useState is preferred for small forms (2–5 fields)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for interaction status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Submit form values and trigger async registration process
  const onSubmit = () => {
    handleSignUp({
      username,
      email,
      password,
      onStart: () => setIsSubmitting(true),
      onFinish: () => setIsSubmitting(false),
    });
  };

  return (
    <ScreenWrapper>
      <ScrollScreenWrapper viewClassName="gap-y-8">
        {/* App logo */}
        <Logo />

        {/* Main heading */}
        <View className="w-[90vw]">
          <Text className="text-title">Sign up</Text>
        </View>

        {/* Input fields */}
        <LabeledInputField
          label="Username"
          value={username}
          onChangeText={setUsername} // same as `onChangeText={(val) => setUsername(val)}`
          placeholder="Enter your username"
        />

        <LabeledInputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="example@email.com"
          keyboardType="email-address"
        />

        <LabeledInputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter a strong password"
          isPassword // same as isPassword={true}
        />

        {/* Submit button */}
        <CTAButton
          title="Sign up"
          onPress={onSubmit}
          isLoading={isSubmitting}
          pressableClassName="mt-8"
        />

        {/* Link to log-in screen */}
        <AuthRedirectPrompt
          message="Already registered?"
          linkText="Log in"
          linkHref="/log-in"
        />
      </ScrollScreenWrapper>
    </ScreenWrapper>
  );
};

export default SignUp;
