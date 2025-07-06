import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import HeaderBar from '@/components/shear/HeaderBar'
import tw from '@/lib/tailwind'
import { SvgXml } from 'react-native-svg'
import { IconBackLeft, IconCansel, IconWornoing } from '@/icons/Icon'
import { router } from 'expo-router'
import { _HIGHT, _Width } from '@/utils/utils'
import data from "@/lib/data2.json";

const report = () => {
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
                            Reports
                        </Text>

                        <View></View>
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
                                    <View style={tw`flex-row items-center gap-2`}>
                                        <SvgXml xml={IconWornoing} />
                                        <Text
                                            style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                                        >
                                            Video title goes here
                                        </Text>
                                    </View>
                                    <Text
                                        style={tw`text-base font-poppinsMedium py-1 text-secondary `}
                                    >
                                        MyTSV deleted your video.
                                    </Text>

                                    <Text style={tw`text-sm font-poppins  text-secondaryBlack `}>
                                        Tap to see details
                                    </Text>



                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default report