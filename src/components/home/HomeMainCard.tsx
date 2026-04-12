import React from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";
import type { EditionDisplay } from "../../constants/edition";

const AnimatedView = Animated.createAnimatedComponent(View);

interface HomeMainCardProps {
  flipInterpolate: Animated.AnimatedInterpolation<string | number>;
  editionDetails: EditionDisplay;
  onPressEdition: () => void;
}

export const HomeMainCard: React.FC<HomeMainCardProps> = ({
  flipInterpolate,
  editionDetails,
  onPressEdition,
}) => {
  return (
    <AnimatedView
      style={[
        {
          width: "100%",
          maxWidth: 400,
          transform: [{ perspective: 1000 }, { rotateY: flipInterpolate }],
        },
      ]}
      className="items-center justify-center shrink mb-4"
    >
      <View className="card-base pt-[16%] pb-8 px-6 items-center w-full justify-between relative flex content-center overflow-hidden">
        <View className="absolute top-4 -right-16 z-50 rotate-[36deg] w-56">
          <View className="absolute top-1 left-1 right-[-1px] bottom-[-1px] bg-neutral-950" />
          <Pressable
            onPress={onPressEdition}
            accessibilityRole="button"
            accessibilityLabel={`${editionDetails.name} edition`}
            accessibilityHint="Open library to change card edition"
            className={`relative flex-row items-center border-[3px] border-neutral-950 px-2 py-1 press-motion ${editionDetails.bgClass}`}
          >
            <Text className="font-logo text-lg text-neutral-950 uppercase mx-auto">
              {editionDetails.name}
            </Text>
          </Pressable>
        </View>

        <View
          className="items-center w-full"
          accessible
          accessibilityRole="header"
          accessibilityLabel="Walwal Cards"
        >
          <Text className="text-neutral-950 font-logo text-[5.3rem] text-center tracking-[-5px] uppercase leading-[80px]">
            WALWAL
          </Text>

          <Text
            accessible
            accessibilityLabel="CARDS"
            className="text-neutral-950 font-logo tracking-[-5px] uppercase -mt-2 text-center leading-[96px] items-start flex flex-row"
          >
            <Text className="text-[7rem] -mr-0.5">C</Text>
            <Text className="text-8xl -mr-0.5">ARD</Text>
            <Text className="text-[7rem]">S</Text>
          </Text>
        </View>

        <View className="flex-row items-center justify-center -mt-6 w-full shrink">
          <Image
            source={require("../../../assets/images/beer.png")}
            className="-mr-12"
            resizeMode="contain"
            accessible={false}
            style={{
              width: 160,
              height: 160,
            }}
          />
          <Image
            source={require("../../../assets/images/laughing-face.png")}
            className="z-10"
            resizeMode="contain"
            accessible={false}
            style={{
              width: 160,
              height: 160,
            }}
          />
        </View>

        <Text className="text-neutral-950 text-xs tracking-[4px] uppercase mt-auto text-center">
          Drink responsibly
        </Text>
      </View>
    </AnimatedView>
  );
};
