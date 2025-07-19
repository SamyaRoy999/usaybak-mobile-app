import {
  IconAccount,
  IconAccountActive,
  IconAdd,
  IconBlog,
  IconBlogActive,
  IconHome,
  IconHomeActive,
  IconPromotions,
  IconPromotionsActive,
} from "@/icons/Icon";
import tw from "@/lib/tailwind";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const tabLayout = () => {
  const isLoggedIn = {
    email: "samya@gmail.com"
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#EF4444",
          paddingBottom: 70,
          paddingTop: 20,
        },
      }}
    >
      <Tabs.Screen
        name="landingPage"
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconHomeActive} />
            ) : (
              <SvgXml xml={IconHome} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Blogs"
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconBlogActive} />
            ) : (
              <SvgXml xml={IconBlog} />
            );
          },
        }}
      />
      {isLoggedIn.email  && (
        <Tabs.Screen
          name="AddModal"
          options={{
            headerShown: false,
            tabBarIcon() {
              return (
                <LinearGradient
                  colors={["#EF4444", "#FF6868"]}
                  style={tw`p-5 mb-20 absolute rounded-full shadow-2xl`}
                >
                  <SvgXml xml={IconAdd} />
                </LinearGradient>
              );
            },
          }}
        />
      )}

      <Tabs.Screen
        name="Promotions"
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconPromotionsActive} />
            ) : (
              <SvgXml xml={IconPromotions} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return props.focused ? (
              <SvgXml xml={IconAccountActive} />
            ) : (
              <SvgXml xml={IconAccount} />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default tabLayout;
