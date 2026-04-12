import { Dimensions } from "react-native";

export const BG_COLOR_CLASSES = [
  "bg-orange-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-rose-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-violet-400",
  "bg-emerald-400",
  "bg-indigo-400",
  "bg-pink-400",
  "bg-red-400",
  "bg-fuchsia-400",
  "bg-teal-400",
  "bg-lime-400",
  "bg-blue-400",
] as const;

// Needed only where className cannot be used (meta/status bar/native stack style).
export const PRIMARY_THEME_HEX = "#fb923c";

export const SCREEN_DIMS = Dimensions.get("window");
