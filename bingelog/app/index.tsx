// Onboarding Screen

import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Logo from "@/components/Logo";
import CTAButton from "@/components/CTAButton";
import images from "@/constants/images";

const index = () => {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* flexGrow: 1 to allow ScrollView content to expand and scroll naturally
            height: "100%" can break scrolling*/}
        <View className="w-full min-h-[85vh] items-center gap-y-4">
          <Logo />

          <Image
            source={images.onboardingHero}
            resizeMode="contain"
            className="w-80 h-80"
          />

          <Text className="text-foreground font-ralewayBold text-3xl">
            Your Personal Watchlist
          </Text>

          {/* Text supports nesting */}
          <Text className="text-body text-center">
            <Text className="text-accent">BingeLog</Text> helps you track what
            you've watched, what you're watching, and what's next.
          </Text>

          <CTAButton
            title="Get Started"
            onPress={() => console.log("Get Started")}
          />

          <Text className="text-foreground-secondary font-nunitoRegular text-sm">
            Illustrations by{" "}
            <Link href="https://storyset.com/" className="text-accent">
              Storyset
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default index;
