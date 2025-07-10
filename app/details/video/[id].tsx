import Card from "@/components/landing_page/Card";
import HeaderBar from "@/components/shear/HeaderBar";
import {
  IconClose,
  IconCopy,
  IconDislike,
  Iconfevarite,
  IconLike,
  IconMessage,
  IconReport,
  IconShare,
} from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { _Width } from "@/utils/utils";
import { useEvent } from "expo";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";
import data from "../../../lib/data.json";

const SingleVideo = () => {
  const { id } = useLocalSearchParams();
  const [singleVideo, setSingleVideo] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shareVisible, setIsShareVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Sexual content");

  const reportOptions = [
    "Sexual content",
    "Violent or repulsive content",
    "Hateful or abusive content",
    "Harassment or bullying",
    "Harmful or dangerous acts",
    "Misinformation",
    "Child abuse",
    "Promotes terrorism",
    "Spam or misleading",
    "Legal issue",
    "Captions issue",
  ];

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
    <View style={tw`flex-1  bg-primary`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar />
        <View>
          {/* Video Player */}
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />

          {/* Video Info */}
          <View style={tw`p-5`}>
            <Text style={tw`font-poppinsMedium text-xl `}>
              {singleVideo.title}
            </Text>
            <Text style={tw`font-poppins text-sm text-primaryGrayDeep py-2`}>
              {singleVideo.views} views · {singleVideo.time}{" "}
              <Text>...more</Text>
            </Text>

            {/* Channel Info */}
            <View style={tw`flex-row items-center gap-3`}>
              <Image
                source={{ uri: singleVideo.avatar }}
                style={tw`w-10 h-10 rounded-full`}
              />
              <Text
                style={tw`font-poppinsMedium text-base text-secondaryBlack`}
              >
                {singleVideo.channelName}
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`gap-3 px-4 py-4`}
            >
              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
              >
                <SvgXml xml={IconLike} />
                <Text>10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
              >
                <SvgXml xml={IconDislike} />
                <Text>10</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full `}
                onPress={() => setIsShareVisible(true)}
              >
                <SvgXml xml={IconShare} />
                <Text>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full`}
                onPress={() => setReportVisible(true)}
              >
                <SvgXml xml={IconReport} />
                <Text>Report</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
          {/* Comments */}
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <View
              style={tw`px-5 border border-primaryGray bg-primaryText mx-5  mb-6 py-3 rounded-lg`}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <Text style={tw`font-poppinsMedium text-lg`}>Comments</Text>
                <Text style={tw`font-poppins text-sm text-primaryGrayDeep`}>
                  100
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2 py-4 `}>
                <Image
                  source={{ uri: singleVideo.avatar }}
                  style={tw`w-7 h-7 rounded-full`}
                />
                <Text style={tw`px-2 font-poppins text-sm`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* Comments */}
          {/* Beauty esthetics end */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card data={item} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
        {/* shear modal */}
        <Modal
          visible={shareVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsShareVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw` rounded-t-3xl absolute bottom-0 w-full flex-col items-end justify-end`}>
              <View style={tw`bg-primary rounded-t-3xl`}>
                <View
                  style={tw`bg-secondary w-full  rounded-t-3xl flex-row items-center justify-between p-5`}
                >
                  <View></View>
                  <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                    Share
                  </Text>

                  <TouchableOpacity onPress={() => setIsShareVisible(false)}>
                    <SvgXml xml={IconClose} />
                  </TouchableOpacity>
                </View>
                <View style={tw`text-center flex items-center justify-center px-11 py-5`}>
                  <Text style={tw`text-xl font-poppinsMedium`}>Link for this video</Text>
                  <Text style={tw`text-sm text-center py- font-poppins text-primaryGrayDeep my-3`}>Copy this link and share to your friends through anything you want</Text>
                </View>
                <View
                  style={tw`bg-primaryText py-4 px-7 rounded-full mx-5`}
                >
                  <Text>https://www.youtube.com/watch?v=dtW...</Text>
                </View>

                <TouchableOpacity
                  style={[tw`flex-row items-center bg-primaryText justify-center my-3 mx-auto gap-4 py-4 px-9 border  border-primaryGray rounded-full `, {
                    width: _Width * 0.4
                  }]}
                >
                  <SvgXml xml={IconCopy} />
                  <Text>Copy link</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={isVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-primary rounded-t-3xl  w-full h-4/6 mt-78  `}>
              <View
                style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}
              >
                <View></View>
                <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                  Comments
                </Text>

                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`flex-row  gap-4 pt-4  px-7`}>
                  <Image
                    source={{ uri: singleVideo.avatar }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-poppinsMedium text-lg`}>
                        Abid Hasan
                      </Text>
                      <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                      <Text>10 hours ago</Text>
                    </View>
                    <Text style={tw` font-poppins text-sm`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur
                    </Text>
                    <View style={tw`flex-row gap-4 py-5`}>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={Iconfevarite} />
                        <Text>2.6k</Text>
                      </View>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={IconMessage} />
                        <Text>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={tw`flex-row  gap-4 pt-4  px-7`}>
                  <Image
                    source={{ uri: singleVideo.avatar }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-poppinsMedium text-lg`}>
                        Abid Hasan
                      </Text>
                      <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                      <Text>10 hours ago</Text>
                    </View>
                    <Text style={tw` font-poppins text-sm`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur
                    </Text>
                    <View style={tw`flex-row gap-4 py-5`}>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={Iconfevarite} />
                        <Text>2.6k</Text>
                      </View>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={IconMessage} />
                        <Text>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={tw`flex-row  gap-4 pt-4  px-7`}>
                  <Image
                    source={{ uri: singleVideo.avatar }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-poppinsMedium text-lg`}>
                        Abid Hasan
                      </Text>
                      <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                      <Text>10 hours ago</Text>
                    </View>
                    <Text style={tw` font-poppins text-sm`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur
                    </Text>
                    <View style={tw`flex-row gap-4 py-5`}>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={Iconfevarite} />
                        <Text>2.6k</Text>
                      </View>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={IconMessage} />
                        <Text>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={tw`flex-row  gap-4 pt-4  px-7`}>
                  <Image
                    source={{ uri: singleVideo.avatar }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-poppinsMedium text-lg`}>
                        Abid Hasan
                      </Text>
                      <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                      <Text>10 hours ago</Text>
                    </View>
                    <Text style={tw` font-poppins text-sm`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur
                    </Text>
                    <View style={tw`flex-row gap-4 py-5`}>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={Iconfevarite} />
                        <Text>2.6k</Text>
                      </View>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={IconMessage} />
                        <Text>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={tw`flex-row  gap-4 pt-4  px-7`}>
                  <Image
                    source={{ uri: singleVideo.avatar }}
                    style={tw`w-10 h-10 rounded-full`}
                  />
                  <View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <Text style={tw`font-poppinsMedium text-lg`}>
                        Abid Hasan
                      </Text>
                      <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                      <Text>10 hours ago</Text>
                    </View>
                    <Text style={tw` font-poppins text-sm`}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur
                    </Text>
                    <View style={tw`flex-row gap-4 py-5`}>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={Iconfevarite} />
                        <Text>2.6k</Text>
                      </View>
                      <View style={tw`flex-row gap-4 `}>
                        <SvgXml xml={IconMessage} />
                        <Text>10</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View style={tw`flex-row items-center  px-5 w-full`}>
                <Image
                  source={{ uri: singleVideo.avatar }}
                  style={tw`w-10 h-10 rounded-full `}
                />
                <View style={tw`w-72`}>
                  <TextInput
                    style={tw` w-full bg-primaryOff rounded-full font-poppins px-4  text-sm  m-6 h-12`}
                    placeholder="Add your comment..."
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* repoart */}
        <Modal
          visible={reportVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setReportVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-white w-full absolute bottom-0 rounded-t-3xl overflow-hidden`}>
              {/* Header */}
              <View style={tw`bg-red-500 py-4 px-6 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-base font-poppinsMedium`}>Report this video</Text>
                <TouchableOpacity onPress={() => setReportVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>

              {/* Options */}
              <ScrollView contentContainerStyle={tw`py-4 px-6`}>
                {reportOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSelectedReason(option)}
                    style={tw`flex-row items-center py-2`}
                  >
                    <View
                      style={[
                        tw`w-5 h-5 rounded-full border-2 mr-3 justify-center items-center`,
                        { borderColor: "#ff3b30" },
                      ]}
                    >
                      {selectedReason === option && (
                        <View style={tw`w-3 h-3 rounded-full bg-red-500`} />
                      )}
                    </View>
                    <Text style={tw`text-base font-poppins`}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Footer */}
              <View style={tw`flex-row justify-between px-6 py-4 border-t border-gray-200`}>
                <TouchableOpacity onPress={() => setReportVisible(false)}>
                  <Text style={tw`text-base font-poppins`}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  // You can handle submission here
                  setReportVisible(false);
                }}>
                  <Text style={tw`text-base font-poppins text-red-500`}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
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
