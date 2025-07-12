import HeaderBar from '@/components/shear/HeaderBar'
import { IconAboutUsimge, IconbackRight } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const TermsConditions = () => {
    return (
        <View style={tw`bg-primary flex-1`}>
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
                <Text style={tw`text-lg font-poppinsMedium text-center  mb-8 bg-primaryText py-4 rounded-full `}>Terms & Conditions</Text>
                <Text style={tw`text-lg font-poppinsMedium text-center`}>Welcome to mytsv.com. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using the site.</Text>
                <View style={tw`border rounded-xl p-7 mb-4 border-primaryGray mt-7`}>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>1. Acceptance of Terms</Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        By accessing or using mytsv.com, you agree to be legally bound by these Terms and Conditions, our Privacy Policy, and any other policies we post. If you do not agree with any part of these terms, please do not use our website.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>2. Use of the Website</Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        You agree to use mytsv.com only for lawful purposes and in a way that does not infringe on the rights of, restrict, or inhibit anyone else's use of the website. You must not misuse the site by introducing viruses, attempting unauthorized access, or engaging in any activity that harms our platform or users.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>3. User Accounts</Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        If you create an account with us, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>4. Intellectual Property
                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        All content on mytsv.com, including text, graphics, logos, images, and software, is the property of MyTSV or its content suppliers and is protected by copyright, trademark, and other laws. You may not copy, distribute, or use our content without our prior written consent.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>5. User-Generated Content
                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        If you post or submit content (text, images, etc.) to the site, you grant MyTSV a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content. You must own the rights to any content you submit and agree not to post anything unlawful, offensive, or misleading.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>6. Third-Party Links
                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or privacy practices of those sites. Access them at your own risk.

                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>7. Limitation of Liability
                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        MyTSV is not liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use our website or services. All content is provided “as is” without warranties of any kind.

                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>8. Modifications to Terms

                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with a revised date. Your continued use of the site after such changes indicates your acceptance of the new terms.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>9. Termination
                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        We may suspend or terminate your access to mytsv.com without notice if we believe you have violated these Terms or engaged in harmful conduct.
                    </Text>
                    <Text style={tw`font-poppinsSemiBold text-base  `}>10. Governing Law

                    </Text>
                    <Text style={tw`text-base font-poppins mb-6`}>
                        These Terms and Conditions are governed by and interpreted in accordance with the laws of the State of Illinois, United States.
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default TermsConditions