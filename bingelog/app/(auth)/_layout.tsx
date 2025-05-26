import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="log-in" />
    </Stack>
  );
};

export default AuthLayout;
