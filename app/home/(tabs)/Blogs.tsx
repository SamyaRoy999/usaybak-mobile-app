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

// data/blogs.js
// export const blogData = [
//   {
//     id: 1,
//     title: "How to manage tasks efficiently",
//     description:
//       "Et enim porttitor pellentesque blandit neque quam sagittis enim quis",
//     image:
//       "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 2,
//     title: "Boost Your Productivity",
//     description:
//       "Lorem ipsum dolor sit amet consectetur. Fusce pulvinar aliquam sit consequat",
//     image:
//       "https://images.unsplash.com/photo-1581090700227-1e8f7b3c47b1?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 3,
//     title: "React Native Layout Tips",
//     description:
//       "Integer fermentum sed ut nec in facilisis sed amet. Pharetra posuere odio",
//     image:
//       "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     title: "UI/UX Best Practices",
//     description:
//       "Enhance user experience with proper spacing and intuitive design",
//     image:
//       "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 5,
//     title: "Working Remotely Like a Pro",
//     description: "Discover tools and techniques to stay productive at home",
//     image:
//       "https://images.unsplash.com/photo-1601049721162-7a4d7a0792fa?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 6,
//     title: "Mental Health for Developers",
//     description: "Coding is great, but don’t forget self-care and breaks",
//     image:
//       "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 7,
//     title: "Dark Mode Design Tips",
//     description: "Make your dark theme aesthetically pleasing and readable",
//     image:
//       "https://images.unsplash.com/photo-1580713040920-174eaa3b8f94?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 8,
//     title: "Best Tools for Developers 2025",
//     description: "We reviewed the top tools for developers this year",
//     image:
//       "https://images.unsplash.com/photo-1517430816045-df4b7de1cd0c?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 9,
//     title: "Debugging Like a Pro",
//     description: "Learn how to approach bugs and fix them efficiently",
//     image:
//       "https://images.unsplash.com/photo-1633356122307-d2c6f14eab78?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 10,
//     title: "Learning TypeScript Fast",
//     description: "Get started with TypeScript the smart way",
//     image:
//       "https://images.unsplash.com/photo-1640184355642-002ba1f11632?auto=format&fit=crop&w=800&q=80",
//   },
// ];

const Blogs = () => {

  const { data: blogs } = useBlogsQuery({});
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

