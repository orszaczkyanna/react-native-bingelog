import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

export default function TabLayout() {
  const iconSize: number = 24;

  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: Colors.foreground.secondary,
          tabBarStyle: {
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
    </SafeAreaView>
  );
}
