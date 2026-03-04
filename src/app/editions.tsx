import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Edition } from "../constants/editions";
import { BG_COLORS } from "../constants/theme";
import { useDeck } from "../context/DeckContext";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function EditionsScreen() {
  const router = useRouter();
  const { editions, currentEdition, setEdition } = useDeck();
  const scaleAnims = useRef(editions.map(() => new Animated.Value(1))).current;

  const handleSelectEdition = useCallback(
    async (edition: Edition, index: number) => {
      // Animate press
      Animated.sequence([
        Animated.timing(scaleAnims[index], {
          toValue: 0.97,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnims[index], {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        }),
      ]).start();

      await setEdition(edition.id);
      router.back();
    },
    [scaleAnims, setEdition, router],
  );

  const renderEditionCard = (edition: Edition, index: number) => {
    const isSelected = currentEdition.id === edition.id;

    return (
      <AnimatedView
        key={edition.id}
        style={{
          transform: [{ scale: scaleAnims[index] }],
        }}
      >
        <TouchableOpacity
          onPress={() => handleSelectEdition(edition, index)}
          activeOpacity={0.8}
          className={`mb-3 rounded-2xl overflow-hidden bg-white/10 ${
            isSelected ? "border-2 border-white" : "border border-white/10"
          }`}
        >
          <View className="p-4 flex-row items-center">
            {/* Emoji & Info */}
            <View
              className="w-14 h-14 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: `${edition.color}30` }}
            >
              <Text className="text-3xl">{edition.emoji}</Text>
            </View>

            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-lg mr-2">
                  {edition.name}
                </Text>
                {isSelected && (
                  <View
                    className="px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: edition.color }}
                  >
                    <Text className="text-white text-[10px] font-bold">
                      SELECTED
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-white/60 text-sm" numberOfLines={1}>
                {edition.description}
              </Text>
              <Text className="text-white/40 text-xs mt-1">
                {edition.cards.length} cards •{" "}
                {getUniqueCardTypes(edition).length} categories
              </Text>
            </View>

            {/* Arrow / Check */}
            <View className="ml-2">
              {isSelected ? (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={edition.color}
                />
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="rgba(255,255,255,0.4)"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </AnimatedView>
    );
  };

  return (
    <View className="flex-1" style={{ backgroundColor: BG_COLORS[4] }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View
        className="px-6 pb-2 flex-row items-center"
        style={{
          paddingTop:
            Platform.OS === "android"
              ? (StatusBar.currentHeight || 0) + 16
              : 60,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 justify-center items-start"
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1 text-center mr-11">
          Choose Edition
        </Text>
      </View>

      {/* Current Selection Preview */}
      <View className="mx-6 mb-4 p-4 bg-white/5 rounded-2xl border border-white/10">
        <Text className="text-white/50 text-xs uppercase tracking-wider mb-2">
          Currently Playing
        </Text>
        <View className="flex-row items-center">
          <Text className="text-4xl mr-3">{currentEdition.emoji}</Text>
          <View>
            <Text className="text-white font-bold text-xl">
              {currentEdition.name}
            </Text>
            <Text className="text-white/60 text-sm">
              {currentEdition.cards.length} cards ready to play
            </Text>
          </View>
        </View>
      </View>

      {/* Subtitle */}
      <Text className="text-white/50 text-xs uppercase tracking-wider px-6 mb-3">
        All Editions
      </Text>

      {/* Edition List */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {editions.map((edition, index) => renderEditionCard(edition, index))}
      </ScrollView>
    </View>
  );
}

// Helper function to get unique card types from an edition
function getUniqueCardTypes(edition: Edition): string[] {
  const types = new Set(edition.cards.map((card) => card.type));
  return Array.from(types);
}
