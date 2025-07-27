import { profileBanner, profleImg } from '@/assets/images/images'
import HeaderBar from '@/components/shear/HeaderBar'
import { IconAddsm, IconBackLeft, IconButtonBack, IconClose, IconCloseBlack, IconDeleteRed, IconErowBackRight, IconSavechanges, IconUpload, profileChang } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { _HIGHT } from '@/utils/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const settings = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [profilePicure, setProfilePicure] = React.useState(false);
    return (
        <KeyboardAvoidingView enabled={true}
            behavior={"padding"} style={tw`flex-1 bg-primary`}>
            <ScrollView contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
                <HeaderBar />
                <View style={tw`flex-row items-center justify-between px-5`}>
                    <View
                        style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                    >
                        <TouchableOpacity onPress={() => router.back()}>
                            <SvgXml xml={IconBackLeft} />
                        </TouchableOpacity>
                    </View>
                    <Text style={tw`font-poppinsMedium text-xl`}>Settings</Text>
                    <View></View>
                </View>
                <View style={tw`px-5 pt-5 `}>
                    {/* Profile banner */}
                    <Image
                        source={profileBanner}
                        style={[
                            tw`w-full rounded-2xl relative`,
                            {
                                height: _HIGHT * 0.19,
                            },
                        ]}
                    />
                    {/* Profile  */}
                    <View
                        style={tw`bg-primary  rounded-full h-28 w-28 flex-row items-center justify-center  right-[45%] -bottom-10 absolute`}
                    >
                        <Image source={profleImg} style={tw`rounded-full h-24 w-24 `} />
                    </View>
                    <TouchableOpacity onPress={() => setProfilePicure(true)} style={tw`absolute -bottom-10 left-[55%]`}>
                        <SvgXml xml={profileChang} />
                    </TouchableOpacity>
                </View>
                {/* login from */}
                <View style={tw`mt-9`}>
                    <View style={tw`py-3 px-6`}>
                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full font-poppins text-base px-5 h-14`}>
                            <Text style={tw`bg-primary  w-28 absolute -top-2 left-7`}> Channel name</Text>
                            <TextInput defaultValue="Haircut Pro" style={tw`font-poppins  text-base`} />
                        </View>
                    </View>
                    <View style={tw`py-3 px-6`}>
                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full font-poppins text-base px-5 h-14`}>
                            <Text style={tw`bg-primary  w-28 absolute -top-2 left-7`}> Your full name</Text>
                            <TextInput defaultValue="Haircut Pro" style={tw`font-poppins  text-base`} />
                        </View>
                    </View>
                    <View style={tw`py-3 px-6`}>
                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full font-poppins text-base px-5 h-14`}>
                            <Text style={tw`bg-primary  w-28 absolute -top-2 left-7`}> Email</Text>
                            <TextInput defaultValue="example@gmail.com" style={tw`font-poppins  text-base`} />
                        </View>
                    </View>
                    <View style={tw`py-3 px-6`}>
                        <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-full font-poppins text-base px-5 h-14`}>
                            <Text style={tw`bg-primary  w-28 absolute -top-2 left-7`}>Contact</Text>
                            <TextInput defaultValue="+9856425662" style={tw`font-poppins  text-base`} />
                        </View>
                    </View>
                </View>
                <View style={tw`py-3 px-6`}>
                    <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-2xl p-4 font-poppins text-base px-5 `}>
                        <Text style={tw`bg-primary  w-12 absolute -top-2 left-7`}>Bio</Text>
                        <TextInput
                            placeholder='Description'
                            defaultValue='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis atque nesciunt autem eligendi id. Rem, ea esse temporibus facere eligendi iste tempore iure veritatis, earum nisi, optio animi dolores possimus?'
                            multiline
                            textAlignVertical="top"
                            style={tw`font-poppins  text-base`}
                        />
                    </View>
                </View>
                {/* .........services.......... */}
                <View style={tw`py-3 px-6`}>
                    <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-2xl p-4 font-poppins text-base px-5 `}>
                        <Text style={tw`bg-primary  w-28 absolute -top-2 left-7`}>Services</Text>
                        <View style={tw`flex-row gap-3 flex-wrap`}>
                            <View
                                style={tw` gap-3 py-2 px-4 border flex-row justify-center items-center border-primaryGray rounded-full `}
                            >
                                <Text>Hair cutting</Text>
                                <SvgXml xml={IconCloseBlack} />
                            </View>
                            <View
                                style={tw` gap-3 py-2 px-4 border flex-row justify-center items-center border-primaryGray rounded-full `}
                            >
                                <Text>Hair cutting</Text>
                                <SvgXml xml={IconCloseBlack} />
                            </View>
                            <View
                                style={tw` gap-3 py-2 px-4 border flex-row justify-center items-center border-primaryGray rounded-full `}
                            >
                                <Text>Hair cutting</Text>
                                <SvgXml xml={IconCloseBlack} />
                            </View>
                            <View
                                style={tw` gap-3 py-2 px-4 border flex-row justify-center items-center border-primaryGray rounded-full `}
                            >
                                <Text>Hair cutting</Text>
                                <SvgXml xml={IconCloseBlack} />
                            </View>

                            <TouchableOpacity
                                style={tw` gap-3 py-2 px-4 border flex-row justify-center items-center border-primaryGray rounded-full `}
                            >
                                <Text>Type & hit enter</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={tw`py-3 px-6`}>
                    <View style={tw`border border-primaryGray flex-col justify-center pl-7 relative rounded-2xl p-4 font-poppins text-base px-5 `}>
                        <Text style={tw`bg-primary  w-40 absolute -top-2 left-7`}>Business locations</Text>
                        <View style={tw`py-4 relative`}>
                            <TextInput
                                defaultValue='Location 1'
                                style={tw`py-4 px-4 border border-primaryGray rounded-full `}
                            />

                            <View>
                                <TouchableOpacity onPress={() => setIsVisible(true)} style={tw`absolute -top-12 right-2 border border-primaryGray w-2/5 rounded-full p-2 px-3 flex-row items-center gap-3 `}>
                                    <Text style={tw`text-base  border-primaryGray`}>Office type</Text>
                                    <SvgXml xml={IconButtonBack} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={tw`flex-row items-center gap-2 py-3 bg-secondary px-4 w-36 rounded-full`}
                        >
                            <SvgXml xml={IconAddsm} />
                            <Text style={tw`text-primaryText text-base font-poppinsBold`}>
                                Add more
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={tw`flex-row items-center gap-2 py-3 bg-secondary px-4 mx-5 mt-14 rounded-full justify-center`}
                >
                    <SvgXml xml={IconSavechanges} />
                    <Text style={tw`text-primaryText text-base font-poppinsBold`}>
                        Save changes
                    </Text>
                </TouchableOpacity>
                {/* Modal of Office type */}
                <Modal
                    visible={isVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setIsVisible(false)}
                >

                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl  w-full  absolute  bottom-0`}>
                            <View
                                style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}
                            >
                                <View></View>
                                <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                                    Comments
                                </Text>

                                <TouchableOpacity onPress={() => setIsVisible(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            <View style={tw`py-9`}>

                                <TouchableOpacity>
                                    <View style={tw` mx-5 flex-row justify-center mb-4 rounded-lg bg-primaryText`} >
                                        <Text style={tw`py-5 font-poppins text-lg`}>Branch</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <View style={tw` mx-5 flex-row justify-center rounded-lg bg-primaryText`} >
                                        <Text style={tw`py-5 font-poppins text-lg`}>Head office</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Modal of Channel profile picure */}
                <Modal
                    visible={profilePicure}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setProfilePicure(false)}
                >

                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl  w-full  absolute  bottom-0`}>
                            <View
                                style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}
                            >
                                <View></View>
                                <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                                    Comments
                                </Text>

                                <TouchableOpacity onPress={() => setProfilePicure(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            <View style={tw`py-9`}>

                                <TouchableOpacity style={tw`mx-5 mb-4 px-4 rounded-lg bg-primaryText flex-row justify-between items-center`}>
                                    <View style={tw`flex-row   gap-3 items-center  `} >
                                        <SvgXml xml={IconUpload} />
                                        <Text style={tw`py-5 font-poppins text-lg`}>Upload new picture</Text>
                                    </View>
                                    <SvgXml xml={IconErowBackRight} />
                                </TouchableOpacity>

                                <TouchableOpacity style={tw`mx-5 mb-4 px-4 rounded-lg bg-primaryText flex-row justify-between items-center`}>
                                    <View style={tw`flex-row   gap-3 items-center  `} >
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
        </KeyboardAvoidingView>
    )
}

export default settings

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: 500,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});
