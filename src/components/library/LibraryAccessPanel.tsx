import React from "react";
import { Pressable, Text, View } from "react-native";

interface LibraryAccessPanelProps {
  isAuthenticated: boolean;
  userEmail: string | null;
  disabled: boolean;
  onPressAction: () => void;
}

const LibraryAccessPanelBase: React.FC<LibraryAccessPanelProps> = ({
  isAuthenticated,
  userEmail,
  disabled,
  onPressAction,
}) => {
  const actionText = isAuthenticated ? "Sign Out" : "Sign In";

  return (
    <View className="mb-4 px-2">
      <View className="flex-row items-center justify-center gap-x-1">
        {isAuthenticated && userEmail ? (
          <Text
            className="text-neutral-950 font-body text-sm text-center opacity-70 shrink max-w-[72%]"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {userEmail}
          </Text>
        ) : (
          <Text className="text-neutral-950 font-body text-sm text-center opacity-75">
            All cards are free.
          </Text>
        )}

        <Pressable
          onPress={onPressAction}
          disabled={disabled}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={isAuthenticated ? "Sign out" : "Sign in"}
          accessibilityHint={
            isAuthenticated
              ? "Signs out from your current account"
              : "Opens the sign-in form"
          }
          accessibilityState={{ disabled }}
        >
          <Text
            className={`font-semibold text-sm underline ${
              disabled ? "text-neutral-950/45" : "text-neutral-950"
            }`}
          >
            {actionText}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const LibraryAccessPanel = React.memo(LibraryAccessPanelBase);
LibraryAccessPanel.displayName = "LibraryAccessPanel";
