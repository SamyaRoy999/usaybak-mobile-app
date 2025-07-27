import { historypage } from '@/assets/images/images'
import HeaderBar from '@/components/shear/HeaderBar'
import { IconBackLeft, IconCansel, IconPlay } from '@/icons/Icon'
import data from "@/lib/data.json"
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const likeds = () => {
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <HeaderBar />
                <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View
                            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                        >
                            <SvgXml xml={IconBackLeft} />
                        </View>
                    </TouchableOpacity>
                    <Text style={tw`font-poppinsMedium text-xl `}>
                        Liked videos
                    </Text>
                    <View></View>
                </View>
                <View style={tw`p-5 relative`}>
                    <LinearGradient
                        style={[tw`rounded-2xl absolute `, {
                            height: _HIGHT * 0.6,
                            width: _Width
                        }]}
                        // Background Linear Gradient
                        colors={['#753A88', '#EF4444E5', '#eb7a82', 'transparent', 'transparent',]}

                    />


                    <Image source={historypage} style={{
                        width: _Width * 0.9, height: _HIGHT * 0.3,
                        borderRadius: 20,
                    }} />
                    <View style={tw`flex-row  items-center justify-between pt-5 pb-20`}>
                        <View>
                            <Text style={tw`font-poppinsMedium text-2xl text-primary`}>Liked videos</Text>
                            <Text style={tw`font-poppinsMedium text-base text-primary`}>10 videos</Text>
                        </View>
                        <TouchableOpacity
                            style={tw`py-3 flex-row gap-4 items-center  px-6 rounded-full  bg-primary`}
                        >
                            <SvgXml xml={IconPlay} />
                            <Text style={tw`font-poppins  text-base text-secondaryBlack`}>
                                Play all
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={tw`px-2 mx-5`}>
                    {/* History  */}
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={[tw` mr-4 flex-row gap-6 pb-5`, { width: _Width * 0.4 }]}>
                                <Image
                                    style={[
                                        tw`rounded-xl`,
                                        { width: _Width * 0.4, height: _HIGHT * 0.1 },
                                    ]}
                                    source={{ uri: item?.thumbnail }}
                                />
                                <View style={tw``}>
                                    <Text
                                        style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                                    >
                                        {item.title}
                                    </Text>
                                    <View style={tw`flex-row justify-between w-full items-center`}>
                                        <Text style={tw`text-sm font-poppins  text-secondaryBlack `}>
                                            {item.views} views
                                        </Text>
                                        <TouchableOpacity>
                                            <SvgXml xml={IconCansel} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default likeds

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
    },

});