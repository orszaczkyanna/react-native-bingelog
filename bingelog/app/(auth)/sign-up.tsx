import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ScrollScreenWrapper from "@/components/ScrollScreenWrapper";
import Logo from "@/components/Logo";
import LabeledInputField from "@/components/LabeledInputField";
import CTAButton from "@/components/CTAButton";
import AuthRedirectPrompt from "@/components/AuthRedirectPrompt";

const SignUp = () => {
  // State for input values — separate useState is preferred for small forms (2–5 fields)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for interaction status
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert("Warning", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send POST request to backend registration endpoint
      const response = await fetch("http://10.0.2.2:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Tell the server we're sending JSON
        body: JSON.stringify({ username, email, password }), // Convert JavaScript object to JSON string
      });

      // Convert JSON response to JavaScript object
      const data = await response.json();

      // If request was successful (HTTP status 2xx)
      if (response.ok) {
        Alert.alert("Success", data.message); // Show a native popup alert
      } else {
        const message = data.message || "Invalid input";
        Alert.alert("Warning", message);
      }
    } catch (error) {
      // Network or server error (e.g. backend is unreachable)
      console.error("Network or server error:", error);
      Alert.alert("Error", "Unable to reach the server");
    } finally {
      setIsSubmitting(false);
    }
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
          onPress={handleSignUp}
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
