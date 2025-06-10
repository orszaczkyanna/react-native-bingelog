import React, { useState } from "react";
import axios from "axios";
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
      const response = await axios.post(
        "http://10.0.2.2:4000/api/auth/register", // Backend endpoint URL
        { username, email, password } // Request body (Axios sends JSON by default)
      );

      // Axios automatically parses the response as JSON: response.data
      // If the request is successful (HTTP status code 2xx), show success message
      Alert.alert("Success", response.data.message);
    } catch (error: any) {
      // Non-2xx responses are automatically thrown as errors by Axios
      if (error.response?.data?.message) {
        // Server responded with a non-2xx status code and a message
        Alert.alert("Warning", error.response.data.message);
      } else if (error.response) {
        // Server responded with a non-2xx status but no message
        Alert.alert("Warning", "Invalid input");
      } else {
        // Network error or server unreachable
        console.error("Network or server error:", error.message);
        Alert.alert("Error", "Unable to reach the server");
      }
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
