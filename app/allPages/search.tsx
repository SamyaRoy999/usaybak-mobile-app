import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackLeft, IconErowred, IconTime } from "@/icons/Icon";
import tw from "@/lib/tailwind";

const search = () => {
  return (
    <View style={tw`mt-5 flex-1  bg-primary`}>
      <View style={tw`flex-row items-center justify-between gap-5 px-5 mb-8`}>
        <View
          style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <SvgXml xml={IconBackLeft} />
          </TouchableOpacity>
        </View>
        <Text style={tw`font-poppinsMedium text-2xl`}>Search</Text>
        <View></View>
      </View>
      <View>
        <View style={tw`px-6`}>
          <TextInput
            style={tw`border border-primaryGray bg-primaryText rounded-full font-poppins text-base px-5 h-14`}
            placeholder="Service "
          />
        </View>
        <View style={tw`py-3 px-6 relative`}>
          <TextInput
            style={tw`border border-primaryGray bg-primaryText rounded-full font-poppins text-base px-5 h-14`}
            placeholder="Location"
          />
        </View>
      </View>
      {/* Beauty esthetics btn */}
      <View style={tw`flex-row w-full justify-between items-center px-5 py-6`}>
        <TouchableOpacity style={tw`flex-row gap-3 py-3 px-4 rounded-lg`}>
          <SvgXml xml={IconTime} />
          <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
            History
          </Text>
        </TouchableOpacity>
        <Text style={tw`font-poppinsMedium text-base `}>Service</Text>
      </View>
      {/* Service */}
      <View style={tw`flex-row flex-wrap gap-2 px-5`}>
        <View
          style={tw` gap-3 py-2 px-4 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Hair cutting</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Cooking</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Plumbing</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Painting</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Hair cutting</Text>
        </View>
      </View>
      <Text style={tw`px-5 py-6 text-right font-poppinsMedium text-base`}>
        Location
      </Text>
      {/* Location */}
      <View style={tw`flex-row flex-wrap gap-2 px-5`}>
        <View
          style={tw` gap-3 py-2 px-4 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Hair cutting</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Cooking</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Plumbing</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Painting</Text>
        </View>
        <View
          style={tw` gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
        >
          <Text>Hair cutting</Text>
        </View>
      </View>
      {/* <View style={tw`flex-row  w-full`}> */}
      <TouchableOpacity
        style={tw`bg-secondary rounded-full mx-6  mt-48`}
        onPress={() => {}}
      >
        <Text
          style={tw`text-primary  text-center  text-lg py-[14px] font-poppinsBold`}
        >
          Search
        </Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

export default search;
