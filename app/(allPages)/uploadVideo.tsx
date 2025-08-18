import {
    IconBackLeft,
    IconClose,
    IconCloseBlack,
    IconErowBack,
    IconLock,
    IconUpload,
    IconUploadBlue,
    IconWorld
} from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { usePriceGetAllQuery } from '@/redux/apiSlices/Home/homeApiSlices'
import { useMyProfileQuery } from '@/redux/apiSlices/MyVideo/myvideoSlice'
import { usePaymentMutation, usePaymentSuccessMutation } from '@/redux/apiSlices/payment/paymentSlice'
import { useCategoriesQuery, useCityGetQuery, useStateGetQuery, useUpload_videoMutation } from '@/redux/apiSlices/UploadVideo/uploadVideoSices'
import { _Width } from '@/utils/utils'
import { useStripe } from '@stripe/stripe-react-native'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React from 'react'
import {
    ActivityIndicator,
    Button,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification"
import { TextInput } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'

const UploadVideo = () => {
    // .................... State for modals ........................//
    const [paymentVisible, setPaymentVisible] = React.useState(false)
    const [sucssMassage, setSucssMassage] = React.useState(false)
    const [stateModalVisible, setStateModalVisible] = React.useState(false);
    const [cityModalVisible, setCityModalVisible] = React.useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);
    const [visibilityModalVisible, setVisibilityModalVisible] = React.useState(false);
    const [videoAsset, setVideoAsset] = React.useState<ImagePicker.ImagePickerAsset | null>(null);
    const [imageAsset, setImageAsset] = React.useState<ImagePicker.ImagePickerAsset | null>(null);
    const [tags, setTags] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState("");
    const [paymentIntentData, setPaymentIntentData] = React.useState<any>(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [stateID, setStateID] = React.useState(false);


    // ............stripe ..............//
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    //............. Form data state...............//
    const [formData, setFormData] = React.useState({
        state: '',
        city: '',
        type: "video",
        category: '',
        category_id: '',
        title: '',
        description: '',
        visibility: '',
        tags: [],
        is_promoted: '0',
        status: 'active'
    });

    // ............... API CALL.................//

    const {
        data: categories,
        isLoading,
        refetch
    } = useCategoriesQuery({});
    const { data: userId, isLoading: isUserLoading, error: userError, } = useMyProfileQuery({});
    const { data: stateData, isLoading: isStateLoding, refetch: refetchState } = useStateGetQuery({})
    const { data: cityData, isLoading: isCityLoding, refetch: refetchCity } = useCityGetQuery(stateID)

    const categoryData = categories?.data?.data
    const [upload_video] = useUpload_videoMutation()
    const [payment] = usePaymentMutation()
    const [paymentSuccess] = usePaymentSuccessMutation()
    const {
        data: priceUploadVideo,
    } = usePriceGetAllQuery({});


    if (isLoading || isUserLoading || isCityLoding) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={tw`mt-4`}>Loading data...</Text>
            </View>
        );
    }

    console.log(cityData);


    if (userError) {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: "Failed to load user data",
            autoClose: 2000,
        });
    }

    const updateFormData = (field: string, value: string | { name: string }) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleUploadVideo = async () => {
        if (
            !formData.category_id ||
            !formData.type ||
            !formData.title ||
            !formData.description ||
            !formData.visibility ||
            !imageAsset ||
            !videoAsset
        ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Success',
                textBody: "Missing Information",
                autoClose: 2000,
            });
            return;
        }

        setPaymentVisible(false);
        const form = new FormData();

        form.append('category_id', formData.category_id);
        form.append('type', formData.type);
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('visibility', formData.visibility);
        form.append('is_promoted', '0');

        if (tags.length > 0) {
            form.append('tags', JSON.stringify(tags));
        }

        if (formData.state) form.append('states', formData.state);
        if (formData.city) form.append('city', formData.city);

        if (imageAsset) {
            const localUri = imageAsset.uri;
            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename || '');
            const type = match ? `image/${match[1]}` : 'image/jpeg';

            form.append('thumbnail', {
                uri: localUri,
                name: filename || `thumbnail_${Date.now()}.jpg`,
                type,
            } as any);
        }

        if (videoAsset) {
            const localUri = videoAsset.uri;
            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename || '');
            const type = match ? `video/${match[1]}` : 'video/mp4';

            form.append('video', {
                uri: localUri,
                name: filename || `video_${Date.now()}.mp4`,
                type,
            } as any);
        }

        handleSetupInitialPayment(form);
    };

    //............ Payment ...........//

    const handleSetupInitialPayment = async (item: any) => {
        try {
            const amount = priceUploadVideo?.data?.uploading_video || "0";

            const paymentData = {
                reason: "Uploading video",
                amount: amount,
                payment_method: "pm_card_visa",
            }

            const res = await payment(paymentData).unwrap();

            const successData = {
                id: res?.data?.id,
                amount: res.data?.amount,
                reason: "Uploading video"
            };

            setPaymentIntentData(successData);

            const client_secret = res?.data?.client_secret;

            const { error } = await initPaymentSheet({
                merchantDisplayName: "MyTSV App",
                paymentIntentClientSecret: client_secret,
            });

            if (error) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: error?.message,
                    autoClose: 2000,
                });
            } else {
                checkout(item);
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: "Payment setup failed",
                autoClose: 2000,
            });
        }
    }

    const checkout = async (item: any) => {
        setIsProcessing(true);

        try {
            const { error } = await presentPaymentSheet();

            if (error) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: error?.message,
                    autoClose: 2000,
                });
                return;
            }

            if (!userId?.data?.id || !paymentIntentData) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: "User or payment data not available",
                    autoClose: 2000,
                });
                return;
            }

            const data = {
                user_id: userId.data.id,
                payment_intent_id: paymentIntentData.id,
                reason: paymentIntentData.reason,
                amount: paymentIntentData.amount
            }

            const res = await paymentSuccess(data).unwrap();

            if (res?.status) {
                const uploadRes = await upload_video(item).unwrap();
                if (uploadRes.status) {
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Success',
                        textBody: 'Video uploaded successfully!',
                        autoClose: 2000,
                    });
                    setTimeout(() => {
                        router.replace("/home/(tabs)/landingPage");
                    }, 2000);
                }
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: (error as any)?.message || "Payment processing failed",
                autoClose: 2000,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // ............... UPLOAD VIDEO ...................// 

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            setVideoAsset(asset);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];
            setImageAsset(asset);
        }
    };

    // ............... HANDLE TAGS  ..................//

    const handleAddService = () => {
        if (inputValue.trim()) {
            const newTags = [...tags, inputValue.trim()];
            setTags(newTags);
            setFormData((prev: any) => ({ ...prev, tags: newTags }));
            setInputValue("");
        }
    };

    const handleRemoveService = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        setFormData((prev: any) => ({ ...prev, tags: newTags }));
    };

    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={"padding"}
            style={tw`bg-primary flex-1 p-4`}
        >
            {isProcessing && (
                <View style={tw`absolute inset-0 bg-black/50 justify-center items-center z-10`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={tw`text-white mt-4`}>Processing payment...</Text>
                </View>
            )}

            <AlertNotificationRoot>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={tw`relative`}>
                        <View style={tw`flex-row justify-between items-center gap-5  mb-8`}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <View style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}>
                                    <SvgXml xml={IconBackLeft} />
                                </View>
                            </TouchableOpacity>
                            <Text style={tw`font-poppinsMedium text-xl`}>
                                Upload Video
                            </Text>
                            <View></View>
                        </View>
                    </View>

                    {/* Video Upload Area */}
                    <TouchableOpacity
                        style={tw`border border-dashed rounded-lg justify-center items-center flex-col py-10`}
                    >
                        <SvgXml xml={IconUpload} />

                        <Text style={tw`font-poppins text-base text-primaryGrayDeep`}>
                            Drag & drop your file in this area
                        </Text>

                        <>
                            <Text style={tw`font-poppins text-base text-primaryGrayDeep`}>or</Text>
                            <TouchableOpacity
                                onPress={pickVideo}
                                style={tw`font-poppins text-base bg-secondary rounded-md`}>
                                <Text style={tw`text-primary py-2 px-6`}>Browse files</Text>
                            </TouchableOpacity>
                            {videoAsset &&
                                <Text style={tw`py-2 px-6`}>{videoAsset?.fileName}</Text>
                            }
                        </>

                    </TouchableOpacity>

                    {/* State Selection */}
                    <View style={tw`pt-4`}>
                        <TouchableOpacity
                            onPress={() => setStateModalVisible(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full`}
                        >
                            <Text style={tw`font-poppins text-base`}>
                                {formData.state || 'State'}
                            </Text>
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

                    {/* City Selection */}
                    <View style={tw`pt-4`}>
                        <TouchableOpacity
                            onPress={() => setCityModalVisible(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full`}
                        >
                            <Text style={tw`font-poppins text-base`}>
                                {formData.city || 'City'}
                            </Text>
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

                    {/* Category Selection */}
                    <View style={tw`pt-4`}>
                        <TouchableOpacity
                            onPress={() => setCategoryModalVisible(true)}
                            style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full`}
                        >
                            <Text style={tw`font-poppins text-base`}>
                                {formData.category || 'Category'}
                            </Text>
                            <SvgXml xml={IconErowBack} />
                        </TouchableOpacity>
                    </View>

                    <View style={tw`py-5 `} >
                        <View
                            style={tw`border border-gray-300 flex-col justify-center pl-7 relative rounded-3xl p-4`}
                        >
                            <Text style={tw`bg-primary w-14 font-poppins text-base absolute -top-2 left-7`}>Tags</Text>

                            <View style={tw`flex-row gap-3 flex-wrap`}>
                                {tags.map((service, index) => (
                                    <View
                                        key={index}
                                        style={tw`gap-3 py-2 px-4 border flex-row justify-center items-center border-gray-300 rounded-full`}
                                    >
                                        <Text>{service}</Text>
                                        <TouchableOpacity onPress={() => handleRemoveService(index)}>
                                            <SvgXml xml={IconCloseBlack} width={16} height={16} />
                                        </TouchableOpacity>
                                    </View>
                                ))}

                                {/* Input Box */}
                                <TextInput
                                    style={tw`flex-1 min-w-[150px]`}
                                    placeholder="Type & hit enter"
                                    placeholderTextColor="black"
                                    value={inputValue}
                                    onChangeText={setInputValue}
                                    onSubmitEditing={handleAddService}
                                    blurOnSubmit={false}
                                    returnKeyType="done"
                                />
                            </View>
                        </View>

                    </View>

                    {/* Title & Description */}
                    <View style={tw``}>
                        <TextInput
                            placeholder='Video title goes here'
                            placeholderTextColor="black"
                            value={formData.title}
                            onChangeText={(text) => updateFormData('title', text)}
                            style={tw`border border-gray-300 font-poppins text-base rounded-full px-4 py-3 mb-4`}
                        />
                        <TextInput
                            placeholder='Description'
                            placeholderTextColor="black"
                            value={formData.description}
                            onChangeText={(text) => updateFormData('description', text)}
                            multiline
                            textAlignVertical="top"
                            style={tw`border border-gray-300 font-poppins text-base rounded-2xl px-4 py-3 h-52`}
                        />
                    </View>

                    {/* Thumbnail Upload */}

                    {/* Thumbnail */}
                    <View style={tw`flex-row items-center border border-primaryGray rounded-2xl mt-5 justify-between  px-6 py-3  `}>
                        <Text style={tw`font-poppins text-base`}>Thumbnail</Text>
                        {!imageAsset?.uri && (
                            <TouchableOpacity onPress={pickImage} style={tw`flex-row items-center gap-3 border border-[#3B97D3] py-2 px-5 rounded-full`}>
                                <SvgXml xml={IconUploadBlue} />
                                <Text style={tw`font-poppins text-base text-[#3B97D3]`}>Upload an image</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={tw`p-3 w-full`}>
                        {imageAsset?.uri && (
                            <View style={tw`relative`}>
                                <TouchableOpacity>
                                    <Image style={tw`w-full aspect-video rounded-lg`} source={{ uri: imageAsset.uri }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setImageAsset(null)} style={tw`bg-primary h-8 w-8 rounded-full flex-row items-center justify-center absolute top-3 right-3`}>
                                    <SvgXml xml={IconCloseBlack} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Visibility */}
                    <TouchableOpacity
                        onPress={() => setVisibilityModalVisible(true)}
                        style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}
                    >
                        <Text style={tw`font-poppins text-base`}>
                            {formData.visibility || 'Visibility'}
                        </Text>
                        <SvgXml xml={IconErowBack} />
                    </TouchableOpacity>

                    {/* Footer */}
                    <View style={tw`flex-row justify-end gap-3 px-6 py-4`}>
                        <TouchableOpacity style={tw`border flex-row items-center border-primaryGray rounded-md`}>
                            <Text style={tw`text-2xl font-poppinsMedium py-2 px-7`}>${priceUploadVideo?.data?.uploading_video}</Text>
                        </TouchableOpacity>
                        <Button
                            onPress={handleUploadVideo}
                            title="Checkout"
                        />
                    </View>
                    {/* Payment Modal */}
                    <Modal
                        visible={paymentVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setPaymentVisible(false)}
                    >
                        <View style={tw`flex-1 justify-end bg-black/50`}>
                            <View style={tw`bg-primary rounded-t-3xl w-full `}>
                                <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                    <View></View>
                                    <Text style={tw`text-primary text-xl font-poppins`}>Pay to MyTSV</Text>
                                    <TouchableOpacity onPress={() => setPaymentVisible(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>
                                <View style={tw`p-5`}>
                                    <View style={tw`items-center mb-5`}>
                                        <Text style={tw`text-gray-500 font-poppins`}>Required amount</Text>
                                        <Text style={tw`text-3xl font-poppinsBold text-black`}>${priceUploadVideo?.data?.uploading_video}</Text>
                                    </View>

                                    <View style={tw`flex-row justify-between`}>
                                        <TouchableOpacity
                                            onPress={() => setPaymentVisible(false)}
                                            style={tw`bg-white border border-gray-300 rounded-full py-3 px-6 w-[48%]`}
                                        >
                                            <Text style={tw`text-center font-poppins text-base text-black`}>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={tw`bg-[#FF5A5F] rounded-full py-3 px-6 w-[48%]`}
                                        >
                                            <Text style={tw`text-center font-poppinsBold text-base text-white`}>
                                                Pay now
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* State Selection Modal */}
                    <Modal
                        visible={stateModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setStateModalVisible(false)}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={tw`flex-1 justify-end bg-black/50`}>
                                <View style={tw`bg-primary rounded-t-3xl w-full`}>
                                    <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                        <View></View>
                                        < Text style={tw`text-primary text-xl font-poppins`}> Select State </Text>
                                        < TouchableOpacity onPress={() => setStateModalVisible(false)}>
                                            <SvgXml xml={IconClose} />
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        stateData?.data?.map((state: any) => (
                                            <TouchableOpacity
                                                key={state.id}
                                                onPress={() => {
                                                    updateFormData('state', state.name);
                                                    setStateModalVisible(false);
                                                    setStateID(state.id);
                                                }}

                                                style={tw`py-4 border-b border-primaryGray`}
                                            >
                                                <Text style={tw`text-center font-poppins text-base`}> {state.name} </Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>

                    {/* State Selection Modal */}
                    <Modal
                        visible={cityModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setCityModalVisible(false)}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={tw`flex-1 justify-end bg-black/50`}>
                                <View style={tw`bg-primary rounded-t-3xl w-full`}>
                                    <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                        <View></View>
                                        < Text style={tw`text-primary text-xl font-poppins`}> Select City</Text>
                                        < TouchableOpacity onPress={() => setCityModalVisible(false)}>
                                            <SvgXml xml={IconClose} />
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        cityData?.data?.map((city: any) => (
                                            <TouchableOpacity
                                                key={city.id}
                                                onPress={() => {
                                                    updateFormData('city', city.name);
                                                    setCityModalVisible(false);
                                                }}

                                                style={tw`py-4 border-b border-primaryGray`}
                                            >
                                                <Text style={tw`text-center font-poppins text-base`}> {city.name} </Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                    {/* Category Selection Modal */}
                    <Modal
                        visible={categoryModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setCategoryModalVisible(false)}
                    >
                        <View style={tw`flex-1 justify-end bg-black/50`}>
                            <View style={tw`bg-primary rounded-t-3xl w-full`}>
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
                                                updateFormData('category', item?.name);
                                                updateFormData('category_id', item?.id);
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

                    {/* Visibility Selection Modal */}
                    <Modal
                        visible={visibilityModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setVisibilityModalVisible(false)}
                    >
                        <View style={tw`flex-1 justify-end bg-black/50`}>
                            <View style={tw`bg-primary rounded-t-3xl w-full`}>
                                <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                    <View></View>
                                    <Text style={tw`text-primary text-xl font-poppins`}>Visibility</Text>
                                    <TouchableOpacity onPress={() => setVisibilityModalVisible(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        updateFormData('visibility', 'Everyone');
                                        setVisibilityModalVisible(false);
                                    }}
                                    style={tw`py-4 border-b border-primaryGray`}
                                >
                                    <View style={tw`flex-row items-center justify-center gap-3`}>
                                        <SvgXml xml={IconWorld} />
                                        <Text style={tw`font-poppins text-base`}>Everyone</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        updateFormData('visibility', 'Only me');
                                        setVisibilityModalVisible(false);
                                    }}
                                    style={tw`py-4`}
                                >
                                    <View style={tw`flex-row items-center justify-center gap-3`}>
                                        <SvgXml xml={IconLock} />
                                        <Text style={tw`font-poppins text-base`}>Only me</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </AlertNotificationRoot>
        </KeyboardAvoidingView>
    )
}

export default UploadVideo

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