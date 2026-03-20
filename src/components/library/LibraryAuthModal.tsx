import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { GameButton } from "../GameButton";

export type LibraryAuthMode = "signIn" | "signUp";

interface LibraryAuthModalProps {
  visible: boolean;
  authMode: LibraryAuthMode;
  title: string;
  infoText: string;
  authError: string | null;
  emailInput: string;
  passwordInput: string;
  confirmPasswordInput: string;
  submitting: boolean;
  isSubmitDisabled: boolean;
  primaryAuthButtonText: string;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onChangeConfirmPassword: (value: string) => void;
  onToggleAuthMode: () => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const LibraryAuthModalBase: React.FC<LibraryAuthModalProps> = ({
  visible,
  authMode,
  title,
  infoText,
  authError,
  emailInput,
  passwordInput,
  confirmPasswordInput,
  submitting,
  isSubmitDisabled,
  primaryAuthButtonText,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onToggleAuthMode,
  onSubmit,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View
        className="flex-1 bg-black/70 justify-center items-center px-4"
        accessibilityViewIsModal
        importantForAccessibility="yes"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="w-full max-w-lg"
        >
          <View className="card-base w-full items-stretch shadow-200">
            <Text
              accessibilityRole="header"
              className="text-textMain font-logo text-3xl text-center uppercase tracking-tighter"
            >
              {title}
            </Text>

            <Text className="text-textMain font-body text-sm text-center opacity-75 mb-4">
              {infoText}
            </Text>

            <TextInput
              className="text-textMain border-border font-bodyBold bg-white h-[56px] rounded-2xl px-4 text-lg border-4 mb-3"
              placeholder="Email address"
              placeholderTextColor="rgba(24, 24, 27, 0.4)"
              value={emailInput}
              onChangeText={onChangeEmail}
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!submitting}
              accessibilityLabel="Email address"
              accessibilityHint="Enter your account email"
            />

            <TextInput
              className="text-textMain border-border font-bodyBold bg-white h-[56px] rounded-2xl px-4 text-lg border-4 mb-3"
              placeholder="Password"
              placeholderTextColor="rgba(24, 24, 27, 0.4)"
              value={passwordInput}
              onChangeText={onChangePassword}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              autoComplete={authMode === "signUp" ? "new-password" : "password"}
              textContentType={
                authMode === "signUp" ? "newPassword" : "password"
              }
              editable={!submitting}
              accessibilityLabel="Password"
              accessibilityHint="Enter your account password"
            />

            {authMode === "signUp" && (
              <TextInput
                className="text-textMain border-border font-bodyBold bg-white h-[56px] rounded-2xl px-4 text-lg border-4 mb-3"
                placeholder="Confirm password"
                placeholderTextColor="rgba(24, 24, 27, 0.4)"
                value={confirmPasswordInput}
                onChangeText={onChangeConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                autoComplete="new-password"
                textContentType="newPassword"
                editable={!submitting}
                accessibilityLabel="Confirm password"
                accessibilityHint="Re-enter your password"
              />
            )}

            {authError && (
              <Text className="text-red-700 font-semibold text-sm text-center mb-2 text-pretty">
                {authError}
              </Text>
            )}

            <Pressable
              onPress={onToggleAuthMode}
              disabled={submitting}
              className="items-center mb-2"
              accessibilityRole="button"
              accessibilityLabel={
                authMode === "signUp"
                  ? "Switch to sign in"
                  : "Switch to create account"
              }
              accessibilityState={{ disabled: submitting }}
            >
              <Text className="text-textMain font-bodyBold text-sm uppercase opacity-75">
                {authMode === "signUp"
                  ? "Already have an account? Sign In"
                  : "Need an account? Create one"}
              </Text>
            </Pressable>

            <View className="w-full gap-y-2">
              <GameButton
                onPress={onSubmit}
                text={primaryAuthButtonText}
                disabled={isSubmitDisabled}
                className="w-full"
                textClassName="font-bodyBold text-xl"
                accessibilityLabel={
                  authMode === "signUp" ? "Create account" : "Sign in"
                }
              />

              <GameButton
                onPress={onCancel}
                text="Cancel"
                variant="secondary"
                disabled={submitting}
                className="w-full"
                textClassName="font-bodyBold text-xl"
                accessibilityLabel="Cancel login"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export const LibraryAuthModal = React.memo(LibraryAuthModalBase);
LibraryAuthModal.displayName = "LibraryAuthModal";
