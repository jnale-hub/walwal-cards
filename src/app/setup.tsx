import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreenHeader } from "../components/AppScreenHeader";
import { ConfirmModal } from "../components/ConfirmModal";
import { GameButton } from "../components/GameButton";
import { SetupControlsRow } from "../components/setup/SetupControlsRow";
import { SetupInputRow } from "../components/setup/SetupInputRow";
import { SetupPlayersList } from "../components/setup/SetupPlayersList";

export default function PlayerSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
      className="flex-1 bg-green-400/80"
      style={{
        paddingTop: Math.max(insets.top, 20),
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

      <AppScreenHeader
        title="ADD PLAYERS"
        onBack={handleBack}
        backHint="Returns to the previous screen"
        backHitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      />

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
        <Text className="text-neutral-950 font-body text-lg text-center opacity-80 mb-6">
          Who are we drinking with today?
        </Text>

        <SetupInputRow
          name={name}
          maxNameLength={MAX_NAME_LENGTH}
          onChangeName={setName}
          onAddPlayer={handleAddPlayer}
        />

        <SetupControlsRow
          isRandomTurn={isRandomTurn}
          playerCount={players.length}
          maxPlayers={MAX_PLAYERS}
          onToggleRandomTurn={() => setIsRandomTurn(!isRandomTurn)}
        />

        <SetupPlayersList
          players={players}
          onRemovePlayer={handleRemovePlayer}
        />
      </ScrollView>

      <View className="pb-16 w-full items-center justify-end py-6 min-h-[80px]">
        <GameButton
          onPress={handleStartGame}
          text={players.length < 2 ? "Need 2+ Players" : "Let's Play!"}
          disabled={players.length < 2}
          accessibilityLabel={
            players.length < 2
              ? "Need at least two players to start"
              : "Let's play"
          }
          accessibilityHint={
            players.length < 2
              ? "Add at least one more player"
              : "Starts the game with your current players"
          }
          style={{
            width: "100%",
          }}
          className="w-full max-w-80 shadow-200"
          textClassName="font-bold text-2xl font-bodyBold"
        />
      </View>
    </KeyboardAvoidingView>
  );
}
