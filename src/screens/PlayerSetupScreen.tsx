import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { GameButton } from "../components/GameButton";
import { ConfirmModal } from "../components/ConfirmModal";
import { THEME, BG_COLORS } from "../constants/theme";

export const PlayerSetupScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
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
      (p) => p.toLowerCase() === trimmedName.toLowerCase()
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
    if (players.length > 0) {
      router.push({
        pathname: "/game",
        params: { playerList: JSON.stringify(players) },
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
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.6}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

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

      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Add Players</Text>
        <Text style={styles.subtitleText}>Who are we drinking with today?</Text>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
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
            style={[
              styles.addButton,
              // Visual feedback if input is invalid
              { opacity: name.trim().length === 0 ? 0.5 : 1 },
            ]}
            onPress={handleAddPlayer}
            activeOpacity={0.8}
            disabled={name.trim().length === 0}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Player Count Indicator (Optional UX improvement) */}
        <Text style={styles.counterText}>
          {players.length} / {MAX_PLAYERS} Players
        </Text>

        {/* Player List */}
        <View style={styles.listContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {players.length === 0 ? (
              <Text style={styles.emptyText}>No players added yet.</Text>
            ) : (
              <View style={styles.chipContainer}>
                {players.map((player, index) => (
                  <TouchableOpacity
                    key={`${player}-${index}`}
                    style={styles.playerChip}
                    onPress={() => handleRemovePlayer(index)}
                  >
                    <Text style={styles.playerText}>{player}</Text>
                    <View style={styles.removeIcon}>
                      <Text style={styles.removeIconText}>×</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <GameButton
            onPress={handleStartGame}
            text={players.length < 2 ? "Need 2+ Players" : "Let's Play!"}
            style={{
              opacity: players.length < 2 ? 0.5 : 1,
              width: "100%",
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLORS[4],
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 100,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    top: 54,
    left: 24,
    zIndex: 100,
  },
  backButtonText: {
    fontSize: 36,
    fontWeight: "900",
    color: THEME.textMain,
    includeFontPadding: false,
    lineHeight: 36,
  },
  titleText: {
    fontSize: 42,
    fontWeight: "900",
    color: THEME.textMain,
    textAlign: "center",
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 18,
    color: THEME.textMain,
    textAlign: "center",
    fontWeight: "500",
    opacity: 0.8,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    height: 60,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "600",
    color: THEME.textMain,
    borderWidth: 4,
    borderColor: THEME.border,
    marginRight: 12,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: THEME.textMain,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: THEME.border,
  },
  addButtonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -4,
  },
  counterText: {
    textAlign: "right",
    color: THEME.textMain,
    opacity: 0.6,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
    marginRight: 4,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    marginBottom: 24,
    padding: 16,
    borderWidth: 4,
    borderColor: "rgba(24, 24, 27, 0.1)",
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: "center",
    color: THEME.textMain,
    fontSize: 18,
    opacity: 0.5,
    marginTop: 40,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  playerChip: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: THEME.border,
    flexDirection: "row",
    alignItems: "center",
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 2,
  },
  playerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: THEME.textMain,
    marginRight: 8,
  },
  removeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F43F5E",
    alignItems: "center",
    justifyContent: "center",
  },
  removeIconText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -2,
  },
  footer: {
    marginBottom: 20,
  },
});
