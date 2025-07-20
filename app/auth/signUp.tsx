import { ImgLogo } from "@/assets/images/images";
import {
  IconErow,
  IconErow2,
  IconGoogle,
  IconSignUpNest
} from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { useRegisterUserMutation } from "@/redux/apiSlices/authApiSlices";
import Entypo from "@expo/vector-icons/Entypo";
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
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";

const signUp = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);

  const [registerUser] = useRegisterUserMutation()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={tw`flex-1 bg-secondary`}
    // keyboardVerticalOffset={false}
    >
      <AlertNotificationRoot>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={{
              channel_name: "",
              name: "",
              email: "",
              password: "",
              c_password: "",
            }}
            validationSchema={Yup.object({
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
            onSubmit={async (values) => {
              const data = {
                channel_name: values.channel_name,
                name: values.name,
                email: values.email,
                password: values.password,
                c_password: values.c_password,
              }
              console.log(data);
              try {

                const res = await registerUser(data).unwrap();

                if (res.status) {
                  Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: res?.message,
                    autoClose: 2000,
                  });

                  router?.push(`/auth/verify`);
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

                console.log(error);
              }
            }}
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
      </AlertNotificationRoot>
    </KeyboardAvoidingView>
  );
};

export default signUp;
