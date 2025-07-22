import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import ScrollScreenWrapper from "@/components/ScrollScreenWrapper";
import Logo from "@/components/Logo";
import LabeledInputField from "@/components/LabeledInputField";
import CTAButton from "@/components/CTAButton";
import AuthRedirectPrompt from "@/components/AuthRedirectPrompt";
import AlertModal from "@/components/AlertModal";
import { useAlertModal } from "@/hooks/useAlertModal";
import { handleLogin } from "@/features/auth/handleLogin";
import { useAuthContext } from "@/context/AuthContext";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

const LogIn = () => {
  const router = useRouter();

  // Redirect to home if user is already logged in
  useRedirectIfAuthenticated();

  // State for input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for interaction status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State and handlers for alert modal
  const { alertVisible, alertTitle, alertMessage, showAlert, hideAlert } =
    useAlertModal();

  // Auth setter to save session data (access token and user ID) in memory after successful login
  const { setSessionAuth } = useAuthContext();

  // Submit form values and trigger async login process
  const onSubmit = () => {
    handleLogin({
      email,
      password,
      onStart: () => setIsSubmitting(true),
      onFinish: () => setIsSubmitting(false),
      onAlert: showAlert,
      setSessionAuth,
      onSuccess: () => {
        router.replace("/home"); // `replace` avoids returning to login on back press
      },
    });
  };

  return (
    <ScreenWrapper>
      <ScrollScreenWrapper viewClassName="gap-y-8">
        {/* App logo */}
        <Logo />

        {/* Main heading */}
        <View className="w-[90vw]">
          <Text className="text-title">Log in</Text>
        </View>

        {/* Input fields */}
        <LabeledInputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
        />

        <LabeledInputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          isPassword
        />

        {/* Submit button */}
        <CTAButton
          title="Log in"
          onPress={onSubmit}
          isLoading={isSubmitting}
          pressableClassName="mt-8"
        />

        {/* Link to sign-up screen */}
        <AuthRedirectPrompt
          message="Don't have an account?"
          linkText="Create one"
          linkHref="/sign-up"
        />
      </ScrollScreenWrapper>

      {/* AlertModal for feedback messages (validation, errors, etc.) */}
      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={hideAlert}
      />
    </ScreenWrapper>
  );
};

export default LogIn;
