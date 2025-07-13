import HeaderBar from '@/components/shear/HeaderBar'
import { IconAdd, IconBackLeft, IconWorld } from '@/icons/Icon'
import data from "@/lib/data.json"
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const my_videos = () => {
    const [history, setHistory] = React.useState(false)
    return (
        <View>
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
                            My videos
                        </Text>
                        <TouchableOpacity onPress={() => setHistory(!history)}>
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
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => router.push({
                                pathname: `/details/Videodetails/[id]`,
                                 params: { id: item.id.toString() },
                            })}>

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
                                            {item.title}
                                        </Text>
                                        <Text
                                            style={tw`text-sm  py-1 text-secondaryBlack `}
                                        >
                                            Lorem ipsum dolor sit amet consectetur.
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

            </ScrollView >
        </View >
    )
}
//
export default my_videos

const styles = StyleSheet.create({


});