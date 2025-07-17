import { Stack } from "expo-router";
import React from "react";

const AllPagelayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="search" />
      <Stack.Screen name="channelProfile" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="history" />
      <Stack.Screen name="likeds" />
      <Stack.Screen name="report" />
      <Stack.Screen name="my_videos" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="aboutUs" />
      <Stack.Screen name="contactUs" />
      <Stack.Screen name="termsConditions" />
      <Stack.Screen name="onsiteAccount" />
      <Stack.Screen name="FaqSection" />
      <Stack.Screen name="editvideo" />
      <Stack.Screen name="uploadVideo" />
    </Stack>
  );
};

export default AllPagelayout;
