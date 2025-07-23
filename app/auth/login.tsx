import { ImgLogo } from "@/assets/images/images";
import { IconErow, IconErow2, IconGoogle, IconLogin } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useLoginUserMutation } from "@/redux/apiSlices/authApiSlices";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";
const login = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const [loginUser, loginResults] = useLoginUserMutation()
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-secondary`}
    >
      <ScrollView>
        <AlertNotificationRoot>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {           
              try {
                const res = await loginUser(values).unwrap();
                if (res.status) {
                   AsyncStorage.setItem("token", res?.data?.access_token);
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: res?.message,
                    autoClose: 2000,
                  });
                  setTimeout(() => {
                    router?.push(`/home/(tabs)/landingPage`);
                  }, 1000);
                } else {
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Waring',
                    textBody: res?.message?.email?.[0] || "Something went wrong!",
                    autoClose: 2000,
                  });
                }

              } catch (error: any) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: 'Waring',
                  textBody: error?.message,
                });

              
              }
            }}

            validationSchema={Yup.object({
              email: Yup.string().email().required("email is required"),
              password: Yup.string()
                // .min(6, "Password is too sort ")
                .required("email is required")
                .uppercase("1 lowercase letter added"),
            })}
          >
            {({ values, setFieldValue, handleSubmit, errors }) => {
              return (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <SvgXml xml={IconLogin} />
                  <View
                    style={tw`flex-col justify-center w-full items-center my-11`}
                  >
                    <Text style={tw`font-poppinsBold text-3xl  text-primaryText`}>
                      Welcome back
                    </Text>
                    <Text style={tw`text-primaryText font-poppins text-sm py-1`}>
                      Use your credentials to login
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
                      <View style={tw`py-3 px-6`}>
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
                      <View style={tw`py-3 px-6 relative`}>
                        <TextInput
                          style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                          placeholder="Password"
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
                    </View>
                    {errors.password && (
                      <Text style={tw`text-center text-red-700 font-poppins`}>
                        {errors.password}
                      </Text>
                    )}
                    <View
                      style={tw`py-7  px-7 flex-row justify-between items-center`}
                    >
                      <View style={tw`flex-row items-center gap-2`}>
                        <Checkbox
                          value={isChecked}
                          onValueChange={setChecked}
                          color={isChecked ? "#EF4444" : undefined}
                        />
                        <Text style={tw`text-base font-poppins font-normal `}>
                          Remember me
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => router.push("/auth/forgotPass")}
                      >
                        <Text
                          style={tw`text-base font-poppins font-normal text-secondary`}
                        >
                          Forgot password
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={tw`bg-secondary rounded-full mx-6`}
                      onPress={() => {
                      
                        handleSubmit();
                        // router.replace("/home/(tabs)/landingPage");
                      }}
                    >
                      <Text
                        style={tw`text-primary  text-center  text-lg py-[14px] font-poppinsBold`}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={tw` rounded-full mx-6 my-5 flex-row justify-between items-center border border-primaryGray px-7`}
                    >
                      <View style={tw`flex-row items-center gap-3`}>
                        <SvgXml xml={IconGoogle} />
                        <Text style={tw`text-base py-[14px] font-poppins`}>
                          Continue with Google
                        </Text>
                      </View>
                      <SvgXml xml={IconErow} />
                    </TouchableOpacity>
                    <View style={tw`flex-row justify-center gap-3`}>
                      <Text style={tw` text-base font-poppinsMedium`}>
                        Don’t have an account ?
                      </Text>
                      <TouchableOpacity
                        onPress={() => router.push("/auth/signUp")}
                        style={tw`flex-row items-center gap-1`}
                      >
                        <Text style={tw` text-base font-poppinsMedium`}>
                          Sign Up
                        </Text>
                        <SvgXml xml={IconErow2} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              );
            }}
          </Formik>
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

export default login;
