import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const index = () => {
  useEffect(() => {
    setTimeout(() => {
      // router.replace("/auth/login");
       router.replace("/(allPages)/my_videos");
      // router.replace("/(allPages)/report");
//      router.replace("/home/(tabs)/landingPage")
      // router.replace("/(allPages)/report")
      // router.replace("/allPages/youTubeLink");

    }, 1000);
  }, []);

  return (
    <View style={tw`flex-1 py-16 bg-white justify-between items-center `}>
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
