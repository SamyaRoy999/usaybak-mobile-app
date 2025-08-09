import {
    IconBackLeft,
    IconClose,
    IconErowBack,
    IconLock,
    IconReplece,
    IconWorld,
    IconWornoingDelete,
} from '@/icons/Icon';
import tw from '@/lib/tailwind';
import { useMy_videos_detailsQuery, useUpdateVideoMutation } from '@/redux/apiSlices/MyVideo/myvideoSlice';
import { useCategoriesQuery } from '@/redux/apiSlices/UploadVideo/uploadVideoSices';
import { _Width } from '@/utils/utils';
import { useEvent } from 'expo';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import {
    FlatList,
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

const editVideoDetails = () => {
    const [stateModalVisible, setStateModalVisible] = React.useState(false);
    const [cityModalVisible, setCityModalVisible] = React.useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);
    const [selectedState, setSelectedState] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const [selectedVisibility, setSelectedVisibility] = React.useState('');
    const [visibility, setVisibility] = React.useState(false);
    const [selectedCity, setSelectedCity] = React.useState('');
    const [categoryID, setCategoryID] = React.useState('');
    const [image, setImage] = React.useState<any>(null);
    const [selectedVideos, setSelectedVideos] = React.useState<any>(null);
    const { id } = useLocalSearchParams();

    //.................... API CALL ..................//

    const { data: singleVideo } = useMy_videos_detailsQuery({ id });
    const { category, city, states, video, thumbnail, description, title, visibility: visibilityApi } = singleVideo?.data
    const {
        data: categories,
        isLoading,
        refetch
    } = useCategoriesQuery({});
    const categoryData = categories?.data?.data
    const [updateVideo] = useUpdateVideoMutation()

    // ................ UPLOAD IMG ...............//

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };

    // ................ UPLOAD VIDEO ...............//

    const pickVideo = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedVideos(result.assets[0]);
        }
    };

    const player = useVideoPlayer(
        // api get video
        selectedVideos ? selectedVideos.uri : video,
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
                <View style={tw`relative mt-5`}>
                    <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                        <TouchableOpacity
                            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full items-center justify-center border border-primaryGray`}
                            onPress={() => router.back()}
                        >
                            <SvgXml xml={IconBackLeft} />
                        </TouchableOpacity>
                        <Text style={tw`font-poppinsMedium text-xl`}>Replace video</Text>
                        <View></View>
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
                        onPress={pickVideo}
                        style={tw`py-3 flex-row gap-4 w-4/7 items-center border border-[#3B97D3] px-6 rounded-full bg-primary`}
                    >
                        <SvgXml xml={IconReplece} />
                        <Text style={tw`font-poppins text-base text-[#3B97D3]`}>Replace video</Text>
                    </TouchableOpacity>

                    {/* State */}
                    <View style={tw`pt-4`}>
                        <TouchableOpacity
                            onPress={() => setStateModalVisible(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full `}
                        >
                            <Text style={tw`font-poppins text-base`}>{selectedState ? selectedState : states}</Text>
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

                    {/* City */}
                    <View style={tw`pt-4`}>
                        <TouchableOpacity
                            onPress={() => setCityModalVisible(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full `}
                        >
                            <Text style={tw`font-poppins text-base`}>{selectedCity ? selectedCity : city}</Text>
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

                    {/* Category */}
                    <View style={tw`pt-4`}>
                        <TouchableOpacity
                            onPress={() => setCategoryModalVisible(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full `}
                        >
                            {isLoading ? (
                                <Text style={tw`flex-1 justify-center items-center`}>loading...</Text>
                            )
                                : (<Text style={tw`font-poppins text-base`}>{selectedCategory ? selectedCategory : category?.name}</Text>)
                            }
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

                    {/* Title & Description */}
                    <View style={tw`mt-5`}>
                        <TextInput
                            defaultValue={title}
                            style={tw`border border-gray-300 font-poppins text-base rounded-full px-4 py-3 mb-4`}
                        />
                        <TextInput
                            defaultValue={description}
                            multiline
                            textAlignVertical="top"
                            style={tw`border border-gray-300 font-poppins text-base rounded-2xl px-4 py-3 h-52`}
                        />
                    </View>

                    {/* Thumbnail */}
                    <View style={tw`items-center`}>
                        {
                            image ?
                                <Image
                                    source={{
                                        uri: image.uri
                                    }}
                                    style={tw`w-full h-48 rounded-md my-4 mx-5`}

                                /> : <Image source={{ uri: thumbnail }} style={tw`w-full h-48 rounded-md my-4 mx-5`} />
                        }

                    </View>

                    <TouchableOpacity
                        style={tw`py-3 flex-row gap-4 w-5/7 items-center border border-[#3B97D3] px-6 rounded-full bg-primary`}
                        onPress={pickImage}
                    >
                        <SvgXml xml={IconReplece} />
                        <Text style={tw`font-poppins text-base text-[#3B97D3]`}>
                            Select another image
                        </Text>
                    </TouchableOpacity>

                    {/* Visibility */}
                    <View style={tw`pt-5`}>
                        <TouchableOpacity
                            onPress={() => setVisibility(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full `}
                        >
                            <Text style={tw`font-poppins text-base`}>{selectedVisibility ? selectedVisibility : visibilityApi}</Text>
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

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

                {/* State Modal */}
                <Modal
                    visible={stateModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setStateModalVisible(false)}
                >
                    <View style={tw`flex-1 justify-end bg-black/50`}>
                        <View style={tw`bg-primary rounded-t-3xl w-full `}>
                            {/* Header */}
                            <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>Select State</Text>
                                <TouchableOpacity onPress={() => setStateModalVisible(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            {['State 1', 'State 2', 'State 3', 'State 4', 'State 5'].map((state, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedState(state);
                                        setStateModalVisible(false);
                                    }}
                                    style={tw` bg-black/50 justify-center `}
                                >
                                    <View style={tw`bg-primary flex-col justify-center border border-dashed border-primaryGray py-4 items-center `}>
                                        <Text style={tw`font-poppins text-base`}>{state}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>

                {/* City Modal */}
                <Modal
                    visible={cityModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCityModalVisible(false)}
                >
                    <View style={tw`flex-1 justify-end bg-black/50`}>
                        <View style={tw`bg-primary rounded-t-3xl w-full `}>
                            {/* Header */}
                            <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>Select city</Text>
                                <TouchableOpacity onPress={() => setCityModalVisible(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            {['City 1', 'City 2', 'City 3', 'City 4', 'City 5'].map((city, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedCity(city);
                                        setCityModalVisible(false);
                                    }}
                                    style={tw` bg-black/50 justify-center `}
                                >
                                    <View style={tw`bg-primary flex-col justify-center border border-dashed border-primaryGray py-4 items-center `}>
                                        <Text style={tw`font-poppins text-base`}>{city}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>

                {/* Category Modal */}
                <Modal
                    visible={categoryModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCategoryModalVisible(false)}
                >
                    <View style={tw`flex-1 justify-end bg-black/50`}>
                        <View style={tw`bg-primary rounded-t-3xl w-full `}>
                            {/* Header */}
                            <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>Select Category</Text>
                                <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={categoryData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSelectedCategory(item?.name)
                                            setCategoryID(item?.id);
                                            setCategoryModalVisible(false);
                                        }}
                                        style={tw`py-4 border-b border-primaryGray`}
                                    >
                                        <Text style={tw`text-center font-poppins text-base`}>{item?.name}</Text>
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                            />
                        </View>
                    </View>
                </Modal>

                {/* Visibility Modal */}

                <Modal
                    visible={visibility}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setVisibility(false)}
                >
                    <View style={tw`flex-1 justify-end bg-black/50`}>
                        <View style={tw`bg-primary rounded-t-3xl w-full `}>
                            {/* Header */}
                            <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                <View></View>
                                <Text style={tw`text-primary text-xl font-poppins`}>Select Visibility</Text>
                                <TouchableOpacity onPress={() => setVisibility(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedVisibility('Everyone');
                                    setVisibility(false);
                                }}
                                style={tw` bg-black/50 justify-center `}
                            >
                                <View style={tw`bg-primary flex-col justify-center border border-dashed border-primaryGray py-4 items-center `}>
                                    <View style={tw`flex-row items-center justify-center gap-3`}>
                                        <SvgXml xml={IconWorld} />
                                        <Text style={tw`font-poppins text-base`}>Everyone</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedVisibility('Only me');
                                    setVisibility(false);
                                }}
                                style={tw` bg-black/50 justify-center `}
                            >
                                <View style={tw`bg-primary flex-col justify-center border border-dashed border-primaryGray py-4 items-center `}>
                                    <View style={tw`flex-row items-center justify-center gap-3`}>
                                        <SvgXml xml={IconLock} />
                                        <Text style={tw`font-poppins text-base`}>Only me</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default editVideoDetails;

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
