import { IconAboutUsimge, IconbackRight, IconJoinUs, IconMeetwithTheTeam, IconMission, IconOurStory, IconWhychoose } from '@/icons/Icon';
import tw from '@/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const AboutUs = () => {
    return (
        <View style={tw`flex-1 bg-primary`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <TouchableOpacity style={tw``} onPress={()=> router.back()}>
                    <SvgXml xml={IconbackRight}/>
                </TouchableOpacity>

                {/* Top Logo and Image */}
                <View style={tw`items-center `}>
                    <SvgXml xml={IconAboutUsimge}/>
                </View>

                {/* Title */}
                <Text style={tw`text-lg font-poppinsMedium text-center  mb-8 bg-primaryText py-4 rounded-full `}>About Us</Text>
                <Text style={tw`text-base text-center font-poppinsMedium  mb-6`}>
                    Welcome to mytsv.com – your destination for connection, creativity, and community.
                </Text>
                <Text style={tw`text-base text-center font-poppins  mb-6`}>
                    At MyTSV, we believe that powerful ideas deserve a platform. Whether you’re an individual looking to share your voice, a business seeking exposure, or a curious mind in search of new opportunities, we provide the digital space and tools to help you thrive.
                </Text>

                {/* Mission Section */}
                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray`}>
                    <View style={tw`flex-row items-center gap-2 `}>
                        <SvgXml xml={IconMission} />
                        <Text style={tw`text-xl font-poppinsMedium mb-2 `}> Our Mission</Text>
                    </View>
                    <Text style={tw`text-base pt-5  font-poppins `}>
                        To empower individuals and businesses by offering a dynamic, user-focused platform for innovation, creativity, and meaningful collaboration.
                    </Text>
                </View>
                {/* Mission Section */}
                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray`}>
                    <View style={tw`flex-row items-center gap-3 `}>
                        <SvgXml xml={IconMeetwithTheTeam} />
                        <Text style={tw`text-xl font-poppinsMedium mb-2 `}>Meet with the Team</Text>
                    </View>
                    <Text style={tw`text-base pt-5  font-poppins `}>
                        Behind MyTSV is a passionate team of creators, developers, and community builders. We come from diverse backgrounds, but we’re united by one goal: to make mytsv.com a place where ideas come to life and connections lead to real impact.

                        We’re designers and storytellers, strategists and support heroes, all working together to make your experience seamless, enriching, and inspiring.
                    </Text>
                </View>
                {/* Our Story Section */}
                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray`}>
                    <View style={tw`flex-row items-center gap-3 `}>
                        <SvgXml xml={IconOurStory} />
                        <Text style={tw`text-xl font-poppinsMedium mb-2 `}>Our Story</Text>
                    </View>
                    <Text style={tw`text-base pt-5  font-poppins `}>
                        Founded with a vision to bring people and ideas together, MyTSV began as a local project with a big dream. What started as a small initiative to highlight community talent and services in Chicagoland has now grown into a multi-faceted platform serving users from all walks of life.

                        We noticed a gap in platforms that balance visibility, usability, and community. So, we set out to build a space that not only showcases talent and services but also encourages collaboration and innovation.

                        Over the years, we’ve expanded our offerings, refined our technology, and stayed committed to the needs of our growing user base—all while keeping our core values front and center.
                    </Text>
                </View>
                {/* Our Story Section */}

                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray`}>
                    <View style={tw`flex-row items-center gap-3 `}>
                        <SvgXml xml={IconWhychoose} />
                        <Text style={tw`text-xl font-poppinsMedium mb-2 `}>Why choose MyTsv ?</Text>
                    </View>
                    <Text style={tw`text-base pt-5 font-poppins`}>
                        • User-First Design{'\n'}
                        • Innovation that Inspires{'\n'}
                        • Community-Led Growth
                    </Text>
                </View>
                {/* Join Us */}
                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray`}>
                    <View style={tw`flex-row items-center gap-3 `}>
                        <SvgXml xml={IconJoinUs} />
                        <Text style={tw`text-xl font-poppinsMedium mb-2 `}>Join Us</Text>
                    </View>
                    <Text style={tw`text-base pt-5 font-poppins`}>
                        Whether you’re a local business owner, a creative mind, or someone searching for inspiration—MyTSV is your stage. Explore, connect, grow. We’re glad you’re here.
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
};

export default AboutUs;
