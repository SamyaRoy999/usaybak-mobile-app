import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { ImgLogo } from "@/assets/images/images";
import { SvgXml } from "react-native-svg";
import { IconLogin, IconSplash } from "@/icons/Icon";

const splash = () => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 1000);
  }, []);
  return (
    <View style={tw`bg-secondary flex-1 justify-between`}>
      <SvgXml xml={IconLogin} />
      <SvgXml xml={IconSplash} />
    </View>
  );
};

export default splash;
