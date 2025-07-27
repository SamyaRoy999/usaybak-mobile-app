import { OnsiteAccount } from '@/assets/images/images'
import { IconBackLeft, IconErowWhite, IconOneTime, IconWhatYouGet, IconWhoIs, IconWorning } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const onsiteAccount = () => {
    return (
        <View style={tw`bg-primary flex-1`}>
            <ScrollView contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={tw`p-4`}>
                    <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                        <View
                            style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                        >
                            <TouchableOpacity onPress={() => router.back()}>
                                <SvgXml xml={IconBackLeft} />
                            </TouchableOpacity>
                        </View>
                        <Text style={tw`font-poppinsMedium text-xl`}>Onsite account creation</Text>
                        <View />
                    </View>
                </View>

                {/* Top Banner */}
                <View style={tw`relative`}>
                    <Image
                        style={{ width: _Width, height: _HIGHT * 0.3 }}
                        source={OnsiteAccount}
                    />
                    <Text style={tw`absolute bottom-0 text-white font-poppinsMedium text-lg p-4`}>
                        Get Discovered Locally: Sign Up Your Business on MyTSV.com
                    </Text>
                </View>

                {/* Description */}
                <View style={tw`px-5 mt-5`}>
                    <Text style={tw`text-xl font-poppinsMedium text-center text-black mb-2`}>
                        Grow Your Business with Real Video Exposure
                    </Text>
                    <Text style={tw`text-base font-poppins mb-4 text-center`}>
                      Our representatives are visiting local businesses like yours to offer an exclusive opportunity to join *MyTSV.com*— the video-first platform connecting local services with real local customers.
                    </Text>

                    <View style={tw` bg-primaryText p-3 mb-12 flex-row items-center gap-4 rounded-lg px-8`}>
                        <SvgXml xml={IconWorning} />
                        <Text style={tw`font-poppins  text-sm`}>
                            This service is currently available in select locations. Please contact us to confirm availability before signing up.
                        </Text>
                    </View>
                </View>

                {/* What You Get */}
                <LinearGradient
                    colors={['#EC008C', '#FC6767']}
                    style={tw`rounded-xl mx-5 mb-10 p-4 relative`}
                >
                    <View style={tw`absolute -top-8 left-[45%]  border-8 rounded-full border-primary`}>
                        <SvgXml xml={IconWhatYouGet} />
                    </View>
                    <View style={tw`py-10 px-6`}>
                        <Text style={tw`text-white font-poppinsMedium text-xl mb-2 text-center `}> What You Get</Text>
                        <Text style={tw`text-white  leading-6 font-poppins text-base`}>
                            • A professionally recorded and uploaded video of your business{'\n'}
                            • Feature listing in your category{'\n'}
                            • Photos, banners, SEO support{'\n'}
                            • Business contact & appointment tools{'\n'}
                            • Boost reach to MyTSV customers — “find local”{'\n'}
                            • Paid ads on local search feed{'\n'}
                            • Full customer support and optimization assistance
                        </Text>
                    </View>
                </LinearGradient>

                {/* Who Is This For */}
                <LinearGradient
                    colors={['#EC008C', '#FC6767']}
                    style={tw`rounded-xl mx-5 mb-10 p-4 relative`}
                >
                    <View style={tw`absolute -top-8 left-[45%]  border-8 rounded-full border-primary`}>
                        <SvgXml xml={IconWhoIs} />
                    </View>
                    <View style={tw`py-10 px-6`}>
                        <Text style={tw`text-white font-poppinsMedium text-xl mb-2 text-center `}>  Who is This For?</Text>
                        <Text style={tw`text-white  leading-6 font-poppins text-base`}>
                            • Local service providers (doctors, salons, etc.){'\n'}
                            • New businesses looking more exposure{'\n'}
                            • Storefront businesses wanting maximum visibility{'\n'}
                            • Freelancers offering in-person or mixed services
                        </Text>
                    </View>
                </LinearGradient>

                {/* Sign-Up Fee */}
                <LinearGradient
                    colors={['#EC008C', '#FC6767']}
                    style={tw`rounded-xl mx-5  p-4 relative`}
                >
                    <View style={tw`absolute -top-8 left-[45%]  border-8 rounded-full border-primary`}>
                        <SvgXml xml={IconOneTime} />
                    </View>
                    <View style={tw`py-10 px-6`}>
                        <Text style={tw`text-white font-poppinsMedium text-xl mb-2 text-center `}>  One-Time Sign-Up Fee: $99.99</Text>
                        <Text style={tw`text-white  leading-6 font-poppins text-base`}>
                            • Video recording on-site{'\n'}
                            • Local SEO optimization{'\n'}
                            • Upload + Profile Setup{'\n'}
                            • Promotion across MyTSV.com channels
                        </Text>
                    </View>
                </LinearGradient>
                <View style={tw`px-6 `}>
                    <Text style={tw`text-center font-poppins text-xl p-4`}>Ready to Get Started?</Text>
                    <Text  style={tw`text-center font-poppins text-base`}>
                        Our representative will assist you on-site. You can pay below and they’ll handle the rest — including filming, uploading, and account setup.  You’re not just advertising. You’re being *seen in action* by real potential clients in your area.
                    </Text>
                </View>

                {/* Register Button */}
                <View style={tw`px-5 mb-10`}>
                    <TouchableOpacity
                        style={tw`flex-row items-center gap-2 py-5 bg-secondary px-4  mt-14 rounded-full justify-center`}
                    >
                        <Text style={tw`text-primaryText text-lg font-poppinsMedium`}>
                            Pay & register now
                        </Text>
                        <SvgXml xml={IconErowWhite} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default onsiteAccount
