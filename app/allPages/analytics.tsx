import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderBar from '@/components/shear/HeaderBar'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import { SvgXml } from 'react-native-svg'
import { IconBackLeft } from '@/icons/Icon'

const analytics = () => {

    return (
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
                    Analytics
                </Text>
                <View></View>
            </View>
            <View style={tw`flex-row w-full justify-center items-center `}>
                <View style={tw`border w-32  h-32 flex-col items-center justify-center`}>
                    <View >
                        <Text style={tw`font-poppins text-sm text-black `}>Views</Text>
                        <Text style={tw`font-poppinsSemiBold text-xl`}>10,256</Text>
                    </View>
                </View>
                <View style={tw`border w-32 h-32 flex-col items-center justify-center`}>
                    <View>

                        <Text style={tw`font-poppins text-sm text-black `}>Likes</Text>
                        <Text style={tw`font-poppinsSemiBold text-xl`}>1,256</Text>
                    </View>
                </View>
                <View style={tw`border w-32 h-32 flex-col items-center justify-center`}>
                    <View>
                        <Text style={tw`font-poppins text-sm text-black `}>Dislikes</Text>
                        <Text style={tw`font-poppinsSemiBold text-xl`}>256</Text>
                    </View>
                </View>
            </View>
            <Text style={tw`text-xl font-poppins `}>Your channel got 10,256 views in this month</Text>
        </View>
    )
}

export default analytics