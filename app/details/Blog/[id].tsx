import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import tw from "@/lib/tailwind";
import HeaderBar from "@/components/shear/HeaderBar";
import { SvgXml } from "react-native-svg";
import { IconBack, IconBackLeft, IconSearch } from "@/icons/Icon";
import { Image } from "expo-image";
import { blogeImg } from "@/assets/images/images";

const Blag = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={tw`bg-primary flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar />
        <View style={tw`flex-row items-center gap-5 px-5 mb-8`}>
          <View
            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <SvgXml xml={IconBackLeft} />
            </TouchableOpacity>
          </View>
          <Text style={tw`font-poppinsMedium text-xl`}>
            Blog post title goes here
          </Text>
        </View>
        <Image source={blogeImg} style={tw`w-full h-72`} />
        <Text style={tw`p-5 text-sm font-poppins`}>
          Lorem ipsum dolor sit amet consectetur. Amet mauris accumsan maecenas
          lacus. Id viverra mus lorem fermentum non adipiscing id a convallis.
          Luctus nisl neque sodales nunc eu sit fermentum nibh mi. In sed diam
          enim in placerat sodales tortor. Etiam at pharetra morbi quam
          fermentum. Integer dolor vel eu viverra facilisis. Sed cursus in sed
          et id dignissim malesuada massa et. Dignissim ullamcorper commodo
          risus maecenas suspendisse sed. Eget eget integer imperdiet adipiscing
          imperdiet sed fermentum. Enim viverra pellentesque gravida et mauris
          morbi ornare et nec. Nunc volutpat volutpat viverra enim et laoreet
          tortor bibendum viverra. Nullam facilisis eros aliquet id diam gravida
          ut faucibus venenatis. Nunc ultrices purus elementum felis facilisis
          fames sapien tempus ac. In tincidunt enim pellentesque vel lacus
          varius. Fermentum lectus nisi bibendum pellentesque sit risus purus
          lectus ut. Arcu odio pharetra libero vitae dolor. Vitae vel semper at
          tempus. Quis gravida ac pellentesque elementum non. Tortor iaculis
          tortor eget adipiscing sed.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Blag;
