import HeaderBar from '@/components/shear/HeaderBar'
import { IconAnalytics, IconBackLeft, IconClose, IconComment, IconDate, IconDelete, IconDislike, IconEays, IconEdit, IconErow, Iconfevarite, IconLike, IconMessage, IconSettingDot, IconTime, IconWorld, IconWornoingDelete } from '@/icons/Icon'
import data from "@/lib/data.json"
import tw from '@/lib/tailwind'
import { _Width } from '@/utils/utils'
import { useEvent } from 'expo'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { useVideoPlayer, VideoView } from 'expo-video'
import React, { useEffect } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'

const videodetails = () => {
    const [history, setHistory] = React.useState(false)
    const [singleVideo, setSingleVideo] = React.useState<any>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [commentVisible, setCommentVisible] = React.useState(false);
    const [replyVisible, setReplyVisible] = React.useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

    const { id } = useLocalSearchParams()
    console.log(id);
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
    console.log(singleVideo);

    return (

        <View style={tw`flex-1 bg-primary`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderBar />
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
                            Video details
                        </Text>
                        <TouchableOpacity onPress={() => setHistory(!history)}>
                            <View
                                style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                            >
                                <SvgXml xml={IconSettingDot} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {history && (
                        <View style={tw`absolute bg-primaryText right-5 w-56 top-14 z-20 b shadow-lg rounded-lg`}>
                            <TouchableOpacity onPress={() => router.push("/allPages/editvideo")}>
                                <View style={tw`flex-row items-start gap-3 px-5 py-4`}>
                                    <SvgXml xml={IconEdit} />
                                    <Text style={tw`font-poppinsMedium text-base `} >Edit video</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push("/allPages/analytics")} style={tw`border border-y border-primaryGray`}>
                                <View style={tw`flex-row items-start gap-3 px-5 py-4`}>
                                    <SvgXml xml={IconAnalytics} />
                                    <Text style={tw`font-poppinsMedium text-base `} >Analytics</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
                                <View style={tw`flex-row items-start gap-3 px-5 py-4`}>
                                    <SvgXml xml={IconDelete} />
                                    <Text style={tw`font-poppinsMedium text-base`} >Delete video</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {/* video details */}
                {singleVideo && (
                    <View style={tw``}>
                        <VideoView
                            style={styles.video}
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                        />
                        <View style={tw`px-4`}>

                            <Text style={tw`font-poppinsMedium text-xl py-5`}>Title</Text>
                            <Text style={tw`font-poppins text-base pb-5`}>{singleVideo?.title}</Text>
                            <Text style={tw`font-poppinsMedium text-xl`}>Category</Text>
                            <Text style={tw`font-poppins text-base`}>Category 1</Text>
                            <View style={tw`flex-row justify-between py-5 w-4/6`}>
                                <Text style={tw`font-poppinsMedium text-xl`}>State</Text>
                                <Text style={tw`font-poppinsMedium text-xl`}>City</Text>
                            </View>
                            <View style={tw`flex-row justify-between pb-5 w-4/6`}>
                                <Text style={tw`font-poppins text-base`}>New York</Text>
                                <Text style={tw`font-poppins text-base`}>Alaska</Text>
                            </View>
                            <Text style={tw`font-poppinsMedium text-xl pb-3`}>Description</Text>
                            <Text style={tw`font-poppins text-base`}>Lorem ipsum dolor sit amet consectetur. Fermentum vitae nisi donec lacus morbi pharetra sed in. In ultrices nunc mi amet vulputate. Interdum varius tellus tempus placerat et commodo pellentesque. A est fermentum mi senectus eget. A donec porttitor sagittis arcu mauris. Viverra vulputate urna euismod tristique sed. Euismod nunc nascetur sit mattis id non ut. Massa sit feugiat iaculis ut tellus imperdiet bibendum mattis. Cras bibendum praesent arcu pharetra aliquam cras.</Text>
                            <Text style={tw`font-poppinsMedium text-xl py-3`}>Thumbnail</Text>
                            {/* Video Player */}
                            <Image
                                source={singleVideo?.thumbnail}
                                style={tw`w-full h-48 rounded-lg`}

                            />
                            <Text style={tw`font-poppinsMedium text-xl py-3`}>Visibility</Text>
                            <TouchableOpacity
                                style={tw`py-3 flex-row gap-4 w-3/6 items-center border border-primaryGray  px-6 rounded-full  bg-primary`}
                            >
                                <SvgXml xml={IconWorld} />
                                <Text style={tw`font-poppins  text-base text-secondaryBlack`}>
                                    Everyone
                                </Text>
                            </TouchableOpacity>
                            <Text style={tw`font-poppinsMedium text-xl py-3`}>Publish time</Text>
                            <TouchableOpacity
                                style={tw`py-3 flex-row gap-4 justify-center items-center border border-primaryGray  px-6 rounded-full  bg-primary`}
                            >
                                <View style={tw`flex-row gap-3 items-center`}>
                                    <SvgXml xml={IconDate} />
                                    <Text style={tw`font-poppins  text-base text-secondaryBlack`}>
                                        24-04-2025
                                    </Text>
                                </View>
                                <View style={tw`flex-row gap-3 items-center`}>
                                    <SvgXml xml={IconTime} />
                                    <Text style={tw`font-poppins  text-base text-secondaryBlack`}>
                                        10:20 AM
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={tw`font-poppinsMedium text-xl py-3`}>Statistics</Text>
                            {/* Stats Cards */}
                            <View style={tw`flex-row w-full gap-2 justify-between items-center mb-8`}>
                                <View style={tw`border w-20 h-20  flex-col items-center justify-center border-gray-200 rounded-lg`}>
                                    <SvgXml xml={IconEays} />
                                    <Text style={tw`font-poppinsSemiBold text-xl pt-3`}>10,256</Text>
                                </View>
                                <View style={tw`border w-20 h-20 flex-col items-center justify-center border-gray-200 rounded-lg`}>
                                    <SvgXml xml={IconLike} />
                                    <Text style={tw`font-poppinsSemiBold text-xl pt-3`}>1,256</Text>
                                </View>
                                <View style={tw`border w-20 h-20 flex-col items-center justify-center border-gray-200 rounded-lg`}>
                                    <SvgXml xml={IconDislike} />
                                    <Text style={tw`font-poppinsSemiBold text-xl pt-3`}>256</Text>
                                </View>
                                <View style={tw`border w-20 h-20 flex-col items-center justify-center border-gray-200 rounded-lg`}>
                                    <SvgXml xml={IconComment} />
                                    <Text style={tw`font-poppinsSemiBold text-xl pt-3`}>256</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={tw`py-3 flex-row gap-4 items-center border w-3/6 border-primaryGray  px-6 rounded-full  bg-primary`}
                                onPress={() => setCommentVisible(true)}
                            >
                                <Text style={tw`font-poppins  text-base text-secondaryBlack`}>
                                    See comments
                                </Text>
                                <SvgXml xml={IconErow} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                <Modal
                    visible={commentVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCommentVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl  w-full h-4/6 mt-78  `}>
                            <View
                                style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}
                            >
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>
                                    Comments
                                </Text>

                                <TouchableOpacity onPress={() => setCommentVisible(false)}>
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
                                            <TouchableOpacity onPress={() => {
                                                setCommentVisible(false); // hide comment modal
                                                setTimeout(() => {
                                                    setReplyVisible(true); // show reply modal (with delay for smooth transition)
                                                }, 300);
                                            }} style={tw`flex-row gap-4 `}>
                                                <SvgXml xml={IconMessage} />
                                                <Text>10</Text>
                                            </TouchableOpacity>
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
                                            <TouchableOpacity onPress={() => {
                                                setCommentVisible(false); // hide comment modal
                                                setTimeout(() => {
                                                    setReplyVisible(true); // show reply modal (with delay for smooth transition)
                                                }, 300);
                                            }} style={tw`flex-row gap-4 `}>
                                                <SvgXml xml={IconMessage} />
                                                <Text>10</Text>
                                            </TouchableOpacity>
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
                                            <TouchableOpacity onPress={() => {
                                                setCommentVisible(false); // hide comment modal
                                                setTimeout(() => {
                                                    setReplyVisible(true); // show reply modal (with delay for smooth transition)
                                                }, 300);
                                            }} style={tw`flex-row gap-4 `}>
                                                <SvgXml xml={IconMessage} />
                                                <Text>10</Text>
                                            </TouchableOpacity>
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
                                            <TouchableOpacity onPress={() => {
                                                setCommentVisible(false); // hide comment modal
                                                setTimeout(() => {
                                                    setReplyVisible(true); // show reply modal (with delay for smooth transition)
                                                }, 300);
                                            }} style={tw`flex-row gap-4 `}>
                                                <SvgXml xml={IconMessage} />
                                                <Text>10</Text>
                                            </TouchableOpacity>
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
                                            <TouchableOpacity onPress={() => {
                                                setCommentVisible(false); // hide comment modal
                                                setTimeout(() => {
                                                    setReplyVisible(true); // show reply modal (with delay for smooth transition)
                                                }, 300);
                                            }} style={tw`flex-row gap-4 `}>
                                                <SvgXml xml={IconMessage} />
                                                <Text>10</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>

                        </View>
                    </View>
                </Modal>
                {/* Replies */}
                <Modal
                    visible={replyVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setReplyVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl  w-full h-4/6 mt-78  `}>
                            <View
                                style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}
                            >
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>
                                    Replies
                                </Text>

                                <TouchableOpacity onPress={() => setReplyVisible(false)}>
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
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                {/* Deleted video */}

                <Modal
                    visible={deleteModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setDeleteModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl absolute bottom-0  w-full h-2/6 mt-78  `}>
                            <View
                                style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}
                            >
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>
                                    Delete video
                                </Text>

                                <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView contentContainerStyle={tw`px-4 `} showsVerticalScrollIndicator={false}>
                                <View style={tw` flex-col items-center justify-center pt-5`}>
                                    <SvgXml xml={IconWornoingDelete} />
                                    <Text style={tw`font-poppinsMedium text-lg text-secondary pt-5`}>Are you sure to delete this video ?</Text>
                                    <Text style={tw`font-poppinsMedium text-sm text-primaryGrayDeep pt-1 pb-7`}>Users can’t find your video anymore.</Text>
                                </View>
                                <View style={tw`flex-row justify-center gap-3`}>
                                    <TouchableOpacity style={tw` w-2/6 py-5 border flex-row rounded-full justify-center border-primaryGray`}>
                                        <Text style={tw`text-sm font-poppinsMedium`}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw` w-2/6 bg-secondary  py-5 border flex-row rounded-full justify-center border-primaryGray`}>
                                        <Text style={tw`text-sm text-primary font-poppinsMedium`}>Yes, Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>

    )
}

export default videodetails



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
