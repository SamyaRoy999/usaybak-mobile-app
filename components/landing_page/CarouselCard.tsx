import tw from "@/lib/tailwind";
import { usePromotedVideoQuery } from "@/redux/apiSlices/Home/homeApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import * as React from "react";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import Card from "./Card";


export const CarouselCard = () => {
  const progress = useSharedValue<number>(0);

  const {
    data: promoted,
    isFetching,
    isLoading,
    refetch,
  } = usePromotedVideoQuery({
    params: {
      per_page: 10,
    },
  });

  return (
    <View style={tw`w-full relative`}>
      <Carousel
        autoPlayInterval={2000}
        data={promoted?.data?.data || []}
        autoPlay={true}
        height={_HIGHT * 0.3}
        width={_Width * 1}
        loop={true}
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item }: any) => (
          <View>
            <Card data={item} />
          </View>
        )}
      />
    </View>
  );
};
