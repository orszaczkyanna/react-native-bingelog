import React from "react";
import { View, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ProtectedScreen from "@/components/ProtectedScreen";

const Profile = () => {
  return (
    // <ProtectedScreen>
    <ScreenWrapper>
      <View>
        <Text className="text-body">Profile</Text>
      </View>
    </ScreenWrapper>
    // </ProtectedScreen>
  );
};

export default Profile;
