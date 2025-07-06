import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from "react-native";
import React, { Profiler } from "react";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackLeft, IconGmail, IconLikes, IconLoction, IconPhone, IconPhoto, IconVideo } from "@/icons/Icon";
import HeaderBar from "@/components/shear/HeaderBar";
import { profileBanner, profleImg } from "@/assets/images/images";
import { Image } from "expo-image";
import { _HIGHT, _Width } from "@/utils/utils";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import data from "@/lib/data.json";
import Card from "@/components/landing_page/Card";

const channelProfile = () => {
  const locations = [
    {
      latitude: 37.78825,
      longitude: -122.4324,
      title: "Location 1",
    },
    {
      latitude: 37.78925,
      longitude: -122.4224,
      title: "Location 2",
    },
    {
      latitude: 37.79025,
      longitude: -122.4124,
      title: "Location 3",
    },
  ];

  return (
    <View style={tw`flex-1 bg-primary`}>
      <ScrollView contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
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
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`font-poppinsMedium text-xl pb-4`
            }>Haircut Pro</Text>
            <View style={tw`flex-row gap-3 p-1`}>
              <SvgXml xml={IconLoction} />
              <Text style={tw` text-base font-poppins `}>New work, USA</Text>
            </View>
            <View style={tw`flex-row gap-3  p-1`}>
              <SvgXml xml={IconPhone} />
              <Text style={tw` text-base font-poppins`}>+65896585232</Text>
            </View>
            <View style={tw`flex-row gap-3 p-1`}>
              <SvgXml xml={IconGmail} />
              <Text style={tw`text-base font-poppins `}>example@gmail.com</Text>
            </View>
          </View>
        </View>
        <View style={tw`mt-10 mx-5 p-5 flex-row justify-between items-center border border-primaryGray rounded-xl`}>
          <SvgXml xml={IconVideo} />
          <View style={tw`flex-col justify-center items-center`}>
            <Text style={tw`text-base font-poppins`}>Videos</Text>
            <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>40</Text>
          </View>
        </View>
        <View style={tw`flex-row items-center gap-4 pt-2 w-full px-5`}>
          <View style={[tw` items-center  p-5 pt-4 border border-primaryGray rounded-xl`, {
            width: _Width * 0.43,
          }]}>
            <SvgXml xml={IconPhoto} />
            <View style={tw`flex-col justify-center items-center`}>
              <Text style={tw`text-base font-poppins pt-4`}>Videos</Text>
              <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>22,568</Text>
            </View>
          </View>
          <View style={[tw` items-center  p-5 pt-4 border border-primaryGray rounded-xl`, {
            width: _Width * 0.43,
          }]}>
            <SvgXml xml={IconLikes} />
            <View style={tw`flex-col justify-center items-center`}>
              <Text style={tw`text-base font-poppins pt-4`}>Likes</Text>
              <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>17,256</Text>
            </View>
          </View>
        </View>
        {/* About section */}
        <View style={tw`mt-10 mx-5 p-5  border border-primaryGray rounded-xl`}>
          <Text style={tw`font-poppinsMedium text-xl pb-3`}>About</Text>
          <Text style={tw`font-poppins text-sm `}>Lorem ipsum dolor sit amet consectetur. Nibh sagittis ligula sem pulvinar elementum rhoncus lacus. Dignissim pretium vitae neque vulputate velit libero suscipit amet. Felis proin in tortor amet. Sit imperdiet ac aliquam leo est egestas. Sit id vitae tempus nulla ut consectetur mi lobortis nec. Convallis velit lectus aliquam elementum dignissim. Est risus adipiscing ornare et lorem </Text>
        </View>
        {/* Services */}
        <View style={tw`mt-10 mx-5 p-5 flex-col justify-start  border border-primaryGray rounded-xl`}>
          <Text style={tw`font-poppinsMedium text-xl pb-3`}>Services</Text>
          <Text style={tw`font-poppins text-base pb-2 `}>1. Haircuts & Trims </Text>
          <Text style={tw`font-poppins text-base pb-2 `}>2. Hair Styling</Text>
          <Text style={tw`font-poppins text-base pb-2 `}>3. Hair Coloring</Text>
          <Text style={tw`font-poppins text-base pb-2 `}>4. Hair Treatments</Text>
          <Text style={tw`font-poppins text-base pb-2 `}>5. Chemical Services </Text>
        </View>
         <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card data={item} />}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default channelProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: 300,
  },
});