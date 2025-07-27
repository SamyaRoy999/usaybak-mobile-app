import { IconPrmt } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { _Width } from "@/utils/utils";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const Card = ({ data }: any) => {
 
  if (!data) return null;
  const { thumbnail, title, views_count_formated, created_at_format, is_promoted, id, user } =
    data;
       const isPromoted = is_promoted === 1;
  return (
    <View style={tw`bg-primary mb-4 overflow-hidden`}>
      {/* Thumbnail with Promoted badge */}
      <TouchableOpacity onPress={() => router.push(`/details/video/${id}`)}>
        <View style={tw`relative`}>
          <Image
            source={{ uri: thumbnail }}
            style={tw`w-full h-48`}
            resizeMode="cover"
          />
          {isPromoted && (
            <View
              style={tw`absolute top-2 flex-row items-center gap-2 right-2 bg-secondary px-4 py-1 rounded-full`}
            >
              <SvgXml xml={IconPrmt} />
              <Text style={tw`text-primaryText text-base font-poppinsBold`}>
                Promoted
              </Text>
            </View>
          )}
        </View>
        {/* Details section */}
        <View style={tw`flex-row px-4 py-3 items-start`}>
          {/* Channel profile image */}
          <TouchableOpacity
            onPress={() => router.push("/(allPages)/channelProfile")}
          >
            <Image
              source={{ uri: user?.avatar }}
              style={tw`w-10 h-10 rounded-full mr-3`}
            />
          </TouchableOpacity>

          {/* Text info */}
          <View>
            <Text style={[tw`font-poppinsMedium text-lg text-secondaryBlack`, {
              width: _Width * 0.8
            }]}>
              {title}
            </Text>
            <View style={tw`flex-row items-center gap-2 flex-wrap`}>
              <Text
                style={tw`text-secondaryBlack text-base font-poppinsMedium`}
              >
                {user?.channel_name}
              </Text>
              <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
              <Text style={tw`text-secondaryBlack text-base font-poppinsLight`}>
                {views_count_formated} views
              </Text>
              <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
              <Text style={tw`text-secondaryBlack text-base font-poppinsLight`}>
                {created_at_format}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Card;
