import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import {
  IconErow,
  IconErow2,
  IconGoogle,
  IconLogin,
  IconSignUpNest,
} from "@/icons/Icon";
import { ImgLogo } from "@/assets/images/images";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

const login = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={tw`flex-1 bg-secondary`}
      // keyboardVerticalOffset={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            channel_name: "",
            name: "",
            email: "",
            password: "",
            confirm_password: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={Yup.object({
            channel_name: Yup.string().required("Channel_name is required"),
            name: Yup.string().required("Name is required"),
            email: Yup.string().email().required("Email is required"),
            password: Yup.string()
              .min(6, "Password is too sort ")
              .required("Password is required")
              .uppercase("1 lowercase letter added"),
            confirm_password: Yup.string()
              .min(6, "Password is too sort ")
              .required("Password is required"),
          })}
        >
          {({ values, setFieldValue, handleSubmit, errors }) => {
            return (
              <View>
                <View style={tw`flex-row justify-end`}>
                  <SvgXml xml={IconSignUpNest} />
                </View>
                <View
                  style={tw`flex-col justify-center w-full items-center mb-4`}
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
                    {/* channel_name */}
                    <View style={tw`py-3 px-6`}>
                      <TextInput
                        style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                        placeholder="Channel Name"
                        value={values.channel_name}
                        onChangeText={(txt) =>
                          setFieldValue("channel_name", txt)
                        }
                      />
                    </View>
                    {errors.email && (
                      <Text style={tw`text-center text-red-700 font-poppins`}>
                        {errors.email}
                      </Text>
                    )}
                    {/* name */}
                    <View style={tw`py-3 px-6`}>
                      <TextInput
                        style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                        placeholder="name"
                        value={values.name}
                        onChangeText={(txt) => setFieldValue("name", txt)}
                      />
                    </View>
                    {errors.email && (
                      <Text style={tw`text-center text-red-700 font-poppins`}>
                        {errors.email}
                      </Text>
                    )}
                    {/* email */}
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
                    {/* password */}
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
                    {/* confirm_password */}
                    <View style={tw`py-3 px-6 relative`}>
                      <TextInput
                        style={tw`border border-primaryGray rounded-full font-poppins text-base px-5 h-14`}
                        placeholder="Confirm password"
                        secureTextEntry={!showNewPassword}
                        value={values.confirm_password}
                        onChangeText={(txt) =>
                          setFieldValue("confirm_password", txt)
                        }
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
                      Sign up
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
                      onPress={() => router.push("/auth/login")}
                      style={tw`flex-row items-center gap-1`}
                    >
                      <Text style={tw` text-base font-poppinsMedium`}>
                        Sign In
                      </Text>
                      <SvgXml xml={IconErow2} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default login;
