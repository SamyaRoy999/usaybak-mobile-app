import HeaderBar from '@/components/shear/HeaderBar'
import { IconAdd, IconBackLeft, IconClose, IconErowBack, IconUpload, IconWorld, IconYoutub } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { useMyVideoQuery } from '@/redux/apiSlices/MyVideo/myvideoSlice'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const my_videos = () => {
    const [history, setHistory] = React.useState(false)
    const [uploadModalVisible, setUploadModalVisible] = React.useState(false)

    // ......................API CALL ..................//

    const { data: myVideo, isLoading, error } = useMyVideoQuery({})
    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Error loading TermsCond Data </Text>
            </View>
        );
    }


    return (
        <View style={tw`bg-primary`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderBar />
                <View style={tw`relative`}>

                    <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <View
                                style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                            >
                                <SvgXml xml={IconBackLeft} />
                            </View>
                        </TouchableOpacity>
                        <Text style={tw`font-poppinsMedium text-xl `}>
                            My videos
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setUploadModalVisible(true)
                            setHistory(!history)

                        }}>
                            <View
                                style={tw`bg-secondary w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                            >
                                <SvgXml xml={IconAdd} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw`px-2 mx-5 `}>
                    {/* History  */}
                    <FlatList
                        data={myVideo?.data?.data}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => router.push(`/details/Videodetails/${item.id}`)}>

                                <View style={[tw` mr-4 flex-row gap-4 pb-5`, { width: _Width * 0.4 }]}>
                                    <Image
                                        style={[
                                            tw`rounded-xl`,
                                            { width: _Width * 0.4, height: _HIGHT * 0.16 },
                                        ]}
                                        source={{ uri: item?.thumbnail }}
                                    />
                                    <View style={tw``}>

                                        <Text
                                            style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                                        >
                                            {item?.title.slice(0, 3)}
                                        </Text>
                                        <Text
                                            style={tw`text-sm  py-1 text-secondaryBlack `}
                                        >
                                            {item?.description?.slice(0, 6)}
                                        </Text>
                                        <TouchableOpacity
                                            style={tw`py-3 flex-row gap-4 items-center border border-primaryGray  px-6 rounded-full  bg-primary`}
                                        >
                                            <SvgXml xml={IconWorld} />
                                            <Text style={tw`font-poppins  text-base text-secondaryBlack`}>
                                                Everyone
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {/* Delete Modal */}
                <Modal
                    visible={uploadModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setUploadModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl absolute bottom-0 w-full h-2/6`}>
                            <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>Upload</Text>
                                <TouchableOpacity onPress={() => setUploadModalVisible(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView contentContainerStyle={tw`px-4  flex-1 items-center justify-center`} showsVerticalScrollIndicator={false}>
                                <View style={tw`flex-col justify-center gap-3`}>
                                    <TouchableOpacity onPress={() => router.push("/(allPages)/uploadVideo")} style={tw` py-5 bg-primaryText flex-row rounded-2xl justify-between px-4 items-center gap-3 `}>
                                        <View style={tw`flex-row items-center gap-3`}>
                                            <SvgXml xml={IconUpload} />
                                            <Text style={tw`text-lg font-poppins`}>Upload video <Text style={tw`text-sm`}>($9.99 / month)</Text> </Text>
                                        </View>
                                        <SvgXml xml={IconErowBack} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => router.push("/(allPages)/youTubeLink")} style={tw` py-5 bg-primaryText flex-row rounded-2xl justify-between px-4 items-center gap-3 `}>
                                        <View style={tw`flex-row items-center gap-3`}>
                                            <SvgXml xml={IconYoutub} />
                                            <Text style={tw`text-lg font-poppins`}>YouTube Link  <Text style={tw`text-sm`}>(Free)</Text> </Text>
                                        </View>
                                        <SvgXml xml={IconErowBack} />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView >
        </View >
    )
}

export default my_videos

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
