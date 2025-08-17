import { ImgLogo, OnsiteAccount } from '@/assets/images/images'
import { IconBackLeft, IconClose, IconErowWhite, IconOneTime, IconWhatYouGet, IconWhoIs } from '@/icons/Icon'
import tw from '@/lib/tailwind'
import { useOnsiteAccountRegMutation } from '@/redux/apiSlices/Account/accountSlice'
import { usePriceGetAllQuery } from '@/redux/apiSlices/Home/homeApiSlices'
import { useMyProfileQuery } from '@/redux/apiSlices/MyVideo/myvideoSlice'
import { usePaymentMutation, usePaymentSuccessMutation } from '@/redux/apiSlices/payment/paymentSlice'
import { _HIGHT, _Width } from '@/utils/utils'
import { Entypo } from '@expo/vector-icons'
import { useStripe } from '@stripe/stripe-react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification'
import { SvgXml } from 'react-native-svg'
import * as Yup from "yup"

const onsiteAccount = () => {

    // ............ All state ................//
    const [payRegisterModal, setPayRegisterModal] = useState(false)
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [paymentIntentData, setPaymentIntentData] = React.useState<any>(null);
    const [isProcessing, setIsProcessing] = React.useState(false);

    // ............stripe ..............//
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    // ............ Post api for register ................//
    const [onsiteAccountReg] = useOnsiteAccountRegMutation()
    const {
        data: priceOnSide,
    } = usePriceGetAllQuery({});

    // User profile data

    const {
        data: userData,
        isLoading: isUserLoading,
        refetch: refetchUser
    } = useMyProfileQuery({})
    const userId = userData?.data?.id

    // Function to refresh user data
    const refreshUserData = async () => {
        try {
            await refetchUser()
        } catch (error) {
            console.error("User data refresh error:", error)
        }
    }
    const [payment] = usePaymentMutation()
    const [paymentSuccess] = usePaymentSuccessMutation()

    const handleSubmit = async (values: any) => {
        const data = {
            representative_secret_key: values.representative,
            channel_name: values.channel_name,
            name: values.name,
            email: values.email,
            password: values.password,
            c_password: values.c_password,
            registration_type: "on_site"
        }
        console.log(data);
        try {
            const res = await onsiteAccountReg(data).unwrap();
            if (res.status) {
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: res?.message,
                    autoClose: 2000,
                });
                router.push(`/auth/onSiteOtp?email=${values?.email}`);
            } else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: res?.message?.email?.[0] || "Something went wrong!",
                    autoClose: 2000,
                });
            }

        } catch (error: any) {

            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: error?.message,
            });

        }

        handleSetupInitialPayment();

    }

    const handleSetupInitialPayment = async () => {
        try {
            await refreshUserData()
            if (!userId) {
                throw new Error("User data not available")
            }
            const amount = priceOnSide?.data?.onsite_account_creation || "0";

            const paymentData = {
                reason: "Uploading video",
                amount: amount,
                payment_method: "pm_card_visa",
            }

            const res = await payment(paymentData).unwrap();

            const successData = {
                id: res?.data?.id,
                amount: res.data?.amount,
                reason: "Onsite account creation"
            };

            setPaymentIntentData(successData);

            const client_secret = res?.data?.client_secret;

            const { error } = await initPaymentSheet({
                merchantDisplayName: "MyTSV App",
                paymentIntentClientSecret: client_secret,
            });

            if (error) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: error?.message,
                    autoClose: 2000,
                });
            } else {
                checkout();
            }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: "Payment setup failed",
                autoClose: 2000,
            });
        }
    }

    const checkout = async () => {
        setIsProcessing(true);
        try {
            const { error } = await presentPaymentSheet();

            if (error) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: error?.message,
                    autoClose: 2000,
                });
                return;
            }

            if (!userId?.data?.id || !paymentIntentData) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: "User or payment data not available",
                    autoClose: 2000,
                });
                return;
            }

            const data = {
                user_id: userId.data.id,
                payment_intent_id: paymentIntentData.id,
                reason: paymentIntentData.reason,
                amount: paymentIntentData.amount
            }

            const res = await paymentSuccess(data).unwrap();
            console.log(res);

            // if (res?.status) {
            //     try {

            //         const res = await onsiteAccountReg(item).unwrap();
            //         if (res.status) {
            //             Toast.show({
            //                 type: ALERT_TYPE.SUCCESS,
            //                 title: 'Success',
            //                 textBody: res?.message,
            //                 autoClose: 2000,
            //             });
            //             router.push(`/auth/onSiteOtp?email=${item?.values?.email}`);
            //         } else {
            //             Toast.show({
            //                 type: ALERT_TYPE.DANGER,
            //                 title: 'Error',
            //                 textBody: res?.message?.email?.[0] || "Something went wrong!",
            //                 autoClose: 2000,
            //             });
            //         }

            //     } catch (error: any) {

            //         Toast.show({
            //             type: ALERT_TYPE.WARNING,
            //             title: 'Error',
            //             textBody: error?.message,
            //         });

            //     }
            // }
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: (error as any)?.message || "Payment processing failed",
                autoClose: 2000,
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={tw`bg-primary flex-1`}>
            <ScrollView contentContainerStyle={tw``} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={tw`p-4`}>
                    <View style={tw`flex-row justify-between items-center gap-5 px-5 mb-8`}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <View
                                style={tw`bg-primaryText w-13 h-13 p-4 rounded-full flex-row items-center justify-center border border-primaryGray`}
                            >
                                <SvgXml xml={IconBackLeft} />
                            </View>
                        </TouchableOpacity>
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
                        Our representatives are visiting local businesses like yours to offer an exclusive opportunity to join *MyTSV.com*— the payRegisterModalideo-PayRegisterModal platform connecting local services with real local customers.
                    </Text>

                    {/* <View style={tw` bg-primaryText p-3 mb-12 flex-row items-center gap-4 rounded-lg px-8`}>
                        <SvgXml xml={IconWorning} />
                        <Text style={tw`font-poppins  text-sm`}>
                            This service is currently available in select locations. Please contact us to confirm availability before signing up.
                        </Text>
                    </View> */}
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
                        <Text style={tw`text-white font-poppinsMedium text-xl mb-2 text-center `}>  One-Time Sign-Up Fee: ${priceOnSide?.data?.onsite_account_creation}</Text>
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
                    <Text style={tw`text-center font-poppins text-base`}>
                        Our representative will assist you on-site. You can pay below and they’ll handle the rest — including filming, uploading, and account setup.  You’re not just advertising. You’re being *seen in action* by real potential clients in your area.
                    </Text>
                </View>

                {/* Register Button */}
                <View style={tw`px-5 mb-10`}>
                    <TouchableOpacity
                        style={tw`flex-row items-center gap-2 py-5 bg-secondary px-4  mt-14 rounded-full justify-center`}
                        onPress={() => setPayRegisterModal(true)}
                    >
                        <Text style={tw`text-primaryText text-lg font-poppinsMedium`}>
                            Pay & register now
                        </Text>
                        <SvgXml xml={IconErowWhite} />
                    </TouchableOpacity>
                </View>

                {/* Profile Picture Modal */}
                <Modal
                    visible={payRegisterModal}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setPayRegisterModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={tw`bg-primary rounded-t-3xl w-full absolute bottom-0`}>
                            <View style={tw`bg-secondary w-full h-16 rounded-t-3xl flex-row items-center justify-between p-5`}>
                                <View></View>
                                <Text style={tw`font-poppinsMedium text-lg text-primary`}>
                                    Onsite account creation
                                </Text>
                                <TouchableOpacity onPress={() => setPayRegisterModal(false)}>
                                    <SvgXml xml={IconClose} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                contentContainerStyle={tw`pb-10`}
                                style={tw`max-h-[90%]`}
                            >
                                <Formik
                                    initialValues={{
                                        representative: "",
                                        channel_name: "",
                                        name: "",
                                        email: "",
                                        password: "",
                                        c_password: "",
                                    }}
                                    validationSchema={Yup.object({
                                        representative: Yup.string().required("Representative secret key is required"),
                                        channel_name: Yup.string().required("channel_name is required"),
                                        name: Yup.string().required("Name is required"),
                                        email: Yup.string().email().required("Email is required"),
                                        password: Yup.string()
                                            // .min(6, "Password is too sort ")
                                            .required("Password is required"),
                                        c_password: Yup.string()
                                            // .min(6, "Password is too sort ")
                                            .required("Password is required"),
                                    })}
                                    onSubmit={(values) => handleSubmit(values)}
                                >
                                    {({ values, setFieldValue, handleSubmit, errors }) => {

                                        return (
                                            <View>
                                                <View style={tw`bg-primary w-full h-full rounded-t-[40px] `}>
                                                    <View style={tw`flex-col justify-center items-center gap-4 py-6`}>
                                                        <Image
                                                            source={ImgLogo}
                                                            style={{ height: 50, width: 162, objectFit: "contain" }}
                                                        />
                                                        <Text style={tw`text-2xl font-poppinsSemiBold text-secondary`}>Create an account</Text>
                                                    </View>
                                                    {/* login from */}
                                                    <View>
                                                        {/* channel_name */}
                                                        <View style={tw`py-3 px-6`}>
                                                            <TextInput
                                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                                                                placeholder="Representative secret key"
                                                                placeholderTextColor="black"
                                                                value={values.representative}
                                                                onChangeText={(txt) =>
                                                                    setFieldValue("representative", txt)
                                                                }
                                                            />
                                                        </View>
                                                        {errors.representative && (
                                                            <Text style={tw`text-center text-red-700 font-poppins`}>
                                                                {errors.representative}
                                                            </Text>
                                                        )}
                                                        {/* channel_name */}
                                                        <View style={tw`py-3 px-6`}>
                                                            <TextInput
                                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                                                                placeholder="Channel Name"
                                                                placeholderTextColor="black"
                                                                value={values.channel_name}
                                                                onChangeText={(txt) =>
                                                                    setFieldValue("channel_name", txt)
                                                                }
                                                            />
                                                        </View>
                                                        {errors.channel_name && (
                                                            <Text style={tw`text-center text-red-700 font-poppins`}>
                                                                {errors.channel_name}
                                                            </Text>
                                                        )}
                                                        {/* name */}
                                                        <View style={tw`py-3 px-6`}>
                                                            <TextInput
                                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                                                                placeholder="name"
                                                                placeholderTextColor="black"
                                                                value={values.name}
                                                                onChangeText={(txt) => setFieldValue("name", txt)}
                                                            />
                                                        </View>
                                                        {errors.name && (
                                                            <Text style={tw`text-center text-red-700 font-poppins`}>
                                                                {errors.name}
                                                            </Text>
                                                        )}
                                                        {/* email */}
                                                        <View style={tw`py-3 px-6`}>
                                                            <TextInput
                                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                                                                placeholder="Email"
                                                                placeholderTextColor="black"
                                                                value={values.email}
                                                                onChangeText={(txt) => setFieldValue("email", txt)}
                                                            />
                                                        </View>
                                                        {errors.email && (
                                                            <Text style={tw`text-center text-red-700 font-poppins`}>
                                                                {errors.email}
                                                            </Text>
                                                        )}
                                                        {/* password */}
                                                        <View style={tw`py-3 px-6 relative`}>
                                                            <TextInput
                                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                                                                placeholder="Password"
                                                                placeholderTextColor="black"
                                                                secureTextEntry={!showNewPassword}
                                                                value={values.password}
                                                                onChangeText={(txt) => setFieldValue("password", txt)}
                                                            />
                                                            <Entypo
                                                                name={showNewPassword ? "eye" : "eye-with-line"}
                                                                style={tw`absolute right-12 top-7 `}
                                                                size={20}
                                                                color="#777"
                                                                onPress={() => setShowNewPassword(!showNewPassword)}
                                                            />
                                                        </View>
                                                        {errors.password && (
                                                            <Text style={tw`text-center text-red-700 font-poppins`}>
                                                                {errors.password}
                                                            </Text>
                                                        )}
                                                        {/* c_password */}
                                                        <View style={tw`py-3 px-6 relative`}>
                                                            <TextInput
                                                                style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                                                                placeholder="Confirm password"
                                                                placeholderTextColor="black"
                                                                secureTextEntry={!showConfirmPassword}
                                                                value={values.c_password}
                                                                onChangeText={(txt) =>
                                                                    setFieldValue("c_password", txt)
                                                                }
                                                            />
                                                            <Entypo
                                                                name={showConfirmPassword ? "eye" : "eye-with-line"}
                                                                style={tw`absolute right-12 top-7 `}
                                                                size={20}
                                                                color="#777"
                                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            />
                                                        </View>
                                                    </View>
                                                    {errors.c_password && (
                                                        <Text style={tw`text-center text-red-700 font-poppins`}>
                                                            {errors.c_password}
                                                        </Text>
                                                    )}
                                                    <TouchableOpacity
                                                        style={tw`bg-secondary rounded-full mx-6`}
                                                        onPress={() => handleSubmit()}

                                                    >
                                                        <Text
                                                            style={tw`text-primary  text-center  text-lg py-[14px] font-poppinsBold`}
                                                        >
                                                            Create account
                                                        </Text>
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        );
                                    }}
                                </Formik>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default onsiteAccount

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        height: 500,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
});

