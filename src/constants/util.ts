import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const isSmallDevice = width < 380 || height < 700;

