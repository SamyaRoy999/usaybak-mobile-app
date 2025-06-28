import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconForgetNest } from "@/icons/Icon";
import { ImgLogo } from "@/assets/images/images";

// import { Image } from "expo-image";
import { Formik } from "formik";
import * as Yup from "yup";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";
const verify = () => {
  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-secondary`}>
      <ScrollView style={tw``}>
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
                onTextChange={(text) => {
                  console.log(text);
                }}
                onFilled={(text) => {
                  console.log(text);
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
              router.replace("/auth/newPass");
            }}
          >
            <Text
              style={tw`text-primary  text-center  text-lg py-4  font-poppinsBold`}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default verify;
