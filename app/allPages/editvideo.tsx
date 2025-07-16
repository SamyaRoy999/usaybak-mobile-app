import { IconBackLeft, IconErowBack, IconReplece } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { _Width } from '@/utils/utils'
import { useEvent } from 'expo'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const editvideo = () => {

    const player = useVideoPlayer("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", (player) => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, "playingChange", {
        isPlaying: player.playing,
    });

    return (
        <KeyboardAvoidingView style={tw`flex-1 bg-primary`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={tw`relative`}>
                    <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                        <View
                            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                        >
                            <TouchableOpacity onPress={() => router.back()}>
                                <SvgXml xml={IconBackLeft} />
                            </TouchableOpacity>
                        </View>
                        <Text style={tw`font-poppinsMedium text-xl `}>
                            Replace video
                        </Text>
                        <View>
                        </View>
                    </View>
                </View>
                <VideoView
                    style={styles.video}
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                />
                <View style={tw`p-5`}>
                    <TouchableOpacity
                        style={tw`py-3 flex-row gap-4 w-3/6 items-center border border-[#3B97D3]  px-6 rounded-full  bg-primary`}
                    >
                        <SvgXml xml={IconReplece} />
                        <Text style={tw`font-poppins  text-base text-[#3B97D3]`}>
                            Replace video
                        </Text>
                    </TouchableOpacity>
                    {/* State */}
                    <TouchableOpacity style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}>
                        <Text style={tw`font-poppins text-base`}>State</Text>
                        <SvgXml xml={IconErowBack} />
                    </TouchableOpacity>
                    {/* City */}
                    <TouchableOpacity style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}>
                        <Text style={tw`font-poppins text-base`}>City</Text>
                        <SvgXml xml={IconErowBack} />
                    </TouchableOpacity>
                    {/* Category */}
                    <TouchableOpacity style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}>
                        <Text style={tw`font-poppins text-base`}>Category</Text>
                        <SvgXml xml={IconErowBack} />
                    </TouchableOpacity>
                    <View style={tw`mt-5`}>
                        <TextInput
                            defaultValue='Video title goes here'
                            placeholder=""
                            style={tw`border border-gray-300 font-poppins text-base rounded-full px-4 py-3 mb-4`}
                        />
                        <TextInput
                            defaultValue='VLorem ipsum dolor sit amet consectetur. Aliquet nec turpis ipsum proin viverra ultrices nunc nisl. Massa at erat metus sagittis et. Dui aenean volutpat fringilla tellus. Rutrum massa proin est pulvinar. Mauris lectus id nunc mauris. Vel et metus quis accumsan laoreet id. Eget id duis nibh facilisis nunc justo faucibus feugiat. Imperdiet massa urna faucibus pellentesque fermentum. Rhoncus tincidunt eget urna molestie pulvinar vivamus rhoncus vitae nisl.'
                            // placeholder="Video description goes here"
                            textAlignVertical='top'
                            style={tw`border border-gray-300 font-poppins text-base rounded-2xl px-4 py-3 h-52`}
                            multiline
                        />
                    </View>

                    {/* Thumbnail */}
                    <View style={tw`flex-col justify-center items-center`}>
                        <Image
                            source={{
                                uri: 'https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=80',
                            }}
                            style={tw`w-full h-48 rounded-md my-4 mx-5`}
                        />
                    </View>
                    <TouchableOpacity
                        style={tw`py-3 flex-row gap-4 w-4/6 items-center border border-[#3B97D3]  px-6 rounded-full  bg-primary`}
                    >
                        <SvgXml xml={IconReplece} />
                        <Text style={tw`font-poppins  text-base text-[#3B97D3]`}>
                            Select another image
                        </Text>
                    </TouchableOpacity>
                    {/* Category */}
                    <TouchableOpacity style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}>
                        <Text style={tw`font-poppins text-base`}>Visibility</Text>
                        <SvgXml xml={IconErowBack} />
                    </TouchableOpacity>
                    {/* Save button */}
                    <View style={tw` mt-6 mb-10`}>
                        <TouchableOpacity style={tw`bg-[#FF5A5F] py-4 rounded-full`}>
                            <Text style={tw`text-center text-white font-poppinsBold text-lg`}>Save changes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default editvideo

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
