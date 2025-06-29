import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Card from "@/components/landing_page/Card";
import data from "../../../lib/data.json";
import SliderLanding from "@/components/landing_page/SliderLanding";
import CarouselCard from "@/components/landing_page/CarouselCard";
import HeaderBar from "@/components/shear/HeaderBar";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconErow, IconErowred } from "@/icons/Icon";

const landingPage = () => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar />
        <SliderLanding />
        <CarouselCard />
        {/* Beauty esthetics btn */}
        <View
          style={tw`flex-row w-full justify-between items-center px-5 py-6`}
        >
          <TouchableOpacity style={tw`bg-secondaryRed100 py-3 px-4 rounded-lg`}>
            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Beauty esthetics
            </Text>
          </TouchableOpacity>
          <View style={tw``}>
            <TouchableOpacity
              style={tw`py-3 flex-row gap-4 items-center  px-5 rounded-full border border-secondary`}
            >
              <Text style={tw`font-poppinsMedium text-base text-secondary`}>
                See all
              </Text>
              <SvgXml xml={IconErowred} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Beauty esthetics end */}
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

export default landingPage;
