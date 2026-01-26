import { StyleSheet } from "react-native";
import { LAYOUT, THEME } from "./theme";

export const SHARED_STYLES = StyleSheet.create({
  cardBase: {
    backgroundColor: THEME.cardBg,
    borderRadius: 24,
    borderWidth: 6,
    borderColor: THEME.textMain,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,

    shadowColor: THEME.textMain,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 0,
  },
  cardDimensions: {
    width: LAYOUT.cardWidth,
    height: LAYOUT.cardHeight,
    aspectRatio: LAYOUT.cardWidth / LAYOUT.cardHeight,
  },
});
