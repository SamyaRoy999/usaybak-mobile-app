import {
    IconBackLeft,
    IconClose,
    IconErowBack,
    IconReplece,
    IconWornoingDelete,
} from '@/icons/Icon';
import tw from '@/lib/tailwind';
import { _Width } from '@/utils/utils';
import { useEvent } from 'expo';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const EditVideo = () => {
  const [stateModalVisible, setStateModalVisible] = useState(false);

  const player = useVideoPlayer(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-primary`} behavior="padding">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={tw`relative`}>
          <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
            <TouchableOpacity
              style={tw`bg-primaryText w-13 h-13 p-4 rounded-full items-center justify-center border border-primaryGray`}
              onPress={() => router.back()}
            >
              <SvgXml xml={IconBackLeft} />
            </TouchableOpacity>
            <Text style={tw`font-poppinsMedium text-xl`}>Replace video</Text>
            <View />
          </View>
        </View>

        {/* Video Player */}
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />

        <View style={tw`p-5`}>
          {/* Replace Video Button */}
          <TouchableOpacity
            style={tw`py-3 flex-row gap-4 w-3/6 items-center border border-[#3B97D3] px-6 rounded-full bg-primary`}
          >
            <SvgXml xml={IconReplece} />
            <Text style={tw`font-poppins text-base text-[#3B97D3]`}>Replace video</Text>
          </TouchableOpacity>

          {/* State, City, Category */}
          {['State', 'City', 'Category'].map((item) => (
            <TouchableOpacity
              key={item}
              style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}
            >
              <Text style={tw`font-poppins text-base`}>{item}</Text>
              <SvgXml xml={IconErowBack} />
            </TouchableOpacity>
          ))}

          {/* Title & Description */}
          <View style={tw`mt-5`}>
            <TextInput
              defaultValue="Video title goes here"
              style={tw`border border-gray-300 font-poppins text-base rounded-full px-4 py-3 mb-4`}
            />
            <TextInput
              defaultValue="Lorem ipsum dolor sit amet consectetur..."
              multiline
              textAlignVertical="top"
              style={tw`border border-gray-300 font-poppins text-base rounded-2xl px-4 py-3 h-52`}
            />
          </View>

          {/* Thumbnail */}
          <View style={tw`items-center`}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=80',
              }}
              style={tw`w-full h-48 rounded-md my-4 mx-5`}
            />
          </View>

          <TouchableOpacity
            style={tw`py-3 flex-row gap-4 w-4/6 items-center border border-[#3B97D3] px-6 rounded-full bg-primary`}
          >
            <SvgXml xml={IconReplece} />
            <Text style={tw`font-poppins text-base text-[#3B97D3]`}>
              Select another image
            </Text>
          </TouchableOpacity>

          {/* Visibility */}
          <TouchableOpacity style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}>
            <Text style={tw`font-poppins text-base`}>Visibility</Text>
            <SvgXml xml={IconErowBack} />
          </TouchableOpacity>

          {/* Save Button */}
          <View style={tw`mt-6 mb-10`}>
            <TouchableOpacity style={tw`bg-[#FF5A5F] py-4 rounded-full`}>
              <Text style={tw`text-center text-white font-poppinsBold text-lg`}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Modal */}
        <Modal
          visible={stateModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setStateModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={tw`bg-primary rounded-t-3xl absolute bottom-0 w-full h-2/6`}>
              <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                <View></View>
                <Text style={tw`text-primary text-xl font-poppins`}>Delete video</Text>
                <TouchableOpacity onPress={() => setStateModalVisible(false)}>
                  <SvgXml xml={IconClose} />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={tw`px-4`} showsVerticalScrollIndicator={false}>
                <View style={tw`items-center pt-5`}>
                  <SvgXml xml={IconWornoingDelete} />
                  <Text style={tw`font-poppinsMedium text-lg text-secondary pt-5`}>Are you sure to delete this video?</Text>
                  <Text style={tw`font-poppinsMedium text-sm text-primaryGrayDeep pt-1 pb-7`}>Users can’t find your video anymore.</Text>
                </View>
                <View style={tw`flex-row justify-center gap-3`}>
                  <TouchableOpacity style={tw`w-2/6 py-5 border flex-row rounded-full justify-center border-primaryGray`}>
                    <Text style={tw`text-sm font-poppinsMedium`}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={tw`w-2/6 bg-secondary py-5 border flex-row rounded-full justify-center border-primaryGray`}>
                    <Text style={tw`text-sm text-primary font-poppinsMedium`}>Yes, Delete</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditVideo;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  video: {
    width: _Width,
    height: 250,
  },
});
