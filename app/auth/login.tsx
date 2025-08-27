import { ImgLogo } from "@/assets/images/images";
import { IconErow2, IconLogin } from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useLoginUserMutation } from "@/redux/apiSlices/authApiSlices";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
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
  const [loginUser, loginResults] = useLoginUserMutation();


  const focusNextField = (nextField: any) => {
    nextField?.current?.focus();
  };

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);


  return (
    <KeyboardAvoidingView
      style={tw`flex-1 `}
      enabled={true}
      behavior={"padding"}
    >
      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center dark:bg-base-dark  bg-base-light `}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw` bg-secondary`}>
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
                  .required("Password is required"),
                // .min(8, "Password must be at least 8 characters long")
                // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                // .matches(/[0-9]/, "Password must contain at least one number")
                // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
              })}
            >
              {({ values, setFieldValue, handleSubmit, errors }) => {
                return (

                  <View>
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
                    <View style={tw`bg-primary w-full min-h-full rounded-t-[40px] pb-10`}>
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
                            ref={emailRef}
                            style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                            placeholder="Email"
                            placeholderTextColor="black"
                            value={values.email}
                            onChangeText={(txt) => setFieldValue("email", txt)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField(passwordRef)}

                          />
                        </View>
                        {errors.email && (
                          <Text style={tw`text-center text-red-700 font-poppins`}>
                            {errors.email}
                          </Text>
                        )}
                        <View style={tw`py-3 px-6 relative`}>
                          <TextInput
                            ref={passwordRef}
                            style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                            placeholder="Password"
                            placeholderTextColor="black"
                            secureTextEntry={!showNewPassword}
                            value={values.password}
                            onChangeText={(txt) => setFieldValue("password", txt)}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit}
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
                        }}
                      >
                        <Text
                          style={tw`text-primary  text-center  text-lg py-[14px] font-poppinsBold`}
                        >
                          Login
                        </Text>
                      </TouchableOpacity>
                      <View style={tw`flex-row justify-center gap-3 pb-10`}>
                        <Text style={tw` text-base font-poppinsMedium`}>
                          Don't have an account ?
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
                  </View>
                )
              }}
            </Formik>
          </AlertNotificationRoot>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default login;