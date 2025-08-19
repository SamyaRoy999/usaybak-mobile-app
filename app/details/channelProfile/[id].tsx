import Card from "@/components/landing_page/Card";
import HeaderBar from "@/components/shear/HeaderBar";
import SimpleMapView from "@/components/shear/SimpleMapView";
import { IconBackLeft, IconGmail, IconLikes, IconLoction, IconPhone, IconPhoto, IconVideo } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useChannelProfileQuery } from "@/redux/apiSlices/Home/homeApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const channelProfile = () => {

    const { id } = useLocalSearchParams();

    //...................... API CALL........................//

    const { data: profileData, isLoading } = useChannelProfileQuery(Number(id));
    if (isLoading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text>Loading...</Text>
            </View>
        );
    }
    const {
        total_likes,
        total_videos,
        total_views,
        videos,
    } = profileData?.data || {};

    const {
        services,
        locations,
        contact,
        bio,
        avatar,
        cover_image,
        email,
        channel_name
    } = profileData?.data?.channel || {};

    // .................. Find head office location.................//

    const headOffice = locations?.find((item: any) => item.type === "head-office");
    const LoctionShow = locations?.map((item: any) => item);

    const latGet = LoctionShow?.lat;
    const longGet = LoctionShow?.long;


    return (
        <View style={tw`flex-1 bg-primary`}>
            <ScrollView contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
                <HeaderBar />
                <View style={tw`flex-row items-center justify-between px-5`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View
                            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                        >
                            <SvgXml xml={IconBackLeft} />
                        </View>
                    </TouchableOpacity>
                    <Text style={tw`font-poppinsMedium text-xl`}>{channel_name}</Text>
                    <View></View>
                </View>
                <View style={tw`px-5 pt-5`}>
                    {/* Profile banner */}
                    <Image
                        source={cover_image}
                        style={[
                            tw`w-full rounded-2xl relative`,
                            {
                                height: _HIGHT * 0.19,
                            },
                        ]}
                    />
                    {/* Profile*/}
                    <View
                        style={tw`bg-primary rounded-full h-28 w-28 flex-row items-center justify-center  right-[45%] -bottom-10 absolute`}
                    >
                        <Image source={avatar} style={tw`rounded-full h-24 w-24 `} />
                    </View>
                </View>
                <View style={tw`mt-14 flex-row justify-center  `}>
                    <View style={tw`flex-1 items-center justify-center`}>
                        <Text style={tw`font-poppinsMedium text-xl pb-4`
                        }>Haircut Pro</Text>
                        <View style={tw`flex-row gap-3 p-1`}>
                            <SvgXml xml={IconLoction} />
                            <Text style={tw`text-base font-poppins`}>
                                {headOffice.location}
                            </Text>
                        </View>

                        <View style={tw`flex-row gap-3  p-1`}>
                            <SvgXml xml={IconPhone} />
                            <Text style={tw` text-base font-poppins`}>{contact}</Text>
                        </View>
                        <View style={tw`flex-row gap-3 p-1`}>
                            <SvgXml xml={IconGmail} />
                            <Text style={tw`text-base font-poppins `}>{email}</Text>
                        </View>
                    </View>
                </View>
                <View style={tw`mt-10 mx-5 p-5 flex-row justify-between items-center border border-primaryGray rounded-xl`}>
                    <SvgXml xml={IconVideo} />
                    <View style={tw`flex-col justify-center items-center`}>
                        <Text style={tw`text-base font-poppins`}>Videos</Text>
                        <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>{total_videos}</Text>
                    </View>
                </View>
                <View style={tw`flex-row items-center gap-4 pt-2 w-full px-5`}>
                    <View style={[tw` items-center  p-5 pt-4 border border-primaryGray rounded-xl`, {
                        width: _Width * 0.43,
                    }]}>
                        <SvgXml xml={IconPhoto} />
                        <View style={tw`flex-col justify-center items-center`}>
                            <Text style={tw`text-base font-poppins pt-4`}>Views</Text>
                            <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>{total_views}</Text>
                        </View>
                    </View>
                    <View style={[tw` items-center  p-5 pt-4 border border-primaryGray rounded-xl`, {
                        width: _Width * 0.43,
                    }]}>
                        <SvgXml xml={IconLikes} />
                        <View style={tw`flex-col justify-center items-center`}>
                            <Text style={tw`text-base font-poppins pt-4`}>Likes</Text>
                            <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>{total_likes}</Text>
                        </View>
                    </View>
                </View>

               
                    <View style={[tw`mt-5 mx-5`, { height: 300, borderRadius: 10, overflow: 'hidden' }]}>
                        <SimpleMapView locations={profileData?.data?.channel?.locations} />
                    </View>
              

                {/* About section */}
                <View style={tw`mt-10 mx-5 p-5  border border-primaryGray rounded-xl`}>
                    <Text style={tw`font-poppinsMedium text-xl pb-3`}>About</Text>
                    <Text style={tw`font-poppins text-sm `}>{bio}</Text>
                </View>
                {/* Services */}
                <View style={tw`mt-10 mx-5 p-5 flex-col justify-start mb-4 border border-primaryGray rounded-xl`}>
                    <Text style={tw`font-poppinsMedium text-xl pb-3 `}>Services</Text>
                    {
                        services?.map((item: any, index: number) => (
                            <Text key={index} style={tw`font-poppins text-base pb-2 text-black`}>
                                {item}
                            </Text>
                        ))
                    }
                </View>
                <FlatList
                    data={videos?.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Card data={item} />}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

export default channelProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: 300,
    },
});