import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconAboutus,
  IconAnalytics,
  IconBack,
  IconCansel,
  IconContactus,
  IconDeshboard,
  IconErowred,
  IconFAQ,
  IconLike,
  IconLine,
  IconMyvideos,
  IconOnsite,
  IconReports,
  IconSettings,
  IconTerms,
  IconTime,
} from "@/icons/Icon";
import HeaderBar from "@/components/shear/HeaderBar";
import { Image } from "expo-image";
import data from "../../../lib/data.json";
import { _HIGHT, _Width } from "@/utils/utils";
import { router } from "expo-router";

const Account = () => {
  return (
    <View style={tw`flex-1 bg-primary`}>
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
              onPress={() => router.push("/allPages/history")}
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
          <FlatList
            data={data}
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
                  source={{ uri: item?.thumbnail }}
                />
                <Text
                  style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                >
                  {item.title}
                </Text>
                <View style={tw`flex-row justify-between w-full items-center`}>
                  <Text style={tw`text-sm font-poppins  text-secondaryBlack `}>
                    {item.channelName}
                  </Text>
                  <TouchableOpacity>
                    <SvgXml xml={IconCansel} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
              onPress={() => router.push("/allPages/likeds")}
            >
              <Text style={tw`font-poppinsMedium text-base text-black`}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* like co.. */}
        <View style={tw`px-2 mx-4`}>
          {/* History  */}
          <FlatList
            data={data}
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
                  source={{ uri: item?.thumbnail }}
                />
                <Text
                  style={tw`text-base font-poppinsMedium py-1 text-secondaryBlack `}
                >
                  {item.title}
                </Text>
                <View style={tw`flex-row justify-between w-full items-center`}>
                  <Text style={tw`text-sm font-poppins  text-secondaryBlack `}>
                    {item.channelName}
                  </Text>
                  <TouchableOpacity>
                    <SvgXml xml={IconCansel} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
        <View>
          {/* dashboard */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 pt-6`}
            onPress={() => router.push("/allPages/dashboard")}
          >
            <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconDeshboard} />
              <Text
                style={tw`font-poppinsMedium text-base text-secondaryBlack`}
              >
                Dashboard
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <TouchableOpacity style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {/* My videos */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
            onPress={() => router.push("/allPages/channelProfile")}>

            <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconMyvideos} />

              <Text
                style={tw`font-poppinsMedium text-base text-secondaryBlack`}
              >
                My videos
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <TouchableOpacity style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {/* Analytics */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
          >
            <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconAnalytics} />

              <Text
                style={tw`font-poppinsMedium text-base text-secondaryBlack`}
              >
                Analytics
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <TouchableOpacity style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {/*  Settings */}
          <TouchableOpacity
            style={tw`flex-row w-full justify-between items-center px-8 py-2`}
          >
            <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
              <SvgXml xml={IconSettings} />

              <Text
                style={tw`font-poppinsMedium text-base text-secondaryBlack`}
              >
                Settings
              </Text>
            </TouchableOpacity>
            <View style={tw``}>
              <TouchableOpacity style={tw`border-primaryGray`}>
                <SvgXml xml={IconBack} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        {/* Reports */}
        <TouchableOpacity
          style={tw`flex-row w-full justify-between items-center px-8 py-2`}
        >
          <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`} onPress={() => router.push("/allPages/report")}>
            <SvgXml xml={IconReports} />

            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Reports
            </Text>
          </TouchableOpacity>
          <View style={tw``}>
            <TouchableOpacity style={tw`border-primaryGray`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center py-6`}>
          <SvgXml xml={IconLine} />
        </View>

        {/* Reports */}
        <TouchableOpacity
          style={tw`flex-row w-full justify-between items-center px-8 py-2`}
        >
          <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
            <SvgXml xml={IconFAQ} />

            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              FAQ
            </Text>
          </TouchableOpacity>
          <View style={tw``}>
            <TouchableOpacity style={tw`border-primaryGray`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* Aboutus */}
        <TouchableOpacity
          style={tw`flex-row w-full justify-between items-center px-8 py-2`}
        >
          <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
            <SvgXml xml={IconAboutus} />

            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              About us
            </Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity style={tw`border-primaryGray`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* Reports */}
        <TouchableOpacity
          style={tw`flex-row w-full justify-between items-center px-8 py-2`}
        >
          <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
            <SvgXml xml={IconContactus} />

            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Contact us
            </Text>
          </TouchableOpacity>
          <View style={tw``}>
            <TouchableOpacity style={tw`border-primaryGray`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* Reports */}
        <TouchableOpacity
          style={tw`flex-row w-full justify-between items-center px-8 py-2`}
        >
          <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
            <SvgXml xml={IconTerms} />

            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <View style={tw``}>
            <TouchableOpacity style={tw`border-primaryGray`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-row w-full justify-between items-center px-8 py-2`}
        >
          <TouchableOpacity style={tw` flex-row gap-2 py-3 rounded-lg`}>
            <SvgXml xml={IconOnsite} />

            <Text style={tw`font-poppinsMedium text-base text-secondaryBlack`}>
              Onsite account creation
            </Text>
          </TouchableOpacity>
          <View style={tw``}>
            <TouchableOpacity style={tw`border-primaryGray`}>
              <SvgXml xml={IconBack} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Account;
