import HeaderBar from "@/components/shear/HeaderBar";
import tw from "@/lib/tailwind";
import { useBlogsQuery } from "@/redux/apiSlices/Blogs/blogsSlices";
import { _HIGHT } from "@/utils/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebView } from 'react-native-webview';

const Blogs = () => {

  const { data: blogs, isLoading } = useBlogsQuery({});

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const blogsData = blogs?.data?.data;

  const renderItem = ({ item }: any) => {

    const { description, title, image, } = item
    const descriptionData = description.split(" ").slice(0, 25).join(" ");
    const htmlContent = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          ${descriptionData}
        </body>
      </html>
    `;

    return (
      <TouchableOpacity onPress={() => router.push(`/details/Blog/${item.id}`)}>
        <View style={tw`mb-5 bg-primary overflow-hidden`}>
          <Image
            source={{ uri: image }}
            style={tw`w-full h-48`}

          />

          <View style={tw`p-4`}>
            <Text style={tw`font-poppinsMedium text-xl`}>{title}</Text>
            <View style={{ height: _HIGHT * .1 }}>
              <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={tw`flex-1 bg-primary`}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <Text style={tw`text-sm font-poppins  mt-2 `}>

              <Text style={tw`text-secondary font-poppinsSemiBold text-base `}>
                Read more...
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-primary`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar />
        <Text style={tw`text-3xl font-bold text-center mb-4`}>Blogs</Text>
        <FlatList
          data={blogsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={tw` pb-10`}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Blogs;

