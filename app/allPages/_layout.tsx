import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AllPagelayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="search" />
      <Stack.Screen name="channelProfile" />
    </Stack>
  );
};

export default AllPagelayout;
