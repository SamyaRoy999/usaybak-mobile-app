import HeaderBar from '@/components/shear/HeaderBar'
import { IconAnalytics, IconBackLeft, IconDelete, IconEdit, IconSettingDot } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SvgXml } from 'react-native-svg'

const videodetails = () => {
    const [history, setHistory] = React.useState(false)
    return (

        <View style={tw`flex-1 bg-primary`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderBar />
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
                            Video details
                        </Text>
                        <TouchableOpacity onPress={() => setHistory(!history)}>
                            <View
                                style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                            >
                                <SvgXml xml={IconSettingDot} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {history && (

                        <View style={tw`absolute bg-primaryText right-5 w-56 top-14 z-20 b shadow-lg rounded-lg`}>
                            <TouchableOpacity>
                                <View style={tw`flex-row items-start gap-3 px-5 py-4`}>
                                    <SvgXml xml={IconEdit} />
                                    <Text style={tw`font-poppinsMedium text-base `} >Edit video</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={tw`border border-y border-primaryGray`}>
                                <View style={tw`flex-row items-start gap-3 px-5 py-4`}>
                                    <SvgXml xml={IconAnalytics} />
                                    <Text style={tw`font-poppinsMedium text-base `} >Analytics</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style={tw`flex-row items-start gap-3 px-5 py-4`}>
                                    <SvgXml xml={IconDelete} />
                                    <Text style={tw`font-poppinsMedium text-base`} >Delete video</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aut sunt, labore consequuntur ullam animi voluptatibus cum soluta dignissimos aliquid, aliquam cupiditate debitis mollitia velit repellat, explicabo libero atque ducimus!</Text>
            </ScrollView>
        </View>

    )
}

export default videodetails