import Card from '@/components/landing_page/Card'
import { CarouselCard } from '@/components/landing_page/CarouselCard'
import HeaderBar from '@/components/shear/HeaderBar'
import { IconBackLeft } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { useCatagoryDetailsQuery } from '@/redux/apiSlices/catagoryDataSlices/catagoryDataSlices'
import { usePromotedVideoQuery } from '@/redux/apiSlices/Home/homeApiSlices'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const catagoryVideoDetails = () => {
    const { id } = useLocalSearchParams()

    // promosonal video api 
    const { data: promoted } = usePromotedVideoQuery({
        category_id: id,
    });

    const promotedVideo = promoted?.data?.data;

    // spasific caragory api
    const { data, isLoading, error } = useCatagoryDetailsQuery({ id });
    const apiResponse = data?.data;
    const videos = apiResponse?.data || [];
    const firstVideo = videos[0];
    const categoryName = firstVideo?.category?.name;


    if (isLoading) {
        return (
            <View style={tw`p-4`}>
                <Text>Loading...</Text>
            </View>
        )
    }
    if (error) {
        return (
            <View style={tw`p-4`}>
                <Text>Error loading data</Text>
            </View>
        )
    }

    return (
        <View style={tw`flex-1`}>
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
                        {categoryName}
                    </Text>
                    <View></View>
                </View>

                <CarouselCard promotedVideo={promotedVideo}/>

                {videos.length > 0 ? (
                    <FlatList
                        data={videos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Card data={item} />}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                ) : (
                    <View style={tw`p-4`}>
                        <Text style={tw`text-center`}>No videos found in this category</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default catagoryVideoDetails