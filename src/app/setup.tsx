import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RNStatusBar,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ConfirmModal } from "../components/ConfirmModal";
import { GameButton } from "../components/GameButton";
import { BG_COLORS } from "../constants/theme";

export default function PlayerSetupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  // New State for Randomizing Turns
  const [isRandomTurn, setIsRandomTurn] = useState(false);

  const [showBackModal, setShowBackModal] = useState(false);

  const MAX_NAME_LENGTH = 20;
  const MAX_PLAYERS = 20;

  const handleAddPlayer = () => {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return;
    if (players.length >= MAX_PLAYERS) {
      Alert.alert("Limit Reached", "You can only add up to 20 players.");
      return;
    }
    const isDuplicate = players.some(
      (p) => p.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (isDuplicate) {
      Alert.alert("Duplicate Name", "This player is already in the list.");
      return;
    }
    setPlayers([...players, trimmedName]);
    setName("");
  };

  const handleRemovePlayer = (indexToRemove: number) => {
    setPlayers(players.filter((_, index) => index !== indexToRemove));
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      router.push({
        pathname: "/game",
        params: {
          playerList: JSON.stringify(players),
          // Pass the random preference to the next screen
          isRandomTurn: isRandomTurn ? "true" : "false",
        },
      });
    }
  };

  const handleBack = () => {
    if (players.length > 0 || name.trim().length > 0) {
      setShowBackModal(true);
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{
        backgroundColor: BG_COLORS[4],
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 60,
      }}
    >
      <ConfirmModal
        visible={showBackModal}
        title="Go Back?"
        message="You have unsaved players. Going back will clear this list."
        confirmText="Go Back"
        cancelText="Stay"
        onCancel={() => setShowBackModal(false)}
        onConfirm={() => {
          setShowBackModal(false);
          router.back();
        }}
      />

      {/* --- HEADER BAR --- */}
      <View className="flex-row items-center justify-between px-6 mb-5 h-[50px] w-full max-w-[600px] self-center">
        <TouchableOpacity
          className="w-11 h-11 justify-center items-start"
          onPress={handleBack}
          activeOpacity={0.6}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="chevron-back" size={36} color="#18181B" />
        </TouchableOpacity>

        <Text className="text-textMain font-logo text-3xl text-center flex-1">
          ADD PLAYERS
        </Text>

        <View className="w-11" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 24,
          width: "100%",
          maxWidth: 600,
          alignSelf: "center",
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Text className="text-textMain font-body text-lg text-center opacity-80 mb-6">
          Who are we drinking with today?
        </Text>

        {/* INPUT ROW */}
        <View className="flex-row mb-4">
          <TextInput
            className="text-textMain border-border font-bodyBold flex-1 bg-white h-[60px] rounded-2xl px-5 text-xl border-4 mr-3"
            placeholder={`Enter Name`}
            placeholderTextColor="rgba(24, 24, 27, 0.4)"
            value={name}
            onChangeText={setName}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
            maxLength={MAX_NAME_LENGTH}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={{
              opacity: name.trim().length === 0 ? 0.5 : 1,
            }}
            className="bg-textMain border-border w-[60px] h-[60px] rounded-2xl items-center justify-center border-4"
            onPress={handleAddPlayer}
            activeOpacity={0.8}
            disabled={name.trim().length === 0}
          >
            <Text className="font-bodyBold color-white text-3xl mt-[-4px]">
              +
            </Text>
          </TouchableOpacity>
        </View>

        {/* CONTROLS ROW: Random Toggle (Left) & Count (Right) */}
        <View className="flex-row justify-between items-center mb-4 pl-1">
          {/* Custom Checkbox */}
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsRandomTurn(!isRandomTurn)}
            activeOpacity={0.7}
          >
            <View
              className={`border-border w-6 h-6 border-4 rounded-md mr-3 items-center justify-center ${isRandomTurn ? "bg-textMain" : "bg-white"}`}
            >
              {isRandomTurn && (
                <Text className="text-white font-bold text-xs">✓</Text>
              )}
            </View>
            <Text className="text-textMain font-bodyBold text-sm opacity-80">
              Randomize Turns
            </Text>
          </TouchableOpacity>

          <Text className="text-textMain font-bodyBold opacity-60 text-sm mr-1">
            {players.length} / {MAX_PLAYERS} Players
          </Text>
        </View>

        {/* PLAYER LIST */}
        <View className="bg-white/20 rounded-[24px] p-4 border-4 border-black/10 min-h-[150px]">
          {players.length === 0 ? (
            <Text className="text-textMain text-center text-lg opacity-50 mt-10">
              No players added yet.
            </Text>
          ) : (
            <View className="flex-row flex-wrap justify-center">
              {players.map((player, index) => (
                <TouchableOpacity
                  key={`${player}-${index}`}
                  className="border-border bg-white py-2.5 pl-4 pr-3 rounded-full border-[3px] flex-row items-center m-1.5 shadow-sm"
                  onPress={() => handleRemovePlayer(index)}
                >
                  <Text className="text-textMain font-bodyBold text-lg mr-2">
                    {player}
                  </Text>
                  <View className="w-6 h-6 rounded-full bg-[#F43F5E] items-center justify-center">
                    <Text className="font-bodyBold text-white text-base mt-[-2px]">
                      ×
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View className="p-6 pb-16 w-full max-w-[600px] self-center">
        <GameButton
          onPress={players.length < 2 ? () => {} : handleStartGame}
          text={players.length < 2 ? "Need 2+ Players" : "Let's Play!"}
          style={{
            opacity: players.length < 2 ? 0.5 : 1,
            width: "100%",
          }}
          className="shadow-200"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
