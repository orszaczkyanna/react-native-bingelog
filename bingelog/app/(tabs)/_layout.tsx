// Tabs layout file
// Defines the bottom tab navigator with Home, My Lists, and Profile tabs

import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const iconSize: number = 24;

  return (
    // Removed SafeAreaView wrapper here:
    // it reduced the usable screen area with extra padding,
    // and removing it did not cause any layout issues in testing

    // <SafeAreaView className="flex-1">
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.foreground.secondary,
        tabBarStyle: {
          position: "absolute", // Removes unwanted top margin above the tab bar
          bottom: 0,
          height: 84, // px
          backgroundColor: Colors.background.primary,
          borderTopColor: Colors.foreground.divider,
          paddingTop: 16,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Nunito-Sans-Regular",
          marginBottom: 12,
          marginTop: 4,
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={iconSize} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-lists"
        options={{
          title: "My Lists",
          tabBarIcon: ({ color }) => (
            <Feather size={iconSize} name="bookmark" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather size={iconSize} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
    // </SafeAreaView>
  );
}
