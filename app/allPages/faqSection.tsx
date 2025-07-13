import HeaderBar from "@/components/shear/HeaderBar";
import { IconAboutUsimge, IconbackRight } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { _Width } from "@/utils/utils";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { LayoutAnimation, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const faqData = [
  {
    question: "What is MyTSV.com ?",
    answer:
      "MyTSV is a video-sharing platform designed for local businesses, professionals, and specialists to showcase their services, talents, and products through video content.",
  },
  {
    question: "How do I create an account?",
    answer:
      "You can create an account by signing up with your email address or using social login.",
  },
  {
    question: "Is MyTSV free to use?",
    answer: "Yes, MyTSV offers free access to basic features for all users.",
  },
  {
    question: "Can I upload videos as a business owner?",
    answer:
      "Yes, business owners can upload videos to promote their services and reach more local customers.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact customer support via the Help section in the app or by emailing support@mytsv.com.",
  },
];


const FaqSection = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First one open

    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <View style={tw`bg-primary`}>
            <ScrollView contentContainerStyle={tw`p-4`} showsVerticalScrollIndicator={false}>
                <HeaderBar />
                <TouchableOpacity style={tw``} onPress={() => router.back()}>
                    <SvgXml xml={IconbackRight} />
                </TouchableOpacity>
                {/* Top Logo and Image */}
                <View style={tw`items-center `}>
                    <SvgXml xml={IconAboutUsimge} />
                </View>
                {/* Title */}
                <Text style={tw`text-lg font-poppinsMedium text-center  mb-8 bg-primaryText py-4 rounded-full`}>Frequently Asked Questions (FAQ)</Text>

                {faqData.map((item, index) => (
                    <View
                        key={index}
                        style={tw`mb-3  rounded-xl overflow-hidden border border-gray-200`}
                    >
                        <TouchableOpacity
                            onPress={() => toggleExpand(index)}
                            style={tw`flex-row justify-between items-center px-4 py-4 rounded-2xl bg-primaryText`}
                        >
                            <Text style={[tw`text-lg font-poppinsMedium `, {
                                width: _Width * 0.78
                            }]}>{item.question}</Text>
                            <AntDesign
                                name={expandedIndex === index ? "up" : "down"}
                                size={18}
                                color="#555"
                            />
                        </TouchableOpacity>
                        {expandedIndex === index && (
                            <View style={tw`px-4 pb-4`}>
                                <Text style={tw`text-base font-poppins p-2`}>{item.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}
                    </ScrollView>
        </View>
    );
};

export default FaqSection;
