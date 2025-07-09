import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderBar from '@/components/shear/HeaderBar'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import { SvgXml } from 'react-native-svg'
import { IconBackLeft } from '@/icons/Icon'
import { BarChart } from "react-native-gifted-charts";

const Analytics = () => {
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
        <View style={tw`flex-1 bg-white`}>
            <HeaderBar />
            <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                <View style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <SvgXml xml={IconBackLeft} />
                    </TouchableOpacity>
                </View>
                <Text style={tw`font-poppinsMedium text-xl`}>Analytics</Text>
                <View style={tw`w-13`}></View>
            </View>

            {/* Stats Cards */}
            <View style={tw`flex-row w-full justify-center items-center mb-8`}>
                <View style={tw`border w-32 h-32 flex-col items-center justify-center border-gray-200 rounded-lg`}>
                    <Text style={tw`font-poppins text-sm text-black`}>Views</Text>
                    <Text style={tw`font-poppinsSemiBold text-xl`}>10,256</Text>
                </View>
                <View style={tw`border w-32 h-32 flex-col items-center justify-center border-gray-200 rounded-lg`}>
                    <Text style={tw`font-poppins text-sm text-black`}>Likes</Text>
                    <Text style={tw`font-poppinsSemiBold text-xl`}>1,256</Text>
                </View>
                <View style={tw`border w-32 h-32 flex-col items-center justify-center border-gray-200 rounded-lg`}>
                    <Text style={tw`font-poppins text-sm text-black`}>Dislikes</Text>
                    <Text style={tw`font-poppinsSemiBold text-xl`}>256</Text>
                </View>
            </View>

            <Text style={tw`text-xl font-poppins px-12 py-6 text-center`}>
                Your channel got 10,256 views in this month
            </Text>

            {/* Bar Chart */}
            <View style={tw`px-4`}>
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
        </View>
    )
}

export default Analytics