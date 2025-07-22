import React from "react";
import { View, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ProtectedScreen from "@/components/ProtectedScreen";

// Test imports
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import CTAButton from "@/components/CTAButton";

const Home = () => {
  const router = useRouter();
  const { clearSessionAuth } = useAuthContext();

  return (
    <ProtectedScreen>
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center gap-y-4">
          <Text className="text-body">Home</Text>

          {/* Test buttons */}
          <CTAButton title="Force Logout" onPress={clearSessionAuth} />

          <CTAButton
            title="Sign up"
            onPress={() => router.replace("/sign-up")}
          />

          <CTAButton title="Log in" onPress={() => router.replace("/log-in")} />
        </View>
      </ScreenWrapper>
    </ProtectedScreen>
  );
};

export default Home;
