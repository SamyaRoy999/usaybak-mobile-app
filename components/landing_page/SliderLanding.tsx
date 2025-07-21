import { IconNextLeft, IconNextRight } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useBannerQuery } from "@/redux/apiSlices/Home/homeApiSlices";
import { Image } from "expo-image";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SvgXml } from "react-native-svg";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];


const SliderLanding = () => {
  const progress = useSharedValue<number>(0);
  const carouselRef = React.useRef<any>(null);
  // ------GET DATA -----------
  const {
    data: banner,
    isFetching,
    isLoading,
    refetch,
  } = useBannerQuery({
    params: {
      per_page: 500,
    },
  });
(banner);

  return (
    <View style={tw`w-full relative`}>
      <Carousel
        ref={carouselRef}
        autoPlayInterval={3000}
        data={banner?.data?.data} // backend images used here
        height={230}
        width={380}
        loop
        pagingEnabled
        snapEnabled
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item }: any) => (
          <View style={{ flex: 1, borderRadius: 20 }}>
            <Image
              source={{ uri: item.image }}
              style={tw`h-[200px] w-[380px] rounded-2xl`}
              contentFit="cover"
            />
          </View>
        )}
      />


      {/* Navigation Buttons */}
      <View
        style={tw`flex-row w-full justify-between px-9 absolute top-[34%] right-4`}
      >
        <TouchableOpacity onPress={() => carouselRef.current?.prev()}>
          <SvgXml xml={IconNextLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => carouselRef.current?.next()}>
          <SvgXml xml={IconNextRight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SliderLanding;
