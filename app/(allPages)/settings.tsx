import HeaderBar from '@/components/shear/HeaderBar'
import { IconAddsm, IconBackLeft, IconButtonBack, IconClose, IconCloseBlack, IconDeleteRed, IconErowBackRight, IconSavechanges, IconUpload, IconUploadCover, profileChang } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { useEditProfileMutation, useProfileQuery } from '@/redux/apiSlices/Account/accountSlice'
import { _HIGHT } from '@/utils/utils'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
import { SvgXml } from 'react-native-svg'
import * as Yup from "yup"

// Define types
interface BusinessLocation {
    address: string;
    officeType: string;
    showOfficeType: boolean;
}

interface FormValues {
    channel_name: string;
    name: string;
    email: string;
    contact: string;
    bio: string;
    services: string[];
    locations: BusinessLocation[];
}

const Settings = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [profilePicure, setProfilePicure] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState<string | null>(null);
    const [coverImage, setCoverImage] = React.useState<string | null>(null);

    // ............. post api ............//
    const [editProfile] = useEditProfileMutation()


    // .............Fetch profile data...............//
    const { data: defouldData, isLoading } = useProfileQuery({})

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const { bio, contact, email, channel_name, name, cover_image, avatar, services } = defouldData?.data || {};

    const initialValues: FormValues = {
        channel_name: channel_name || "",
        name: name || "",
        email: email || "",
        contact: contact || "",
        bio: bio || "",
        services: services || ["Hair cutting", "Hair cutting", "Hair cutting", "Hair cutting"],
        locations: [
            {
                address: "Location 1",
                officeType: "",
                showOfficeType: false
            }
        ]
    };

    const validationSchema = Yup.object().shape({
        channel_name: Yup.string().required("Channel name is required"),
        name: Yup.string().required("Full name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        contact: Yup.string().required("Contact is required"),
        bio: Yup.string(),
        services: Yup.array().of(Yup.string()),
        locations: Yup.array().of(
            Yup.object().shape({
                address: Yup.string().required("Address is required"),
                officeType: Yup.string()
            })
        )
    });

    const pickCoverImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setCoverImage(result.assets[0].uri);
        }
    };

    const pickProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
        setProfilePicure(false);
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            console.log('Submitting:', values);

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'Settings saved successfully!',
                autoClose: 2000,
            });
        } catch (error: any) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: error?.message || 'Failed to save settings',
            });
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView enabled={true} behavior={"padding"} style={tw`flex-1 bg-primary`}>
            <AlertNotificationRoot>
                <ScrollView contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
                    <HeaderBar />
                    <View style={tw`flex-row items-center justify-between px-5`}>
                        <View style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}>
                            <TouchableOpacity onPress={() => router.back()}>
                                <SvgXml xml={IconBackLeft} />
                            </TouchableOpacity>
                        </View>
                        <Text style={tw`font-poppinsMedium text-xl`}>Settings</Text>
                        <View></View>
                    </View>

                    <Formik<FormValues>
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, handleSubmit, errors, touched }) => (
                            <View>
                                {/* Cover Image Section */}
                                <View style={tw`px-5 pt-5`}>
                                    <View style={[tw`relative`, { height: _HIGHT * 0.19 }]}>
                                        <TouchableOpacity onPress={pickCoverImage} style={tw`absolute z-20 top-3 right-3`}>
                                            <SvgXml xml={IconUploadCover} />
                                        </TouchableOpacity>
                                        {coverImage || cover_image ? (
                                            <Image
                                                source={{ uri: coverImage || cover_image }}
                                                style={[tw`w-full rounded-2xl`, { height: _HIGHT * 0.19 }]}
                                                contentFit="cover"
                                            />
                                        ) : (
                                            <View style={[tw`w-full rounded-2xl bg-gray-200`, { height: _HIGHT * 0.19 }]} />
                                        )}
                                    </View>

                                    {/* Profile Image Section */}
                                    <View style={tw`bg-primary rounded-full h-28 w-28 flex-row items-center justify-center right-[45%] -bottom-10 absolute`}>
                                        {profileImage || avatar ? (
                                            <Image
                                                source={{ uri: profileImage || avatar }}
                                                style={tw`rounded-full h-24 w-24`}
                                                contentFit="cover"
                                            />
                                        ) : (
                                            <View style={tw`rounded-full h-24 w-24 bg-gray-300`} />
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={() => setProfilePicure(true)} style={tw`absolute -bottom-10 left-[55%]`}>
                                        <SvgXml xml={profileChang} />
                                    </TouchableOpacity>
                                </View>

                                {/* Form Fields */}
                                <View style={tw`mt-9`}>
                                    {/* Channel Name */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full h-14`}>
                                            <Text style={tw`bg-primary w-28 absolute -top-2 left-7`}>Channel name</Text>
                                            <TextInput
                                                value={values.channel_name}
                                                onChangeText={(txt) => setFieldValue("channel_name", txt)}
                                                style={tw`font-poppins text-base px-5`}
                                            />
                                        </View>
                                        {errors.channel_name && touched.channel_name && (
                                            <Text style={tw`text-red-700 font-poppins text-sm pl-6`}>{errors.channel_name}</Text>
                                        )}
                                    </View>

                                    {/* Full Name */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full h-14`}>
                                            <Text style={tw`bg-primary w-28 absolute -top-2 left-7`}>Your full name</Text>
                                            <TextInput
                                                value={values.name}
                                                onChangeText={(txt) => setFieldValue("name", txt)}
                                                style={tw`font-poppins text-base px-5`}
                                            />
                                        </View>
                                        {errors.name && touched.name && (
                                            <Text style={tw`text-red-700 font-poppins text-sm pl-6`}>{errors.name}</Text>
                                        )}
                                    </View>

                                    {/* Email */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full h-14`}>
                                            <Text style={tw`bg-primary w-28 absolute -top-2 left-7`}>Email</Text>
                                            <TextInput
                                                value={values.email}
                                                onChangeText={(txt) => setFieldValue("email", txt)}
                                                style={tw`font-poppins text-base px-5`}
                                            />
                                        </View>
                                        {errors.email && touched.email && (
                                            <Text style={tw`text-red-700 font-poppins text-sm pl-6`}>{errors.email}</Text>
                                        )}
                                    </View>

                                    {/* Contact */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full h-14`}>
                                            <Text style={tw`bg-primary w-28 absolute -top-2 left-7`}>Contact</Text>
                                            <TextInput
                                                value={values.contact}
                                                onChangeText={(txt) => setFieldValue("contact", txt)}
                                                style={tw`font-poppins text-base px-5`}
                                            />
                                        </View>
                                        {errors.contact && touched.contact && (
                                            <Text style={tw`text-red-700 font-poppins text-sm pl-6`}>{errors.contact}</Text>
                                        )}
                                    </View>

                                    {/* Bio */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-2xl p-4`}>
                                            <Text style={tw`bg-primary w-12 absolute -top-2 left-7`}>Bio</Text>
                                            <TextInput
                                                placeholder='Description'
                                                value={values.bio}
                                                onChangeText={(txt) => setFieldValue("bio", txt)}
                                                multiline
                                                textAlignVertical="top"
                                                style={tw`font-poppins text-base`}
                                            />
                                        </View>
                                    </View>

                                    {/* Services */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-2xl p-4`}>
                                            <Text style={tw`bg-primary w-28 absolute -top-2 left-7`}>Services</Text>
                                            <View style={tw`flex-row gap-3 flex-wrap`}>
                                                {values.services.map((service: string, index: number) => (
                                                    <View key={index} style={tw`gap-3 py-2 px-4 border flex-row justify-center items-center border-primaryGray rounded-full`}>
                                                        <Text>{service}</Text>
                                                        <TouchableOpacity onPress={() => {
                                                            const newServices = [...values.services];
                                                            newServices.splice(index, 1);
                                                            setFieldValue("services", newServices);
                                                        }}>
                                                            <SvgXml xml={IconCloseBlack} />
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                                <TextInput
                                                    style={tw`flex-1 min-w-[150px]`}
                                                    placeholder='Type & hit enter'
                                                    onSubmitEditing={(e) => {
                                                        const newService = e.nativeEvent.text.trim();
                                                        if (newService) {
                                                            setFieldValue("services", [...values.services, newService]);
                                                            e.currentTarget.clear();
                                                        }
                                                    }}
                                                    blurOnSubmit={false}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {/* Business locations */}
                                    <View style={tw`py-3 px-6`}>
                                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-2xl p-4`}>
                                            <Text style={tw`bg-primary w-40 absolute -top-2 left-7`}>Business locations</Text>

                                            {values.locations.map((location, index) => (
                                                <View key={index} style={tw`py-4 relative `}>
                                                    <TextInput
                                                        value={location.address}
                                                        onChangeText={(txt) => {
                                                            const newLocations = [...values.locations];
                                                            newLocations[index].address = txt;
                                                            setFieldValue("locations", newLocations);
                                                        }}
                                                        style={tw`py-4 px-4 border border-primaryGray rounded-full`}
                                                        placeholder="Enter location address"
                                                    />
                                                    <View>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                const newLocations = [...values.locations];
                                                                newLocations[index].showOfficeType = true;
                                                                setFieldValue("locations", newLocations);
                                                            }}
                                                            style={tw`absolute -top-12 right-2 border border-primaryGray w-2/5 rounded-full p-2 px-3 flex-row items-center gap-3`}
                                                        >
                                                            <Text style={tw`text-base`}>
                                                                {location.officeType || "Office type"}
                                                            </Text>
                                                            <SvgXml xml={IconButtonBack} />
                                                        </TouchableOpacity>
                                                    </View>

                                                    {/* Office Type Modal for this location */}
                                                    {location.showOfficeType && (
                                                        <Modal
                                                            visible={location.showOfficeType}
                                                            transparent={true}
                                                            animationType="slide"
                                                            onRequestClose={() => {
                                                                const newLocations = [...values.locations];
                                                                newLocations[index].showOfficeType = false;
                                                                setFieldValue("locations", newLocations);
                                                            }}
                                                        >
                                                            <View style={styles.modalContainer}>
                                                                <View style={tw`bg-primary rounded-t-3xl w-full absolute bottom-0`}>
                                                                    <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                                                                        <View></View>
                                                                        <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                                                                            Office Type
                                                                        </Text>
                                                                        <TouchableOpacity onPress={() => {
                                                                            const newLocations = [...values.locations];
                                                                            newLocations[index].showOfficeType = false;
                                                                            setFieldValue("locations", newLocations);
                                                                        }}>
                                                                            <SvgXml xml={IconClose} />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={tw`py-9`}>
                                                                        <TouchableOpacity onPress={() => {
                                                                            const newLocations = [...values.locations];
                                                                            newLocations[index].officeType = "Branch";
                                                                            newLocations[index].showOfficeType = false;
                                                                            setFieldValue("locations", newLocations);
                                                                        }}>
                                                                            <View style={tw`mx-5 flex-row justify-center mb-4 rounded-lg bg-primaryText`}>
                                                                                <Text style={tw`py-5 font-poppins text-lg`}>Branch</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() => {
                                                                            const newLocations = [...values.locations];
                                                                            newLocations[index].officeType = "Head office";
                                                                            newLocations[index].showOfficeType = false;
                                                                            setFieldValue("locations", newLocations);
                                                                        }}>
                                                                            <View style={tw`mx-5 flex-row justify-center rounded-lg bg-primaryText`}>
                                                                                <Text style={tw`py-5 font-poppins text-lg`}>Head office</Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </Modal>
                                                    )}
                                                </View>
                                            ))}

                                            {/* Add more locations button */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setFieldValue("locations", [
                                                        ...values.locations,
                                                        {
                                                            address: "",
                                                            officeType: "",
                                                            showOfficeType: false
                                                        }
                                                    ]);
                                                }}
                                                style={tw`flex-row items-center gap-2 py-3 bg-secondary px-4 w-36 rounded-full`}
                                            >
                                                <SvgXml xml={IconAddsm} />
                                                <Text style={tw`text-primaryText text-base font-poppinsBold`}>
                                                    Add more
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* Save Changes Button */}
                                    <TouchableOpacity
                                        onPress={() => handleSubmit()}
                                        style={tw`flex-row items-center gap-2 py-3 bg-secondary px-4 mx-5 mt-14 rounded-full justify-center`}
                                    >
                                        <SvgXml xml={IconSavechanges} />
                                        <Text style={tw`text-primaryText text-base font-poppinsBold`}>
                                            Save changes
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>

                    {/* Profile Picture Modal */}
                    <Modal
                        visible={profilePicure}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setProfilePicure(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={tw`bg-primary rounded-t-3xl w-full absolute bottom-0`}>
                                <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                                    <View></View>
                                    <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                                        Profile Picture
                                    </Text>
                                    <TouchableOpacity onPress={() => setProfilePicure(false)}>
                                        <SvgXml xml={IconClose} />
                                    </TouchableOpacity>
                                </View>
                                <View style={tw`py-9`}>
                                    <TouchableOpacity
                                        onPress={pickProfileImage}
                                        style={tw`mx-5 mb-4 px-4 rounded-lg bg-primaryText flex-row justify-between items-center`}
                                    >
                                        <View style={tw`flex-row gap-3 items-center`}>
                                            <SvgXml xml={IconUpload} />
                                            <Text style={tw`py-5 font-poppins text-lg`}>Upload new picture</Text>
                                        </View>
                                        <SvgXml xml={IconErowBackRight} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setProfileImage(null);
                                            setProfilePicure(false);
                                        }}
                                        style={tw`mx-5 mb-4 px-4 rounded-lg bg-primaryText flex-row justify-between items-center`}
                                    >
                                        <View style={tw`flex-row gap-3 items-center`}>
                                            <SvgXml xml={IconDeleteRed} />
                                            <Text style={tw`py-5 font-poppins text-lg text-secondary`}>Delete picture</Text>
                                        </View>
                                        <SvgXml xml={IconErowBackRight} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </AlertNotificationRoot>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: 500,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});

export default Settings;