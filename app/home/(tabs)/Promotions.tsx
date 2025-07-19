import Card from "@/components/landing_page/Card";
import HeaderBar from "@/components/shear/HeaderBar";
import { IconErowred } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import data from "../../../lib/data.json";

const Promotions = () => {
  return (
    <View style={tw`bg-primary flex-1`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar />
        <Text style={tw`text-3xl font-bold text-center mb-4`}>Promotions</Text>
        {/* Beauty esthetics btn */}
        <View
          style={tw`flex-row w-full justify-between items-center px-5 py-6`}
        >
          <View style={tw`bg-secondaryRed100 py-3 px-4 rounded-lg`}>
            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Beauty esthetics
            </Text>
          </View>
          <View style={tw``}>
            <TouchableOpacity
              onPress={() => router.push("/allPages/beautyEsthetics")}
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
          data={data.filter((item) => item.promoted === true)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card data={item} Promotions={"promoted"} />
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
        {/* Restaurant btn */}
        <View
          style={tw`flex-row w-full justify-between items-center px-5 py-6`}
        >
          <View style={tw`bg-secondaryRed100 py-3 px-4 rounded-lg`}>
            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Restaurant & Catering
            </Text>
          </View>
          <View style={tw``}>
            <TouchableOpacity
              onPress={() => router.push("/allPages/restaurantCatering")}
              style={tw`py-3 flex-row gap-4 items-center  px-5 rounded-full border border-secondary`}
            >
              <Text style={tw`font-poppinsMedium text-base text-secondary`}>
                See all
              </Text>
              <SvgXml xml={IconErowred} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Restaurant end */}
      </ScrollView>
    </View>
  );
};

export default Promotions;
