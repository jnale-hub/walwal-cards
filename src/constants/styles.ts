import { Platform, StyleSheet } from "react-native";
import { LAYOUT, THEME } from "./theme";

export const SHARED_STYLES = StyleSheet.create({
  cardBase: {
    backgroundColor: THEME.cardBg,
    borderRadius: 32,
    borderWidth: 6,
    borderColor: THEME.border,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: Platform.OS === 'android' ? 0 : 10,
  },
  cardDimensions: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    aspectRatio: LAYOUT.cardWidth / LAYOUT.cardHeight,
  },
});
