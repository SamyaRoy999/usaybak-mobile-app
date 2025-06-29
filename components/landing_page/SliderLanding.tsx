import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { IconNextLeft, IconNextRight } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { landingSliderImg } from "@/assets/images/images";

const defaultDataWith6Colors = [
  "#B0604D",
  "#899F9C",
  "#B3C680",
  "#5C6265",
  "#F5D399",
  "#F1F1F1",
];

export const renderItem =
  ({ rounded }: any) =>
  ({ item }: any) =>
    (
      <View
        style={{
          //   backgroundColor: item,
          flex: 1,

          borderRadius: rounded ? 20 : 0,
        }}
      >
        <Image
          source={landingSliderImg}
          style={tw`h-[200px] w-[380px] rounded-2xl`}
        />
      </View>
    );

const SliderLanding = () => {
  const progress = useSharedValue<number>(0);
  const carouselRef = React.useRef<any>(null);

  return (
    <View style={tw`w-full relative`}>
      <Carousel
        ref={carouselRef}
        autoPlayInterval={1000}
        data={defaultDataWith6Colors}
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
        renderItem={renderItem({ rounded: true })}
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
