import { View, ActivityIndicator, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";

const index = () => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/home/(tabs)/Blogs");
      // router.replace("/auth/login");
    }, 1000);
  }, []);

  return (
    <View style={tw`flex-1 py-16 bg-white justify-between  items-center`}>
      <View></View>
      <Image
        style={tw`w-[233px] h-[76px] `}
        source={require("@/assets/images/logo.png")}
      />
      <ActivityIndicator color={"red"} size={"large"} />
    </View>
  );
};

export default index;
