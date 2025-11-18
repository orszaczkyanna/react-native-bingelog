// Returns a dark header matching the app theme

import Colors from "@/constants/Colors";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const getThemedHeaderOptions = (
  title: string
): NativeStackNavigationOptions => ({
  headerShown: true,
  title, // title: headerTitle
  headerStyle: { backgroundColor: Colors.background.input },
  headerTintColor: Colors.foreground.primary, // the color of back button and title
  headerTitleStyle: { fontFamily: "Nunito-Sans-Regular", fontSize: 18 },
  headerShadowVisible: false,
  headerBackButtonDisplayMode: "minimal", // display only the icon without a title
});
