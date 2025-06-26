import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconErow,
  IconErow2,
  IconForgetNest,
  IconGoogle,
  IconLogin,
} from "@/icons/Icon";
import { ImgLogo } from "@/assets/images/images";
import Entypo from "@expo/vector-icons/Entypo";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
// import { Image } from "expo-image";
import { Formik } from "formik";
import * as Yup from "yup";
const forgotPass = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-secondary`}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={Yup.object({
          email: Yup.string().email().required("email is required"),
        })}
      >
        {({ values, setFieldValue, handleSubmit, errors }) => {
          return (
            <ScrollView style={tw``}>
              <View style={tw`flex-row justify-end`}>
                <SvgXml xml={IconForgetNest} />
              </View>
              <View
                style={tw`flex-col justify-center w-full pt-44 items-center my-11`}
              >
                <Text style={tw`font-poppinsBold text-3xl  text-primaryText`}>
                  Forgot Password ?
                </Text>
                <Text
                  style={tw`text-primaryText font-poppins text-center text-base py-2 px-6`}
                >
                  Enter your email address that you provided during sign up. We
                  will send you a 6 digit code through that email.
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
                    <TextInput
                      style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                      placeholder="Email"
                      value={values.email}
                      onChangeText={(txt) => setFieldValue("email", txt)}
                    />
                  </View>
                  {errors.email && (
                    <Text style={tw`text-center text-red-700 font-poppins`}>
                      {errors.email}
                    </Text>
                  )}
                </View>

                <TouchableOpacity
                  style={tw`bg-secondary rounded-full mx-6`}
                  onPress={() => {
                    handleSubmit();
                    router.push("/auth/verify");
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
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default forgotPass;
