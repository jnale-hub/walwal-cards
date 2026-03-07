import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const isSmallDevice = width < 380 || height < 700;

/**
 * Returns a platform-safe line height multiplier or exact value.
 * Used to fix iOS font clipping on display fonts (like Roboto Condensed)
 * while keeping web line heights fluid.
 */
export const getResponsiveLineHeight = (nativeAbsoluteValue: number) => {
  return Platform.OS === "web" ? ("1.2" as any) : nativeAbsoluteValue;
};
