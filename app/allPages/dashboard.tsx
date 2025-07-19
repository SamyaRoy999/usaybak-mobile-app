import { profileBanner, profleImg } from '@/assets/images/images'
import HeaderBar from '@/components/shear/HeaderBar'
import { IconBackLeft, IconErow, IconLikes, IconLoction, IconPhoto, IconVideo } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { SvgXml } from 'react-native-svg'
const screenWidth = Dimensions.get("window").width;


const dashboard = () => {

    const barData = [
        { value: 2720, label: '01' },
        { value: 2528, label: '02' },
        { value: 1041, label: '03' },
        { value: 6400, label: '04' },
        { value: 1371, label: '05' },
        { value: 1201, label: '06' },
        { value: 1727, label: '07' },
        { value: 6230, label: '08' },
        { value: 4604, label: '09' },
        { value: 2040, label: '10' },
        { value: 6797, label: '11' },
        { value: 0, label: '12' }
    ];

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <HeaderBar />
                <View style={tw`flex-row items-center gap-5 px-5 mb-8`}>
                    <View
                        style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                    >
                        <TouchableOpacity onPress={() => router.back()}>
                            <SvgXml xml={IconBackLeft} />
                        </TouchableOpacity>
                    </View>
                    <Text style={tw`font-poppinsMedium text-xl `}>
                        Blog post title goes here
                    </Text>
                </View>

                <View style={tw`px-5 pt-5`}>
                    {/* Profile banner */}
                    <Image
                        source={profileBanner}
                        style={[
                            tw`w-full rounded-2xl relative`,
                            {
                                height: _HIGHT * 0.19,
                            },
                        ]}
                    />
                    {/* Profile  */}
                    <View
                        style={tw`bg-primary rounded-full h-28 w-28 flex-row items-center justify-center  right-[45%] -bottom-10 absolute`}
                    >
                        <Image source={profleImg} style={tw`rounded-full h-24 w-24 `} />
                    </View>
                </View>
                <View style={tw`mt-14 flex-row justify-center  `}>
                    <View style={tw`flex-1 items-center justify-center`}>
                        <Text style={tw`font-poppinsMedium text-xl pb-4`}>Haircut Pro</Text>
                        <View style={tw`flex-row gap-3 p-1`}>
                            <SvgXml xml={IconLoction} />
                            <Text style={tw` text-base font-poppins `}>New work, USA</Text>
                        </View>
                    </View>
                </View>
                <View style={tw`mt-10 mx-5 p-5 flex-row justify-between items-center border border-primaryGray rounded-xl`}>
                    <SvgXml xml={IconVideo} />
                    <View style={tw`flex-col justify-center items-center`}>
                        <Text style={tw`text-base font-poppins`}>Videos</Text>
                        <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>40</Text>
                    </View>
                </View>
                <View style={tw`flex-row items-center gap-4 pt-2 w-full px-5`}>
                    <View style={[tw` items-center  p-5 pt-4 border border-primaryGray rounded-xl`, {
                        width: _Width * 0.43,
                    }]}>
                        <SvgXml xml={IconPhoto} />
                        <View style={tw`flex-col justify-center items-center`}>
                            <Text style={tw`text-base font-poppins pt-4`}>Videos</Text>
                            <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>22,568</Text>
                        </View>
                    </View>
                    <View style={[tw` items-center  p-5 pt-4 border border-primaryGray rounded-xl`, {
                        width: _Width * 0.43,
                    }]}>
                        <SvgXml xml={IconLikes} />
                        <View style={tw`flex-col justify-center items-center`}>
                            <Text style={tw`text-base font-poppins pt-4`}>Likes</Text>
                            <Text style={tw`text-3xl font-poppinsSemiBold py-5`}>17,256</Text>
                        </View>
                    </View>

                </View>
                <TouchableOpacity onPress={()=> router.push("/allPages/analytics")} style={tw`border rounded-full w-3/6 justify-center  border-primaryGray flex-row items-center mx-5 mt-3 gap-2 px-3 py-2`}>
                    <Text style={tw`font-poppins text-base`}>See full analytics</Text>
                    <SvgXml xml={IconErow} />
                </TouchableOpacity>
                {/* About section */}
                <View style={tw`mt-10 mx-5 p-5  border border-primaryGray rounded-xl`}>
                    <Text style={tw`font-poppinsMedium text-xl pb-3`}>About</Text>
                    <Text style={tw`font-poppins text-sm `}>Lorem ipsum dolor sit amet consectetur. Nibh sagittis ligula sem pulvinar elementum rhoncus lacus. Dignissim pretium vitae neque vulputate velit libero suscipit amet. Felis proin in tortor amet. Sit imperdiet ac aliquam leo est egestas. Sit id vitae tempus nulla ut consectetur mi lobortis nec. Convallis velit lectus aliquam elementum dignissim. Est risus adipiscing ornare et lorem </Text>
                </View>
                {/* Services */}
                <View style={tw`mt-10 mx-5 p-5 flex-col justify-start  border border-primaryGray rounded-xl`}>
                    <Text style={tw`font-poppinsMedium text-xl pb-3`}>Services</Text>
                    <Text style={tw`font-poppins text-base pb-2 `}>1. Haircuts & Trims </Text>
                    <Text style={tw`font-poppins text-base pb-2 `}>2. Hair Styling</Text>
                    <Text style={tw`font-poppins text-base pb-2 `}>3. Hair Coloring</Text>
                    <Text style={tw`font-poppins text-base pb-2 `}>4. Hair Treatments</Text>
                    <Text style={tw`font-poppins text-base pb-2 `}>5. Chemical Services </Text>
                </View>
                <Text style={tw`font-poppins text-xl mx-5 pt-7 pb-3`}>Views analytics</Text>
                {/* Bar Chart */}
                <View style={tw`px-4 pb-3`}>
                    <BarChart
                        data={barData}
                        height={250}
                        width={350}
                        barWidth={16}
                        spacing={20}
                        roundedTop
                        frontColor="#8979FF"
                        noOfSections={5}
                        maxValue={10000}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        yAxisTextStyle={tw`text-xs text-gray-500`}
                        xAxisLabelTextStyle={tw`text-xs text-gray-500 mt-1`}
                        rulesType="solid"
                        rulesColor="#E5E7EB"
                        showReferenceLine1
                        referenceLine1Position={8000}
                        referenceLine1Config={{
                            color: '#9CA3AF',
                            dashWidth: 2,
                            dashGap: 3,
                        }}
                        showReferenceLine2
                        referenceLine2Position={6000}
                        referenceLine2Config={{
                            color: '#9CA3AF',
                            dashWidth: 2,
                            dashGap: 3,
                        }}
                        showReferenceLine3
                        referenceLine3Position={4000}
                        referenceLine3Config={{
                            color: '#9CA3AF',
                            dashWidth: 2,
                            dashGap: 3,
                        }}
                        renderTooltip={(item: { value: number }) => (
                            <View style={tw`bg-gray-800 px-2 py-1 rounded`}>
                                <Text style={tw`text-white text-xs`}>{item.value.toString()}</Text>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default dashboard