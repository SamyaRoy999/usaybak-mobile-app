import {
    IconBackLeft,
    IconClose,
    IconCloseBlack,
    IconErowBack,
    IconLock,
    IconSucssMsg,
    IconUpload,
    IconUploadBlue,
    IconWorld,
    IconWorningGary
} from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { useCategoriesQuery, useUpload_videoMutation } from '@/redux/apiSlices/UploadVideo/uploadVideoSices'
import { _Width } from '@/utils/utils'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React from 'react'
import {
    ActivityIndicator,
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
        is_promoted: '0', // Added from API requirements
        status: 'active' // Added from API requirements
    });

    // ............... API CALL.................//
    
    const {
        data: categories,
        isLoading,
        refetch
    } = useCategoriesQuery({});
    const categoryData = categories?.data?.data
    const [upload_video] = useUpload_videoMutation()

    // Update form data
    const updateFormData = (field: string, value: string | { name: string }) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePaymentConfirm = async () => {
    setPaymentVisible(false);
    setSucssMassage(true);
    
    try {
        // Create FormData object
        const form = new FormData();

        // Add all required fields
        form.append('category_id', formData.category_id);
        form.append('type', formData.type);
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('visibility', formData.visibility);
        // form.append('status', 'active');
        form.append('is_promoted', '0');
        
        // Add tags as JSON string
        if (tags.length > 0) {
            form.append('tags', JSON.stringify(tags));
        }
        
        // Add optional fields if they exist
        if (formData.state) form.append('state', formData.state);
        if (formData.city) form.append('city', formData.city);
       
        // Add thumbnail file if exists
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

        // Add video file if exists
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

        // Make API call
        const res = await upload_video(form).unwrap();
        
        if (res.status) {
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: res?.message,
                autoClose: 2000,
            });
            setTimeout(() => {
                router?.push(`/home/(tabs)/landingPage`);
            }, 1000);
        } else {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: res?.message || "Upload failed",
                autoClose: 2000,
            });
        }
    } catch (error: any) {
        console.error('Upload error:', error);
        
        let errorMessage = "Upload failed. Please try again.";
        
        if (error?.data) {
            errorMessage = typeof error.data === 'object' 
                ? JSON.stringify(error.data) 
                : error.data;
        } else if (error?.error) {
            errorMessage = error.error;
        } else if (error?.message) {
            errorMessage = error.message;
        }

        Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Upload Error',
            textBody: errorMessage,
            autoClose: 3000,
        });
    }
};
    // ........... Close success message after 3 seconds ............//

    React.useEffect(() => {
        if (sucssMassage) {
            const timer = setTimeout(() => {
                setSucssMassage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [sucssMassage]);

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
            setFormData((prev:any) => ({ ...prev, tags: newTags }));
            setInputValue("");
        }
    };

    const handleRemoveService = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        setFormData((prev : any)=> ({ ...prev, tags: newTags }));
    };

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={"padding"}
            style={tw`bg-primary flex-1 p-4`}
        >
            <AlertNotificationRoot>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={tw`relative`}>
                        <View style={tw`flex-row justify-between items-center gap-5  mb-8`}>
                            <View style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <SvgXml xml={IconBackLeft} />
                                </TouchableOpacity>
                            </View>
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
                                // disabled={isUploading}
                                style={tw`font-poppins text-base bg-secondary rounded-md`}>
                                <Text style={tw`text-primary py-2 px-6`}>Browse files</Text>
                            </TouchableOpacity>
                            {/* {video &&
                                <Text style={tw` py-2 px-6`}>{video}</Text>
                            } */}
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

                    <View style={tw`py-5 `}>
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
                            value={formData.title}
                            onChangeText={(text) => updateFormData('title', text)}
                            style={tw`border border-gray-300 font-poppins text-base rounded-full px-4 py-3 mb-4`}
                        />
                        <TextInput
                            placeholder='Description'
                            value={formData.description}
                            onChangeText={(text) => updateFormData('description', text)}
                            multiline
                            textAlignVertical="top"
                            style={tw`border border-gray-300 font-poppins text-base rounded-2xl px-4 py-3 h-52`}
                        />
                    </View>

                    {/* Thumbnail Upload */}
                    <TouchableOpacity
                        style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}
                        onPress={pickImage}
                    >
                        <Text style={tw`font-poppins text-base`}>Thumbnail</Text>
                        <View style={tw`flex-row items-center gap-3 border border-[#3B97D3] py-2 px-5 rounded-full`}>
                            <SvgXml xml={IconUploadBlue} />
                            <Text style={tw`font-poppins text-base text-[#3B97D3]`}>
                                Upload an image
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* {image &&
                        <Text style={tw` py-2 px-6`}>{image}</Text>
                    } */}
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
                            <Text style={tw`text-2xl font-poppinsMedium py-2 px-7`}>$99.00</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setPaymentVisible(true)}
                            style={tw`border flex-row items-center bg-secondary border-primaryGray rounded-md`}
                        >
                            <Text style={tw`text-base font-poppinsMedium py-2 px-7 text-primary`}>Pay now</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex-row gap-2 py-7`}>
                        <SvgXml xml={IconWorningGary} />
                        <Text style={tw`text-base font-poppins`}>After payment you will be returned here immediately.</Text>
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
                                        <Text style={tw`text-3xl font-poppinsBold text-black`}>$99.99</Text>
                                    </View>

                                    <Text style={tw`text-base font-poppinsMedium mb-2`}>Card information</Text>
                                    <View style={tw`border border-gray-300 rounded-lg p-3 mb-3`}>
                                        <TextInput
                                            placeholder="Card number"
                                            keyboardType="number-pad"
                                            style={tw`font-poppins text-base mb-2`}
                                        />
                                        <View style={tw`flex-row justify-between`}>
                                            <TextInput
                                                placeholder="MM/YY"
                                                keyboardType="number-pad"
                                                style={tw`w-[48%] font-poppins text-base`}
                                            />
                                            <TextInput
                                                placeholder="CVC"
                                                keyboardType="number-pad"
                                                style={tw`w-[48%] font-poppins text-base`}
                                            />
                                        </View>
                                    </View>

                                    <Text style={tw`text-base font-poppinsMedium mb-2`}>Billing address</Text>
                                    <View style={tw`border border-gray-300 rounded-lg mb-3`}>
                                        <TouchableOpacity style={tw`p-3`}>
                                            <Text style={tw`font-poppins text-base text-gray-600`}>United States</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        placeholder="ZIP"
                                        keyboardType="number-pad"
                                        style={tw`border border-gray-300 rounded-lg p-3 font-poppins text-base mb-5`}
                                    />

                                    <View style={tw`flex-row justify-between`}>
                                        <TouchableOpacity
                                            onPress={() => setPaymentVisible(false)}
                                            style={tw`bg-white border border-gray-300 rounded-full py-3 px-6 w-[48%]`}
                                        >
                                            <Text style={tw`text-center font-poppins text-base text-black`}>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={tw`bg-[#FF5A5F] rounded-full py-3 px-6 w-[48%]`}
                                            onPress={handlePaymentConfirm}
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

                    {/* Success Message Modal */}
                    <Modal
                        visible={sucssMassage}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setSucssMassage(false)}
                    >
                        <View style={tw`flex-1 h-4/6 bg-black/50 justify-center`}>
                            <View style={tw`bg-primary flex-col justify-center items-center mx-8 py-14 rounded-`}>
                                <SvgXml xml={IconSucssMsg} />
                                <Text style={tw`font-poppinsSemiBold text-xl text-[#008716] p-5`}>Payment successful</Text>
                                <View style={tw`flex-row gap-1`}>
                                    <ActivityIndicator color={"gray"} size={"small"} />
                                    <Text style={tw`font-poppins text-sm text-secondarygray`}>Redirecting to publishing page</Text>
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
                        <View style={tw`flex-1 justify-end bg-black/50`}>
                            <View style={tw`bg-primary rounded-t-3xl w-full`}>
                                <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                    <View></View>
                                    <Text style={tw`text-primary text-xl font-poppins`}>Select State</Text>
                                    <TouchableOpacity onPress={() => setStateModalVisible(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>

                                {['California', 'New York', 'Texas', 'Florida', 'Washington', 'Illinois'].map((state) => (
                                    <TouchableOpacity
                                        key={state}
                                        onPress={() => {
                                            updateFormData('state', state);
                                            setStateModalVisible(false);
                                        }}
                                        style={tw`py-4 border-b border-primaryGray`}
                                    >
                                        <Text style={tw`text-center font-poppins text-base`}>{state}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </Modal>

                    {/* City Selection Modal */}
                    <Modal
                        visible={cityModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setCityModalVisible(false)}
                    >
                        <View style={tw`flex-1 justify-end bg-black/50`}>
                            <View style={tw`bg-primary rounded-t-3xl w-full`}>
                                <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between px-4`}>
                                    <View></View>
                                    <Text style={tw`text-primary text-xl font-poppins`}>Select City</Text>
                                    <TouchableOpacity onPress={() => setCityModalVisible(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>

                                {['Los Angeles', 'New York', 'Chicago', 'Miami', 'Seattle', 'Houston'].map((city) => (
                                    <TouchableOpacity
                                        key={city}
                                        onPress={() => {
                                            updateFormData('city', city);
                                            setCityModalVisible(false);
                                        }}
                                        style={tw`py-4 border-b border-primaryGray`}
                                    >
                                        <Text style={tw`text-center font-poppins text-base`}>{city}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
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