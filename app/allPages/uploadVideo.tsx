import { IconBackLeft, IconErowBack, IconUpload, IconUploadBlue, IconWorningGary } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'

const uploadVideo = () => {
    return (
        <KeyboardAvoidingView
            enabled={true}
            behavior={"padding"} style={tw`bg-primary flex-1 p-4`}>
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
                            Upload Video
                        </Text>
                        <View></View>
                    </View>
                </View>
                <View style={tw`border border-dashed rounded-lg justify-center items-center flex-col py-10`}>
                    <SvgXml xml={IconUpload} />
                    <Text style={tw`font-poppinsMedium text-xl`}>Upload your video</Text>
                    <Text style={tw`font-poppins text-base text-primaryGrayDeep`}>Drag & drop your file in this area</Text>
                    <Text style={tw`font-poppins text-base text-primaryGrayDeep`}>or</Text>
                    <TouchableOpacity style={tw`font-poppins text-base bg-secondary rounded-md`}><Text style={tw`text-primary py-2 px-6 `}>Browse files</Text></TouchableOpacity>
                </View>
                {/* <View style={tw`flex-row gap-2 py-7`}>
                    <SvgXml xml={IconWorning} />
                    <Text style={tw`text-base font-poppins`}>You have to pay $9.99 per video for publishing it. It will be a promoted video and it will go on the op of searches. On the other hand YouTube videos link sharing is free.</Text>
                </View> */}
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
                        placeholder='Video title goes here'
                        style={tw`border border-gray-300 font-poppins text-base rounded-full px-4 py-3 mb-4`}
                    />
                    <TextInput
                        placeholder='Description'
                        multiline
                        textAlignVertical="top"
                        style={tw`border border-gray-300 font-poppins text-base rounded-2xl px-4 py-3 h-52`}
                    />
                </View>
                {/* <View style={tw`flex-row gap-2 py-7`}>
                    <SvgXml xml={IconWorning} />
                    <Text style={tw`text-base font-poppins`}>You have to pay $9.99 per video for publishing it. It will be a promoted video and it will go on the op of searches. On the other hand YouTube videos link sharing is free.</Text>
                </View> */}
                <View

                    style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}
                >
                    <Text style={tw`font-poppins text-base`}>Thumbnail</Text>
                    <TouchableOpacity style={tw`flex-row items-center gap-3 border border-[#3B97D3] py-2 px-5 rounded-full`}>
                        <SvgXml xml={IconUploadBlue} />
                        <Text style={tw`font-poppins text-base text-[#3B97D3]`}>Upload an image</Text>
                    </TouchableOpacity>
                </View>
                {/* Visibility */}
                <TouchableOpacity style={tw`flex-row items-center justify-between border border-primaryGray px-6 py-3 rounded-full mt-4`}>
                    <Text style={tw`font-poppins text-base`}>Visibility</Text>
                    <SvgXml xml={IconErowBack} />
                </TouchableOpacity>
                {/* Footer */}
                <View style={tw`flex-row justify-end gap-3 px-6 py-4  `}>
                    <TouchableOpacity style={tw`border flex-row items-center border-primaryGray rounded-md`}>
                        <Text style={tw`text-2xl font-poppinsMedium py-2 px-7`}>$99.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`border flex-row items-center bg-secondary border-primaryGray rounded-md`}>
                        <Text style={tw`text-base font-poppinsMedium py-2 px-7 text-primary`}>Pay now</Text>
                    </TouchableOpacity>
                </View>
                 <View style={tw`flex-row gap-2 py-7`}>
                    <SvgXml xml={IconWorningGary} />
                    <Text style={tw`text-base font-poppins`}>After payment you will be returned here immediately.</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default uploadVideo