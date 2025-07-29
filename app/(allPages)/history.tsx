import HeaderBar from '@/components/shear/HeaderBar'
import { IconBackLeft, IconCansel, IconDelete, IconPouse, IconSearchBlack, IconSettingDot } from '@/icons/Icon'
import data from "@/lib/data2.json"
import tw from '@/lib/tailwind'
import { useHistoryVideoQuery } from '@/redux/apiSlices/Account/accountSlice'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const history = () => {

    const [history, setHistory] = React.useState(false)

    //............... API CALL ...................//
    const {
        data: historyVideo,
        isLoading,
        refetch
    } = useHistoryVideoQuery({
        params: {
            per_page: 500,
        },
    });

    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Loading...</Text>
            </View>
        );
    }
  

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
                            History
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

                        <View style={tw`absolute bg-primaryText p-6 right-5 w-72 top-14 z-20 b shadow-lg rounded-lg`}>
                            <TouchableOpacity>
                                <View style={tw`flex-row items-start gap-3 pb-3`}>
                                    <SvgXml xml={IconDelete} />
                                    <Text style={tw`font-poppinsMedium text-base`} >Clear all history</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={tw`flex-row items-start gap-3 pt-3`}>
                                    <SvgXml xml={IconPouse} />
                                    <Text style={tw`font-poppinsMedium text-base`} >Pause watch history</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={tw`px-6 border border-primaryGray flex-row items-center  bg-primaryText mx-6 rounded-full`}>
                    <SvgXml xml={IconSearchBlack} />
                    <TextInput
                        style={tw`  rounded-full font-poppins text-base px-5 h-14`}
                        placeholder="Search watch history "
                    />
                </View>
                {/* Today */}
                <Text style={tw`font-poppinsMedium text-xl px-6 pt-9 pb-5`}>Today</Text>
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
                {/* Yesterday */}
                <Text style={tw`font-poppinsMedium text-xl px-6  py-5`}>Yesterday</Text>
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
                {/* Wednesday */}
                <Text style={tw`font-poppinsMedium text-xl px-6  py-5`}>Wednesday</Text>
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
                {/* April 02, 2025 */}
                <Text style={tw`font-poppinsMedium text-xl px-6 py-5`}>April 02, 2025</Text>
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
//
export default history

const styles = StyleSheet.create({


});