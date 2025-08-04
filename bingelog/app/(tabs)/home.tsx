import React, { useEffect } from "react";
import { View, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ProtectedScreen from "@/components/ProtectedScreen";
import SearchBar from "@/components/SearchBar";

// Test imports
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import SecondaryButton from "@/components/SecondaryButton";

import { refreshAccessToken } from "@/features/auth/refreshAccessToken";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { EXPO_TMDB_API_KEY } from "@env";

const Home = () => {
  const router = useRouter();
  const { clearSessionAuth } = useAuthContext();

  // for testing purposes to ensure the refresh logic works as expected
  const testRefresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      console.log("New access token:", newAccessToken);
    } catch (error) {
      console.error("Refresh token error:", error);
    }
  };

  // for testing protected endpoint access
  const axiosPrivate = useAxiosPrivate();
  const testProtectedRequest = async () => {
    try {
      const response = await axiosPrivate.get("/protected/test");
      console.log("Protected data:", response.data);
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const { accessToken } = useAuthContext();
  console.log("Access token in Home:", accessToken);

  useEffect(() => {
    console.log("TMDB API KEY:", EXPO_TMDB_API_KEY);
  }, []);

  return (
    // <ProtectedScreen>
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center gap-y-4">
        <Text className="text-body">Home</Text>
        <SearchBar />
        {/* <LabeledInputField /> */}

        {/* Test buttons */}
        <SecondaryButton
          title="Force Logout"
          onPress={clearSessionAuth}
          variant="danger"
          pressableClassName="mt-10"
        />

        <SecondaryButton
          title="Sign up"
          onPress={() => router.replace("/sign-up")}
          variant="confirm"
        />

        <SecondaryButton
          title="Log in"
          onPress={() => router.replace("/log-in")}
          variant="confirm"
        />

        <SecondaryButton
          title="New Access Token"
          onPress={testRefresh}
          pressableClassName="mt-10"
        />

        <SecondaryButton
          title="Test Protected Request"
          onPress={testProtectedRequest}
        />
      </View>
    </ScreenWrapper>
    // </ProtectedScreen>
  );
};

export default Home;
