import HeaderBar from "@/components/shear/HeaderBar";
import {
  IconClose,
  IconCopy,
  IconDislike,
  Iconfevarite,
  IconLike,
  IconMessage,
  IconReport,
  IconShare
} from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useLikeVideoMutation, useVideodetailQuery } from "@/redux/apiSlices/videoDetails/videoDetailsSlice";
import { _Width } from "@/utils/utils";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";

const SingleVideo = () => {
  const { id } = useLocalSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [shareVisible, setIsShareVisible] = useState(false);
  const [reportVisible, setReportVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Sexual content");
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [likeDislike, setLikeDislike] = useState<"like" | "dislike" | null>(null);

  const { data, isLoading, error } = useVideodetailQuery({ id });
  const videoDetails = data?.data;
  
  const player = useVideoPlayer(videoDetails?.video || "", (player) => {
    player.loop = true;
    player.play();
  });

  const [likeVideo] = useLikeVideoMutation();

  const handlePress = async (action: "like" | "dislike") => {
    setLikeDislike(action);
    try {
      await likeVideo({ action, video_id: id }).unwrap();
    } catch (err: any) {
      console.error("Failed to send action:", err);

    }
  };

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
  if (isLoading) {
    <View>
      <Text>Loading...</Text>
    </View>
  }


  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={"padding"}
      style={tw`flex-1 bg-primary`}
    >
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
            <Text style={tw`font-poppinsMedium text-xl`}>
              {videoDetails?.title}
            </Text>
            <View style={tw`flex-row items-center gap-2`}>
              <Text style={tw`font-poppins text-sm text-primaryGrayDeep py-2`}>
                {videoDetails?.views_count_formated} views · {videoDetails?.publish_time_formated}
              </Text>
              <TouchableOpacity onPress={() => setDescriptionVisible(true)}>
                <Text style={tw`text-primaryBlue`}>...more</Text>
              </TouchableOpacity>
            </View>

            {/* Channel Info */}
            <View style={tw`flex-row items-center gap-3`}>
              <Image
                source={{ uri: videoDetails?.user.avatar }}
                style={tw`w-10 h-10 rounded-full`}
              />
              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                {videoDetails?.user.channel_name}
              </Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`gap-3 px-4 py-4`}
            >
              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full`}
                onPress={() => handlePress("like")}
              >
                <SvgXml xml={IconLike} />
                <Text>{videoDetails?.likes_count}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full`}
                onPress={() => handlePress("dislike")}
              >
                <SvgXml xml={IconDislike} />
                <Text>{videoDetails?.dislikes_count_formated}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-row items-center gap-4 py-2 px-6 border justify-center border-primaryGray rounded-full`}
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

          {/* Comments Preview */}
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <View style={tw`px-5 border border-primaryGray bg-primaryText mx-5 mb-6 py-3 rounded-lg`}>
              <View style={tw`flex-row items-center gap-3`}>
                <Text style={tw`font-poppinsMedium text-lg`}>Comments</Text>
                <Text style={tw`font-poppins text-sm text-primaryGrayDeep`}>
                  {videoDetails?.comment_replies_count_formated}
                </Text>
              </View>
              <View style={tw`flex-row items-center gap-2 py-4`}>
                <Image
                  source={{ uri: videoDetails?.user.avatar }}
                  style={tw`w-7 h-7 rounded-full`}
                />
                <Text style={tw`px-2 font-poppins text-sm`} numberOfLines={2}>
                  {videoDetails?.description || "No comments yet"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Share Modal */}
        <Modal
          visible={shareVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsShareVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`rounded-t-3xl absolute bottom-0 w-full flex-col items-end justify-end`}>
              <View style={tw`bg-primary rounded-t-3xl`}>
                <View style={tw`bg-secondary w-full rounded-t-3xl flex-row items-center justify-between p-5`}>
                  <View></View>
                  <Text style={tw`text-primary text-xl font-poppins`}>Share</Text>
                  <TouchableOpacity onPress={() => setIsShareVisible(false)}>
                    <SvgXml xml={IconClose} />
                  </TouchableOpacity>
                </View>
                <View style={tw`text-center flex items-center justify-center px-11 py-5`}>
                  <Text style={tw`text-xl font-poppinsMedium`}>Link for this video</Text>
                  <Text style={tw`text-sm text-center font-poppins text-primaryGrayDeep my-3`}>
                    Copy this link and share to your friends
                  </Text>
                </View>
                <View style={tw`bg-primaryText py-4 px-7 rounded-full mx-5`}>
                  <Text numberOfLines={1}>{videoDetails?.link || "https://example.com/video"}</Text>
                </View>
                <TouchableOpacity
                  style={tw`flex-row items-center bg-primaryText justify-center my-3 mx-auto gap-4 py-4 px-9 border border-primaryGray rounded-full w-40`}
                >
                  <SvgXml xml={IconCopy} />
                  <Text>Copy link</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Comments Modal */}
        <Modal
          visible={isVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-primary rounded-t-3xl w-full h-4/6 mt-78`}>
              <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                <View></View>
                <Text style={tw`text-primary text-xl font-poppins`}>Comments</Text>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={tw`pb-20`}>
                {/* Sample comments - replace with actual API data */}
                {[...Array(5)].map((_, i) => (
                  <View key={i} style={tw`flex-row gap-4 pt-4 px-7`}>
                    <Image
                      source={{ uri: videoDetails?.user.avatar }}
                      style={tw`w-10 h-10 rounded-full`}
                    />
                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Text style={tw`font-poppinsMedium text-lg`}>User {i + 1}</Text>
                        <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                        <Text>10 hours ago</Text>
                      </View>
                      <Text style={tw`font-poppins text-sm`}>
                        This is a sample comment #{i + 1} on the video
                      </Text>
                      <View style={tw`flex-row gap-4 py-5`}>
                        <View style={tw`flex-row gap-4`}>
                          <SvgXml xml={Iconfevarite} />
                          <Text>2.6k</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => setReplyVisible(true)}
                          style={tw`flex-row gap-4`}
                        >
                          <SvgXml xml={IconMessage} />
                          <Text>10</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={tw`absolute bottom-0 w-full bg-primary py-3 px-5 flex-row items-center`}>
                <Image
                  source={{ uri: videoDetails?.user.avatar }}
                  style={tw`w-10 h-10 rounded-full`}
                />
                <TextInput
                  style={tw`flex-1 bg-primaryOff rounded-full font-poppins px-4 text-sm h-12 ml-3`}
                  placeholder="Add your comment..."
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Report Modal */}
        <Modal
          visible={reportVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setReportVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-white w-full absolute bottom-0 rounded-t-3xl overflow-hidden`}>
              <View style={tw`bg-red-500 py-4 px-6 flex-row justify-between items-center`}>
                <View></View>
                <Text style={tw`text-white text-xl font-poppins`}>Report this video</Text>
                <TouchableOpacity onPress={() => setReportVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={tw`py-4 px-6 max-h-96`}>
                {reportOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSelectedReason(option)}
                    style={tw`flex-row items-center py-2`}
                  >
                    <View style={tw`w-5 h-5 rounded-full border-2 border-red-500 mr-3 justify-center items-center`}>
                      {selectedReason === option && (
                        <View style={tw`w-3 h-3 rounded-full bg-red-500`} />
                      )}
                    </View>
                    <Text style={tw`text-base font-poppins`}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={tw`flex-row justify-end gap-12 px-6 py-4 border-t border-gray-200`}>
                <TouchableOpacity onPress={() => setReportVisible(false)}>
                  <Text style={tw`text-base font-poppins`}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setReportVisible(false);
                    setFeedbackVisible(true);
                  }}
                >
                  <Text style={tw`text-base font-poppins text-red-500`}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Feedback Modal */}
        <Modal
          visible={feedbackVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setFeedbackVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-white w-full absolute bottom-0 rounded-t-3xl overflow-hidden`}>
              <View style={tw`bg-red-500 py-4 px-6 flex-row justify-between items-center`}>
                <View></View>
                <Text style={tw`text-white text-xl font-poppinsMedium`}>Report this video</Text>
                <TouchableOpacity onPress={() => setFeedbackVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>
              <View style={tw`p-6`}>
                <TextInput
                  multiline
                  numberOfLines={6}
                  maxLength={1000}
                  value={feedbackText}
                  textAlignVertical="top"
                  onChangeText={setFeedbackText}
                  placeholder="Describe your issue..."
                  placeholderTextColor="#888"
                  style={tw`border border-gray-300 rounded-xl p-4 text-base text-black h-40`}
                />
                <Text style={tw`text-right text-xs mt-2 text-gray-500`}>
                  {feedbackText.length} / 1000
                </Text>
              </View>
              <View style={tw`flex-row justify-end gap-12 px-6 py-4 border-t border-gray-200`}>
                <TouchableOpacity onPress={() => setFeedbackVisible(false)}>
                  <Text style={tw`text-base font-poppins`}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFeedbackVisible(false);
                  }}
                >
                  <Text style={tw`text-base font-poppins text-red-500`}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Description Modal */}
        <Modal
          visible={descriptionVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setDescriptionVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-white w-full absolute bottom-0 rounded-t-3xl overflow-hidden`}>
              <View style={tw`bg-red-500 py-4 px-6 flex-row justify-between items-center`}>
                <View></View>
                <Text style={tw`text-white text-xl font-poppinsMedium`}>Description</Text>
                <TouchableOpacity onPress={() => setDescriptionVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={tw`p-6`}>
                <Text style={tw`text-lg font-poppinsMedium py-4`}>
                  {videoDetails?.title}
                </Text>
                <View style={tw`flex-row justify-between mb-6`}>
                  <View style={tw`items-center`}>
                    <Text style={tw`font-poppinsSemiBold text-3xl`}>
                      {videoDetails?.likes_count_formated}
                    </Text>
                    <Text style={tw`text-base font-poppins text-gray-600`}>Likes</Text>
                  </View>
                  <View style={tw`items-center`}>
                    <Text style={tw`font-poppinsSemiBold text-3xl`}>
                      {videoDetails?.views_count_formated}
                    </Text>
                    <Text style={tw`text-base font-poppins text-gray-600`}>Views</Text>
                  </View>
                  <View style={tw`items-center`}>
                    <Text style={tw`font-poppinsSemiBold text-3xl`}>
                      {videoDetails?.publish_date.split('-')[0]}
                    </Text>
                    <Text style={tw`text-base font-poppins text-gray-600`}>
                      {videoDetails?.publish_date.split('-').slice(1).join('-')}
                    </Text>
                  </View>
                </View>
                <Text style={tw`font-poppins text-base text-black leading-6`}>
                  {videoDetails?.description || "No description available"}
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* Replies Modal */}
        <Modal
          visible={replyVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setReplyVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-primary rounded-t-3xl w-full h-4/6 mt-78`}>
              <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                <View></View>
                <Text style={tw`text-primary text-xl font-poppins`}>Replies</Text>
                <TouchableOpacity onPress={() => setReplyVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={tw`pb-20`}>
                {[...Array(5)].map((_, i) => (
                  <View key={i} style={tw`flex-row gap-4 pt-4 px-7`}>
                    <Image
                      source={{ uri: videoDetails?.user?.avatar }}
                      style={tw`w-10 h-10 rounded-full`}
                    />
                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row items-center gap-2`}>
                        <Text style={tw`font-poppinsMedium text-lg`}>User {i + 1}</Text>
                        <View style={tw`bg-primaryGray rounded-full h-2 w-2`} />
                        <Text>10 hours ago</Text>
                      </View>
                      <Text style={tw`font-poppins text-sm`}>
                        This is a sample reply #{i + 1} to the comment
                      </Text>
                      <View style={tw`flex-row gap-4 py-5`}>
                        <View style={tw`flex-row gap-4`}>
                          <SvgXml xml={Iconfevarite} />
                          <Text>2.6k</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={tw`absolute bottom-0 w-full bg-primary py-3 px-5 flex-row items-center`}>
                <Image
                  source={{ uri: videoDetails?.user?.avatar }}
                  style={tw`w-10 h-10 rounded-full`}
                />
                <TextInput
                  style={tw`flex-1 bg-primaryOff rounded-full font-poppins px-4 text-sm h-12 ml-3`}
                  placeholder="Add your reply..."
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SingleVideo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  video: {
    width: _Width,
    height: 250,
  },
});