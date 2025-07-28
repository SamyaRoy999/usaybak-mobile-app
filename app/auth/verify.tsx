import { ImgLogo } from "@/assets/images/images";
import { IconForgetNest } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";

// import { Image } from "expo-image";
import { useVerifyOtpMutation } from "@/redux/apiSlices/authApiSlices";
import { router, useLocalSearchParams } from "expo-router";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { OtpInput } from "react-native-otp-entry";
const verify = () => {

  const [verifyOtp] = useVerifyOtpMutation()
  const { email } = useLocalSearchParams();


  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-secondary`}>
      <ScrollView showsVerticalScrollIndicator={false} style={tw``}>
        <AlertNotificationRoot>
          <View style={tw`flex-row justify-end`}>
            <SvgXml xml={IconForgetNest} />
          </View>
          <View
            style={tw`flex-col justify-center w-full pt-44 items-center my-11`}
          >
            <Text style={tw`font-poppinsBold text-3xl  text-primaryText`}>
              Verify Code
            </Text>
            <Text
              style={tw`text-primaryText font-poppins text-center text-sm py-2 px-6`}
            >
              Enter the 6 digit code that we sent you to your provided email.
            </Text>
          </View>
          <View style={tw`bg-primary w-full h-full rounded-t-[40px] `}>
            <View style={tw`flex-row justify-center `}>
              <Image
                source={ImgLogo}
                style={{ height: 100, width: 162, objectFit: "contain" }}
              />
            </View>
            {/* login from */}
            <View>
              <View style={tw`py-3 px-6 mb-2`}>
                <OtpInput
                  numberOfDigits={6}
                  onTextChange={async (text) => {
                  }}
                  onFilled={async (otp) => {

                    try {
                      const data = {
                        email: email as string,
                        otp,
                      }
                      const res = await verifyOtp(data).unwrap();
                      if (res.status) {
                        Toast.show({
                          type: ALERT_TYPE.SUCCESS,
                          title: 'Success',
                          textBody: res?.message ,
                          autoClose: 2000,
                        });
                        setTimeout(() => {
                          router.push(`/auth/newPass?email=${email}`);
                        }, 1000);
                      } else {
                        Toast.show({
                          type: ALERT_TYPE.DANGER,
                          title: 'Error',
                          textBody: res?.message ,
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
                  }}
                  // onBlur={handleBlur("otp")}
                  theme={{
                    pinCodeContainerStyle: {
                      width: 50,
                      height: 50,
                      borderWidth: 1,
                      borderRadius: 9999,
                    },
                    pinCodeTextStyle: {
                      fontSize: 20,
                      fontWeight: "bold",
                    },
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              style={tw`bg-secondary rounded-full mx-6`}
              onPress={() => {

              }}
            >
              <Text
                style={tw`text-primary  text-center  text-lg py-4  font-poppinsBold`}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default verify;
