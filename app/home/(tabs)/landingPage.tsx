import CatagoryCard from "@/components/landing_page/CatagoryCard";
import SliderLanding from "@/components/landing_page/SliderLanding";
import HeaderBar from "@/components/shear/HeaderBar";
import tw from "@/lib/tailwind";
import { useProfileQuery } from "@/redux/apiSlices/Account/accountSlice";
import { useCaragoryVideosQuery, usePromotedVideoHomeQuery } from "@/redux/apiSlices/Home/homeApiSlices";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  View
} from "react-native";

const LandingPage = () => {
  const { data: defouldData, isLoading: userLoading, refetch: userRef } = useProfileQuery({});

  // ................promoted video api.................// 
  const { data: promoted, isLoading: lodingPromoted } = usePromotedVideoHomeQuery({});
  const promotedVideo = promoted?.data?.data;

  // .............caragoryVideo................//
  const {
    data: caragoryVideos,
    isLoading: categoryLoading,
    refetch: categoryRefetch
  } = useCaragoryVideosQuery({
    params: {
      per_page: 500,
    },
  });

  useEffect(() => {
    userRef();
    // This effect will run when defouldData changes
    if (defouldData?.data?.registration_type === "on_site" && defouldData?.data?.is_pay === 0) {
      router.push("/(allPages)/paymentOnside");
    }
  }, [defouldData]);



  // Show loading if any of the queries are loading
  if (userLoading || lodingPromoted || categoryLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
        <HeaderBar />
        <SliderLanding />
        <FlatList
          data={caragoryVideos?.data?.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CatagoryCard data={item} isLoading={categoryLoading} />}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default LandingPage;