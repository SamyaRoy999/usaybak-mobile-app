import HeaderBar from '@/components/shear/HeaderBar'
import { IconbackRight, IconContactusImg, IconEmail, IconLoction, IconPhone, IconSend } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const contactUs = () => {
    return (
        <View style={tw`bg-primary`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <HeaderBar />
                <TouchableOpacity style={tw``} onPress={() => router.back()}>
                    <SvgXml xml={IconbackRight} />
                </TouchableOpacity>
                {/* Top Logo and Image */}
                <View style={tw`items-center `}>
                    <SvgXml xml={IconContactusImg} />
                </View>
                {/* Title */}
                <Text style={tw`text-lg font-poppinsMedium text-center  mb-8 bg-primaryText py-4 rounded-full`}>Contact us</Text>

                {/* Mission Section */}
                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray`}>
                    <View style={tw`flex-row items-center gap-2 `}>

                        <Text style={tw`text-xl font-poppinsMedium mb-2 `}>Get in touch</Text>
                    </View>
                    <Text style={tw`text-base pt-5  font-poppins `}>
                        We’d love to hear from you! Reach out to us through any of the following methods:
                    </Text>
                    <View style={tw`flex-row items-center gap-3 pt-9`}>
                        <SvgXml xml={IconEmail} />
                        <Text style={tw`text-base font-poppins `}>info@mytsv.com</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-3 pt-9`}>
                        <SvgXml xml={IconPhone} />
                        <Text style={tw`text-base font-poppins `}>+1 630 297 7501</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-3 pt-9`}>
                        <SvgXml xml={IconLoction} />
                        <Text style={tw`text-base font-poppins `}>info@mytsv.com</Text>
                    </View>
                </View>
                <View style={tw`flex-col gap-6 mt-9`}>
                    <View style={tw`relative`}>
                        <View style={tw`bg-primary absolute px-4 flex-row justify-center items-center left-7 font-poppins text-base -top-2 z-10`}>
                            <Text style={tw`font-poppins text-base`}>* Name</Text>
                        </View>
                        <TextInput
                            style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-16`}
                      
                        />
                    </View>
                    <View style={tw`relative`}>
                        <View style={tw`bg-primary absolute px-4 flex-row justify-center items-center left-7 font-poppins text-base -top-2 z-10`}>
                            <Text style={tw`font-poppins text-base`}>* Email</Text>
                        </View>
                        <TextInput
                            style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-16`}
                      
                        />
                    </View>
                    <View style={tw`relative`}>
                        <View style={tw`bg-primary absolute px-4 flex-row justify-center items-center left-7 font-poppins text-base -top-2 z-10`}>
                            <Text style={tw`font-poppins text-base`}>* Subject</Text>
                        </View>
                        <TextInput
                            style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-16`}
                       
                        />
                    </View>
                    <View style={tw`relative`}>
                        <View style={tw`bg-primary absolute px-4 flex-row justify-center items-center left-7 font-poppins text-base -top-2 z-10`}>
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
    )
}

export default contactUs