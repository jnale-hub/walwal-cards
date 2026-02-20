import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SCREEN_DIMS } from "../constants/theme";

type EmojiGridProps = {
  emoji: string;
  cellSize?: number;
  margin?: number;
};

export const EmojiGrid: React.FC<EmojiGridProps> = ({
  emoji,
  cellSize = 100,
  margin = 5,
}) => {
  const grid = useMemo(() => {
    const numRows = Math.ceil(SCREEN_DIMS.height / cellSize) + 4;
    const numCols = Math.ceil(SCREEN_DIMS.width / cellSize) + 4;

    return Array.from({ length: numRows }).map((_, row) => (
      <View key={`r-${row}`} style={styles.row}>
        {Array.from({ length: numCols }).map((_, col) => (
          <View
            key={`c-${row}-${col}`}
            style={[
              styles.cell,
              {
                margin,
                transform: [
                  { rotate: (row + col) % 2 === 0 ? "-15deg" : "15deg" },
                ],
              },
            ]}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </View>
        ))}
      </View>
    ));
  }, [emoji, cellSize, margin]);

  return <>{grid}</>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  cell: {},
  emoji: {
    fontSize: 48,
    opacity: 0.9,
  },
});

export default EmojiGrid;
