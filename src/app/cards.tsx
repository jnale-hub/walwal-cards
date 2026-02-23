import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BG_COLORS } from "../constants/theme";
import { Card, useDeck } from "../context/DeckContext";

export default function CardsScreen() {
  const router = useRouter();
  const { deck, addCard, updateCard, deleteCard, resetDeck } = useDeck();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const [type, setType] = useState("");
  const [prompt, setPrompt] = useState("");
  const [emoji, setEmoji] = useState("");

  const openAddModal = () => {
    setEditingCard(null);
    setType("Custom");
    setPrompt("");
    setEmoji("🃏");
    setIsModalVisible(true);
  };

  const openEditModal = (card: Card) => {
    setEditingCard(card);
    setType(card.type);
    setPrompt(card.prompt);
    setEmoji(card.emoji);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (!prompt.trim()) return;

    if (editingCard) {
      updateCard(editingCard.id, { type, prompt, emoji });
    } else {
      addCard({ type, prompt, emoji });
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteCard(id);
  };

  const renderItem = ({ item }: { item: Card }) => (
    <View className="bg-white/10 p-4 rounded-xl mb-3 flex-row items-center justify-between">
      <View className="flex-1 mr-4">
        <View className="flex-row items-center mb-1">
          <Text className="text-2xl mr-2">{item.emoji}</Text>
          <Text className="text-white font-bold text-lg">{item.type}</Text>
        </View>
        <Text className="text-white/80 text-base">{item.prompt}</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => openEditModal(item)}
          className="bg-blue-500 p-2 rounded-lg mr-2"
        >
          <Text className="text-white font-bold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="bg-red-500 p-2 rounded-lg"
        >
          <Text className="text-white font-bold">Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: BG_COLORS[4] }}>
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 justify-center items-start"
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="chevron-back" size={36} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold">Manage Cards</Text>
          <TouchableOpacity
            onPress={openAddModal}
            className="bg-white px-4 py-2 rounded-full"
          >
            <Text className="text-black font-bold">+ Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={deck}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          onPress={resetDeck}
          className="bg-red-600 p-4 rounded-xl mt-4 mb-8 items-center"
        >
          <Text className="text-white font-bold text-lg">
            Reset to Default Deck
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end bg-black/50"
        >
          <View className="bg-zinc-900 p-6 rounded-t-3xl">
            <Text className="text-white text-2xl font-bold mb-6">
              {editingCard ? "Edit Card" : "New Card"}
            </Text>

            <Text className="text-white/70 mb-2">Card Type</Text>
            <TextInput
              value={type}
              onChangeText={setType}
              className="bg-white/10 text-white p-4 rounded-xl mb-4"
              placeholder="e.g. Dare or Shot"
              placeholderTextColor="#999"
            />

            <Text className="text-white/70 mb-2">Prompt</Text>
            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              className="bg-white/10 text-white p-4 rounded-xl mb-4"
              placeholder="What's the dare/question?"
              placeholderTextColor="#999"
              multiline
            />

            <Text className="text-white/70 mb-2">Emoji</Text>
            <TextInput
              value={emoji}
              onChangeText={setEmoji}
              className="bg-white/10 text-white p-4 rounded-xl mb-6"
              placeholder="e.g. 🍻"
              placeholderTextColor="#999"
              maxLength={2}
            />

            <View className="flex-row justify-end space-x-4">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="px-6 py-3 rounded-xl bg-white/10"
              >
                <Text className="text-white font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="px-6 py-3 rounded-xl bg-orange-500"
              >
                <Text className="text-white font-bold">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
