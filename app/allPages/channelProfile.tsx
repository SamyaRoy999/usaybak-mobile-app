import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { Profiler } from "react";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackLeft, IconGmail, IconLoction, IconPhone } from "@/icons/Icon";
import HeaderBar from "@/components/shear/HeaderBar";
import { profileBanner, profleImg } from "@/assets/images/images";
import { Image } from "expo-image";
import { _HIGHT, _Width } from "@/utils/utils";

const channelProfile = () => {
  return (
    <View style={tw`flex-1 bg-primary`}>
      <ScrollView contentContainerStyle={tw``}>
        <HeaderBar />
        <View style={tw`flex-row items-center justify-between px-5`}>
          <View
            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <SvgXml xml={IconBackLeft} />
            </TouchableOpacity>
          </View>
          <Text style={tw`font-poppinsMedium text-xl`}>Channel profile</Text>
          <View></View>
        </View>
        <View style={tw`px-5 pt-5`}>
          {/* Profile banner */}
          <Image
            source={profileBanner}
            style={[
              tw`w-full rounded-2xl relative`,
              {
                // width: _Width * 0.3,
                height: _HIGHT * 0.19,
              },
            ]}
          />
          {/* Profile  */}
          <View
            style={tw`bg-primary rounded-full h-28 w-28 flex-row items-center justify-center  right-[45%] -bottom-10 absolute`}
          >
            <Image source={profleImg} style={tw`rounded-full h-24 w-24 `} />
          </View>
        </View>
        <View style={tw`mt-14 flex-row justify-center  `}>
          <View>
            <Text style={tw`font-poppinsMedium text-xl`}>Haircut Pro</Text>
            <View style={tw`flex-row gap-3`}>
              <SvgXml xml={IconLoction} />
              <Text style={tw`font-poppins text-base`}>New work, USA</Text>
            </View>
            <View style={tw`flex-row gap-3`}>
              <SvgXml xml={IconPhone} />
              <Text style={tw``}>+65896585232</Text>
            </View>
            <View style={tw`flex-row gap-3`}>
              <SvgXml xml={IconGmail} />
              <Text style={tw``}>example@gmail.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default channelProfile;
