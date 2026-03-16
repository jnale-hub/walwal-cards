import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
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
      <View className="card-base bg-white border-[5px] border-black rounded-[32px] pt-[16%] pb-8 px-6 items-center w-full justify-between relative overflow-visible flex content-center">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressEdition}
          className="absolute -top-4 right-4 flex-row items-center border-[3px] border-black rounded-full px-3 py-1.5 z-50"
          style={{ backgroundColor: editionDetails.color }}
        >
          <Text className="font-logo text-lg text-black uppercase tracking-tighter mt-1">
            {editionDetails.name}
          </Text>
          <Text className="text-xl ml-1">{editionDetails.icon}</Text>
        </TouchableOpacity>

        <View
          className="items-center w-full"
          accessible
          accessibilityRole="header"
          accessibilityLabel="Walwal Cards"
        >
          <Text className="text-black font-logo text-[5.3rem] text-center tracking-[-5px] uppercase leading-[80px]">
            WALWAL
          </Text>

          <Text
            accessible
            accessibilityLabel="CARDS"
            className="text-black font-logo tracking-[-5px] uppercase -mt-2 text-center leading-[96px] items-start flex flex-row"
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

        <Text className="text-black text-xs tracking-[4px] uppercase mt-auto text-center">
          Drink responsibly
        </Text>
      </View>
    </AnimatedView>
  );
};
