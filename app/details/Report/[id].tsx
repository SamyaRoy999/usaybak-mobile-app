
import { thumbnail } from '@/assets/images/images'
import HeaderBar from '@/components/shear/HeaderBar'
import { IconBackLeft, IconClose, IconSend, IconWorning } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { _HIGHT } from '@/utils/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import data from "../../../lib/data.json"

const ReportDetails = () => {
    const { id } = useLocalSearchParams();
    const [singleVideo, setSingleVideo] = useState<any>(null);
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [appealVisible, setAppealVisible] = useState(false)
    useEffect(() => {
        const videoData = data.find((item: any) => item?.id === Number(id));
        setSingleVideo(videoData);
    }, [id]);


    return (
        <View style={tw`flex-1  bg-primary`}>
            {singleVideo && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[tw`flex-col  justify-between`, {
                        height: _HIGHT * 0.9,
                    }]}>
                        <View>
                            <HeaderBar />
                            <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                                <View
                                    style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                                >
                                    <TouchableOpacity onPress={() => router.back()}>
                                        <SvgXml xml={IconBackLeft} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={tw`font-poppinsMedium text-xl `}>
                                    Report details
                                </Text>
                                <View></View>
                            </View>
                            <View>
                                {/* Video Player */}
                                <Image
                                    source={thumbnail}
                                    style={tw`w-full h-48`}

                                />
                                {/* Video Info */}
                                <View style={tw`p-5`}>
                                    <Text style={tw`font-poppinsMedium text-xl `}>
                                        {singleVideo?.title}
                                    </Text>
                                    <View style={tw`flex-row items-center gap-2`}>
                                        <Text style={tw`font-poppins text-sm text-primaryGrayDeep py-2`}>
                                            {singleVideo.views} views · {singleVideo.time}
                                        </Text>
                                        <TouchableOpacity style={tw`border border-primaryGray  p-2 rounded-full`} onPress={() => setDescriptionVisible(true)}>
                                            <Text style={tw``}>...more</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`border border-primaryGray p-3 mx-4 mb-12 flex-row items-center gap-4 rounded-lg px-8`}>
                                <SvgXml xml={IconWorning} />
                                <View>
                                    <Text style={tw`text-xl font-poppinsSemiBold text-secondary`}>MyTSV deleted your video.</Text>
                                    <Text style={tw`text-lg font-poppins`}>Reason: Sexual content.</Text>
                                    <Text style={tw`font-poppins  text-base`}>
                                        This video will no longer available.
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Register Button */}
                        <View style={tw`px-5 mb-10`}>
                            <TouchableOpacity
                                onPress={() => setAppealVisible(true)}
                                style={tw`flex-row items-center gap-2 py-4 bg-secondary px-4  mt-14 rounded-full justify-center`}
                            >
                                <Text style={tw`text-primaryText text-lg font-poppinsMedium`}>
                                    Appeal to MyTSV
                                </Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* more Description */}
                    <Modal
                        visible={descriptionVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setDescriptionVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={tw`bg-white w-full absolute bottom-0 rounded-t-3xl overflow-hidden`}>
                                {/* Header */}
                                <View style={tw`bg-red-500 py-4 px-6 flex-row justify-between items-center`}>
                                    <View></View>
                                    <Text style={tw`text-white text-xl font-poppinsMedium`}>Description</Text>
                                    <TouchableOpacity onPress={() => setDescriptionVisible(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>

                                {/* Content */}
                                <ScrollView contentContainerStyle={tw`p-6`}>
                                    <Text style={tw`text-lg font-poppinsMedium py-8`}>
                                        Joe's Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL 60647,
                                    </Text>

                                    {/* Stats row */}
                                    <View style={tw`flex-row justify-between mb-6`}>
                                        <View style={tw`items-center`}>
                                            <Text style={tw` font-poppinsSemiBold  text-3xl`}>10</Text>
                                            <Text style={tw`text-base font-poppins text-gray-600`}>Likes</Text>
                                        </View>
                                        <View style={tw`items-center`}>
                                            {/* <Text style={tw`font-poppinsSemiBold  text-3xl`}>{singleVideo.views}</Text> */}
                                            <Text style={tw`text-base font-poppins text-gray-600`}>Views</Text>
                                        </View>
                                        <View style={tw`items-center`}>
                                            <Text style={tw`font-poppinsSemiBold  text-3xl`}>2025</Text>
                                            <Text style={tw`text-base font-poppins text-gray-600`}>May 08</Text>
                                        </View>
                                    </View>

                                    <Text style={tw`font-poppins text-base text-black leading-6 `}>
                                        Lorem ipsum dolor sit amet consectetur. Fermentum vitae nisi donec
                                        lacus morbi pharetra sed in. In ultrices nunc mi amet vulputate.
                                        Interdum varius tellus tempus placerat et commodo pellentesque...
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                    {/* Appeal Visible */}
                    <Modal
                        visible={appealVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setAppealVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={tw`bg-white w-full absolute bottom-0 rounded-t-3xl overflow-hidden`}>
                                {/* Header */}
                                <View style={tw`bg-red-500 py-4 px-6 flex-row justify-between items-center`}>
                                    <View></View>
                                    <Text style={tw`text-white text-xl font-poppinsMedium`}>Appeal to MyTSV</Text>
                                    <TouchableOpacity onPress={() => setAppealVisible(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>

                                {/* Content */}
                                <ScrollView contentContainerStyle={tw`p-6`}>
                                    <View style={tw`flex-col gap-6 mt-9`}>

                                        <View style={tw`relative`}>
                                            <View style={tw`bg-primaryText absolute px-4 flex-row justify-center items-center left-7 font-poppins text-base -top-2 z-10`}>
                                                <Text style={tw`font-poppins text-base`}>* Subject</Text>
                                            </View>
                                            <TextInput
                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-16`}

                                            />
                                        </View>
                                        <View style={tw`relative`}>
                                            <View style={tw`bg-primaryText absolute px-4 flex-row justify-center items-center left-7 font-poppins text-base -top-2 z-10`}>
                                                <Text style={tw`font-poppins text-base`}>* Your message</Text>
                                            </View>
                                            <TextInput
                                                style={tw`border border-primaryGray rounded-xl font-poppins text-base px-5 h-40`}

                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        style={tw`flex-row items-center gap-2 py-5 bg-secondary px-4  mt-14 rounded-full justify-center`}
                                    >
                                        <Text style={tw`text-primaryText text-base font-poppinsBold`}>
                                            Send message
                                        </Text>
                                        <SvgXml xml={IconSend} />
                                    </TouchableOpacity>

                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            )
            }
        </View >
    )
}

export default ReportDetails
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",

    }
})