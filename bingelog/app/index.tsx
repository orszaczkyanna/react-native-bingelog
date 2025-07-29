// Onboarding Screen

import React from "react";
import { Image, Text } from "react-native";
import { Link, useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Logo from "@/components/Logo";
import CTAButton from "@/components/CTAButton";
import images from "@/constants/images";
import ScrollScreenWrapper from "@/components/ScrollScreenWrapper";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

import SecondaryButton from "@/components/SecondaryButton"; // for testing

const index = () => {
  // useRouter() is preferred for navigation inside components
  const router = useRouter();

  useRedirectIfAuthenticated();

  return (
    <ScreenWrapper>
      <ScrollScreenWrapper viewClassName="gap-y-4">
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
          onPress={() => router.push("/sign-up")}
          // (auth) is a layout group folder, so it doesn't appear in the route path
          pressableClassName="my-4"
        />

        {/* Temporary link to Home for testing */}
        <SecondaryButton title="Home" onPress={() => router.push("/home")} />

        <Text className="text-foreground-secondary font-nunitoRegular text-sm">
          Illustrations by{" "}
          <Link href="https://storyset.com/" className="text-accent">
            Storyset
          </Link>
        </Text>
      </ScrollScreenWrapper>
    </ScreenWrapper>
  );
};

export default index;
