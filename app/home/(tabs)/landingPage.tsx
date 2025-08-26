// import CarouselCard from "@/components/landing_page/CarouselCard";
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

const landingPage = () => {
  const { data: defouldData, isLoading: userLoading, refetch: userRef } = useProfileQuery({})

  useEffect(() => {
    userRef()
    if (defouldData?.data?.registration_type === "on_site") {
      if (defouldData?.data?.is_pay === 0) {
        router.push("/(allPages)/paymentOnside")
      }
    }
  }, [])
  // ................promoted video api.................// 



  const { data: promoted, isLoading: lodingPromoted } = usePromotedVideoHomeQuery({});
  const promotedVideo = promoted?.data?.data;
  // .............caragoryVideo................//
  const {
    data: caragoryVideos,
    isLoading,
    refetch
  } = useCaragoryVideosQuery({
    params: {
      per_page: 500,
    },
  });


  console.log("user", defouldData);

  if (isLoading && lodingPromoted && userLoading) {
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
          renderItem={({ item }) => <CatagoryCard data={item} isLoading={isLoading} />}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default landingPage;