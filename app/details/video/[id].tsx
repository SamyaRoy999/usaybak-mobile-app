import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import data from "../../../lib/data.json";
import { _Width } from "@/utils/utils";
import { FontAwesome } from "@expo/vector-icons";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconDislike, IconLike, IconReport, IconShare } from "@/icons/Icon";
import Card from "@/components/landing_page/Card";

const SingleVideo = () => {
  const { id } = useLocalSearchParams();
  const [singleVideo, setSingleVideo] = useState<any>(null);

  useEffect(() => {
    const videoData = data.find((item: any) => item?.id === Number(id));
    setSingleVideo(videoData);
  }, [id]);

  const player = useVideoPlayer(singleVideo?.video || "", (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  if (!singleVideo) return null;

  return (
    <ScrollView style={tw`flex-1  bg-primary`}>
      {/* Video Player */}
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      {/* Video Info */}
      <View style={tw`p-5`}>
        <Text style={tw`font-poppinsMedium text-xl `}>{singleVideo.title}</Text>
        <Text style={tw`font-poppins text-sm text-primaryGrayDeep py-2`}>
          {singleVideo.views} views · {singleVideo.time} <Text>...more</Text>
        </Text>

        {/* Channel Info */}
        <View style={tw`flex-row items-center gap-3`}>
          <Image
            source={{ uri: singleVideo.avatar }}
            style={tw`w-10 h-10 rounded-full`}
          />
          <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
            {singleVideo.channelName}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`gap-3 px-4 py-4`}
        >
          <View
            style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
          >
            <SvgXml xml={IconLike} />
            <Text>10</Text>
          </View>

          <View
            style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
          >
            <SvgXml xml={IconDislike} />
            <Text>10</Text>
          </View>

          <View
            style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
          >
            <SvgXml xml={IconShare} />
            <Text>10</Text>
          </View>

          <View
            style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
          >
            <SvgXml xml={IconReport} />
            <Text>10</Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={tw`px-5 border border-primaryGray bg-primaryText mx-5  mb-6 py-3 rounded-lg`}
      >
        <View style={tw`flex-row items-center gap-3`}>
          <Text style={tw`font-poppinsMedium text-lg`}>Comments</Text>
          <Text style={tw`font-poppins text-sm text-primaryGrayDeep`}>100</Text>
        </View>
        <View style={tw`flex-row items-center gap-2 py-4 `}>
          <Image
            source={{ uri: singleVideo.avatar }}
            style={tw`w-7 h-7 rounded-full`}
          />
          <Text style={tw`px-2 font-poppins text-sm`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          </Text>
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
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  video: {
    width: _Width,
    height: 250,
  },
  controlsContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  meta: {
    color: "#666",
    marginBottom: 10,
  },
  more: {
    color: "#888",
  },
  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginRight: 10,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconButton: {
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  commentsBox: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  commentCount: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 8,
  },
  commentText: {
    flex: 1,
    color: "#333",
  },
});
