import { historypage } from '@/assets/images/images';
import HeaderBar from '@/components/shear/HeaderBar';
import { IconBackLeft, IconCansel, IconPlay } from '@/icons/Icon';
import tw from '@/lib/tailwind';
import { useLikeVideosDeleteMutation, useLikeVideosQuery } from '@/redux/apiSlices/Account/accountSlice';
import { _HIGHT, _Width } from '@/utils/utils';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const LikedVideosScreen = () => {
    const [page, setPage] = useState(1);
    const [videos, setVideos] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const { data, isLoading, isFetching, refetch } = useLikeVideosQuery({ page });
    const [likeVideosDelete] = useLikeVideosDeleteMutation();

    // Load initial or paginated data
    useEffect(() => {
        if (data?.status && data?.data?.data) {
            if (page === 1) {
                setVideos(data.data.data);
            } else {
                setVideos((prev) => [...prev, ...data.data.data]);
            }
        }
    }, [data]);

    // Refresh function
    const onRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await refetch();
        setRefreshing(false);
    };

    // Load more on scroll
    const loadMore = () => {
        if (!loadingMore && !isFetching && data?.data?.data?.length >= 5) {
            setPage((prev) => prev + 1);
        }
    };

    // Handle Delete
    const handleDelete = async (videoId: number) => {
        try {
            await likeVideosDelete(videoId).unwrap();
            setVideos((prev) => prev.filter((item) => item.id !== videoId));
        } catch (err) {
            console.error('Delete failed', err);
        }
    };

    if (isLoading && page === 1) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={tw`flex-1`}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <HeaderBar />
                <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View
                            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                        >
                            <SvgXml xml={IconBackLeft} />
                        </View>
                    </TouchableOpacity>
                    <Text style={tw`font-poppinsMedium text-xl `}>Liked videos</Text>
                    <View />
                </View>

                <View style={tw`p-5 relative`}>
                    <LinearGradient
                        style={[
                            tw`rounded-2xl absolute`,
                            {
                                height: _HIGHT * 0.6,
                                width: _Width,
                            },
                        ]}
                        colors={['#753A88', '#EF4444E5', '#eb7a82', 'transparent', 'transparent']}
                    />
                    <Image
                        source={historypage}
                        style={{
                            width: _Width * 0.9,
                            height: _HIGHT * 0.3,
                            borderRadius: 20,
                        }}
                    />
                    <View style={tw`flex-row items-center justify-between pt-5 pb-20`}>
                        <View>
                            <Text style={tw`font-poppinsMedium text-2xl text-primary`}>Liked videos</Text>
                            <Text style={tw`font-poppinsMedium text-base text-primary`}>{videos.length} videos</Text>
                        </View>
                        <TouchableOpacity style={tw`py-3 flex-row gap-4 items-center px-6 rounded-full bg-primary`}>
                            <SvgXml xml={IconPlay} />
                            <Text style={tw`font-poppins text-base text-secondaryBlack`}>Play all</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* FlatList for Infinite Scroll */}
                <FlatList
                    data={videos}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={[tw`flex-row gap-4 px-5 py-3 items-start border-b border-gray-200`]}>
                            <Image
                                style={[tw`rounded-xl`, { width: _Width * 0.3, height: _HIGHT * 0.1 }]}
                                source={{ uri: item?.video?.thumbnail }}
                            />
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-base font-poppinsMedium text-secondaryBlack`}>
                                    {item?.video?.title?.split(' ').slice(0, 5).join(' ')}...
                                </Text>
                                <View style={tw`flex-row justify-between items-center mt-2`}>
                                    <Text style={tw`text-sm text-secondaryBlack`}>
                                        {item?.video?.views_count || 0} views
                                    </Text>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                        <SvgXml xml={IconCansel} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#ED6237']} />
                    }
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loadingMore || isFetching ? <ActivityIndicator /> : null}
                />
            </ScrollView >
        </View>
    );
};

export default LikedVideosScreen;
