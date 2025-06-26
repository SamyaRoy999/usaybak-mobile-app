import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const authLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="splash" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="forgotPass" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="newPass" />
    </Stack>
  );
};

export default authLayout;
