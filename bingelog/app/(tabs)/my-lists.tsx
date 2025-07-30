import React from "react";
import { View, Text } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import ProtectedScreen from "@/components/ProtectedScreen";

const MyLists = () => {
  return (
    // <ProtectedScreen>
    <ScreenWrapper>
      <View>
        <Text className="text-body">My Lists</Text>
      </View>
    </ScreenWrapper>
    // </ProtectedScreen>
  );
};

export default MyLists;
