import * as React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { IconNextLeft, IconNextRight } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { Image } from "expo-image";
import { landingSliderImg } from "@/assets/images/images";
import data from "../../lib/data.json";
import Card from "./Card";
import { _HIGHT, _Width } from "@/utils/utils";

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
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card data={item} />}
          showsVerticalScrollIndicator={false}
          horizontal
          scrollEnabled={false}
        />
      </View>
    );

const CarouselCard = () => {
  const progress = useSharedValue<number>(0);

  return (
    <View style={tw`w-full relative`}>
      <Carousel
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        autoPlay={true}
        height={_HIGHT * 0.3}
        width={_Width * 1.1}
        loop={true}
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
    </View>
  );
};

export default CarouselCard;
