// import CarouselCard from "@/components/landing_page/CarouselCard";
import { CarouselCard } from "@/components/landing_page/CarouselCard";
import CatagoryCard from "@/components/landing_page/CatagoryCard";
import SliderLanding from "@/components/landing_page/SliderLanding";
import HeaderBar from "@/components/shear/HeaderBar";
import tw from "@/lib/tailwind";
import { useCaragoryVideosQuery, usePromotedVideoHomeQuery } from "@/redux/apiSlices/Home/homeApiSlices";
import React from "react";
import {
  FlatList,
  ScrollView,
  View
} from "react-native";


const landingPage = () => {
  // promoted video api 
  const { data: promoted } = usePromotedVideoHomeQuery({});
  const promotedVideo = promoted?.data?.data;
  // caragoryVideo
  const {
    data: caragoryVideos,
    isLoading,
    refetch
  } = useCaragoryVideosQuery({
    params: {
      per_page: 500,
    },
  });
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`}>
        <HeaderBar />
        <SliderLanding />
        <CarouselCard promotedVideo={promotedVideo} />
        <FlatList
          data={caragoryVideos?.data}
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
