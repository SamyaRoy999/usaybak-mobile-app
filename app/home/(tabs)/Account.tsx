import HeaderBar from "@/components/shear/HeaderBar";
import {
  IconAboutus,
  IconAnalytics,
  IconBack,
  IconCansel,
  IconContactus,
  IconDeshboard,
  IconFAQ,
  IconLike,
  IconLine,
  IconMyvideos,
  IconOnsite,
  IconReports,
  IconSettings,
  IconTerms,
  IconTime
} from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useHistoryVideoDeleteMutation, useHistoryVideoQuery, useLikeVideosDeleteMutation, useLikeVideosQuery } from "@/redux/apiSlices/Account/accountSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { SvgXml } from "react-native-svg";

const Account = () => {
  // ................... History ........................//
  const { data: historyVideo, isLoading, error, refetch } = useHistoryVideoQuery({})
  const { data: likeVideo, isLoading: islikeVideoLoading, refetch: islikeVideoRef} = useLikeVideosQuery({})
  const [deleteHistoryVideo] = useHistoryVideoDeleteMutation();
  const [likeVideosDelete] = useLikeVideosDeleteMutation();

  if (isLoading || islikeVideoLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error loading Account Data </Text>
      </View>
    );
  }


  // .............. DELETE ......... //
  const handleDeleteVideo = async (type: "history" | "like", id: any) => {
    try {
      let res;
      if (type === "history") {
        res = await deleteHistoryVideo(id).unwrap();
        refetch();
      } else if (type === "like") {
        res = await likeVideosDelete(id).unwrap();

      }

      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: res.message,
          autoClose: 2000,
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: res?.message || "Something went wrong!",
          autoClose: 2000,
        });
      }
    } catch (err) {

    }
  };

  useEffect(() => {
    refetch()
    islikeVideoRef()
  }, [])

  return (
    <View style={tw`flex-1 bg-primary `}>
      <AlertNotificationRoot>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderBar />
          <View
            style={tw`flex-row w-full justify-between items-center px-5 py-6`}
          >
            <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconTime} />
              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                History
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <TouchableOpacity
                onPress={() => router.push("/(allPages)/history")}
                style={tw`py-3 px-5 rounded-full border border-primaryGray`}
              >
                <Text style={tw`font-poppinsMedium text-base text-black`}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`px-2 mx-4`}>
            {/* History  */}
            {historyVideo?.data?.data.length === 0 ? (
              <View style={tw`flex-1 justify-center items-center mt-10`}>
                <Text style={tw`font-poppins text-lg`}>No watch history found</Text>
              </View>
            ) : (
              <FlatList
                data={historyVideo?.data?.data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
                horizontal
                renderItem={({ item }) => {
                  return (
                    <View style={[tw` mr-4`, { width: _Width * 0.4 }]}>
                      <Image
                        style={[
                          tw`rounded-xl`,
                          { width: _Width * 0.4, height: _HIGHT * 0.1 },
                        ]}
                        source={{ uri: item?.video?.thumbnail }}
                      />
                      <Text
                        style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                      >
                        {item.video?.title?.split(" ").slice(0, 4).join(" ")}...
                      </Text>
                      <View style={tw`flex-row justify-between w-full items-center`}>
                        <Text style={tw`text-sm font-poppins  text-secondaryBlack `}>
                          {item.video?.user?.channel_name}
                        </Text>
                        {/* Delete Button */}
                        <TouchableOpacity onPress={() => handleDeleteVideo("history", item?.id)}>
                          <SvgXml xml={IconCansel} width={20} height={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                }}
              />)}
          </View>
          {/* liked video */}
          <View
            style={tw`flex-row w-full justify-between items-center px-5 py-6`}
          >
            <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconLike} />
              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                Liked videos
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <TouchableOpacity
                style={tw`py-3 px-5 rounded-full border border-primaryGray`}
                onPress={() => router.push("/(allPages)/likeds")}
              >
                <Text style={tw`font-poppinsMedium text-base text-black`}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* like co.. */}
          <View style={tw`px-2 mx-4`}>
            {/* like  */}
            {likeVideo?.data?.data.length === 0 ? (
              <View style={tw`flex-1 justify-center items-center mt-10`}>
                <Text style={tw`font-poppins text-lg`}>No Like Video found</Text>
              </View>
            ) : (
              <FlatList
                data={likeVideo?.data?.data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
                horizontal
                renderItem={({ item }) => (
                  <View style={[tw` mr-4`, { width: _Width * 0.4 }]}>
                    <Image
                      style={[
                        tw`rounded-xl`,
                        { width: _Width * 0.4, height: _HIGHT * 0.1 },
                      ]}
                      source={{ uri: item?.video?.thumbnail }}
                    />
                    <Text
                      style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                    >
                      {item.video?.title?.split(" ").slice(0, 4).join(" ")}...
                    </Text>
                    <View style={tw`flex-row justify-between w-full items-center`}>
                      <Text style={tw`text-sm font-poppins  text-secondaryBlack `}>
                        {item?.video?.user.channel_name}
                      </Text>
                      <TouchableOpacity onPress={() => handleDeleteVideo("like", item?.id)}>
                        <SvgXml xml={IconCansel} width={20} height={20} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
          <View>
            {/* dashboard */}
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center px-8 pt-6`}
              onPress={() => router.push("/(allPages)/dashboard")}
            >
              <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
                <SvgXml xml={IconDeshboard} />
                <Text
                  style={tw`font-poppinsMedium text-base text-secondaryBlack`}
                >
                  Dashboard
                </Text>
              </View>
              <View style={tw``}>
                <View style={tw`border-primaryGray`}>
                  <SvgXml xml={IconBack} />
                </View>
              </View>
            </TouchableOpacity>
            {/* My videos */}
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center px-8 py-2`}
              onPress={() => router.push("/(allPages)/my_videos")}>

              <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
                <SvgXml xml={IconMyvideos} />

                <Text
                  style={tw`font-poppinsMedium text-base text-secondaryBlack`}
                >
                  My videos
                </Text>
              </View>
              <View style={tw``}>
                <View style={tw`border-primaryGray`}>
                  <SvgXml xml={IconBack} />
                </View>
              </View>
            </TouchableOpacity>
            {/* Analytics */}
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center px-8 py-2`}
              onPress={() => router.push("/(allPages)/analytics")}
            >
              <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
                <SvgXml xml={IconAnalytics} />

                <Text
                  style={tw`font-poppinsMedium text-base text-secondaryBlack`}
                >
                  Analytics
                </Text>
              </View>
              <View style={tw``}>
                <View style={tw`border-primaryGray`}>
                  <SvgXml xml={IconBack} />
                </View>
              </View>
            </TouchableOpacity>
            {/*  Settings */}
            <TouchableOpacity
              style={tw`flex-row w-full justify-between items-center px-8 py-2`}
              onPress={() => router.push('/(allPages)/settings')}

            >
              <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
                <SvgXml xml={IconSettings} />

                <Text
                  style={tw`font-poppinsMedium text-base text-secondaryBlack`}
                >
                  Settings
                </Text>
              </View>
              <View style={tw``}>
                <View style={tw`border-primaryGray`}>
                  <SvgXml xml={IconBack} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Reports */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
            onPress={() => router.push("/(allPages)/report")}
          >
            <View style={tw` flex-row gap-2 py-3 rounded-lg`} >
              <SvgXml xml={IconReports} />

              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                Reports
              </Text>
            </View>
            <View style={tw``}>
              <View style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={tw`flex-row justify-center py-6`}>
            <SvgXml xml={IconLine} />
          </View>

          {/* Reports */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
            onPress={() => router.push("/(allPages)/faqSection")}
          >
            <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconFAQ} />

              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                FAQ
              </Text>
            </View>
            <View style={tw``}>
              <View style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </View>
            </View>
          </TouchableOpacity>
          {/* Aboutus */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
            onPress={() => router.push("/(allPages)/aboutUs")}
          >
            <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconAboutus} />

              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                About us
              </Text>
            </View>
            <View>
              <View style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </View>
            </View>
          </TouchableOpacity>
          {/* Reports */}
          <TouchableOpacity
            onPress={() => router.push("/(allPages)/contactUs")}
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
          >
            <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconContactus} />

              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                Contact us
              </Text>
            </View>
            <View style={tw``}>
              <View style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </View>
            </View>
          </TouchableOpacity>
          {/* Reports */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
            onPress={() => router.push("/(allPages)/termsConditions")}
          >
            <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconTerms} />
              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                Terms & Conditions
              </Text>
            </View>
            <View style={tw``}>
              <View style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2 pb-9`}
            onPress={() => router.push("/(allPages)/onsiteAccount")}
          >
            <View style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconOnsite} />

              <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
                Onsite account creation
              </Text>
            </View>
            <View style={tw``}>
              <View style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </AlertNotificationRoot>
    </View>
  );
};

export default Account;