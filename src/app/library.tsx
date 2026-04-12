import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppScreenHeader } from "../components/AppScreenHeader";
import { LibraryAccessPanel } from "../components/library/LibraryAccessPanel";
import {
  LibraryAuthModal,
  type LibraryAuthMode,
} from "../components/library/LibraryAuthModal";
import { LibraryEditionCard } from "../components/library/LibraryEditionCard";
import { LibraryEmptyState } from "../components/library/LibraryEmptyState";
import {
  canAccessEdition,
  resolveEditionDisplay,
  sortEditionsByCardCount,
} from "../constants/edition";
import { useAuth } from "../lib/AuthContext";
import { useCards } from "../lib/CardsContext";

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const MIN_PASSWORD_LENGTH = 8;
const DEFAULT_MODAL_INFO_TEXT = "All cards are free, sign in to unlock.";

export default function LibraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { allCards, editions, currentEdition, setEdition } = useCards();
  const {
    isAuthenticated,
    userEmail,
    loading: authLoading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingEditionId, setPendingEditionId] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<LibraryAuthMode>("signIn");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (userEmail) {
      setEmailInput(userEmail);
    }
  }, [userEmail]);

  const navigateBackToHome = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }, [router]);

  const cardCountByEdition = useMemo(() => {
    return allCards.reduce<Record<string, number>>((accumulator, card) => {
      if (!card.edition_id) return accumulator;

      accumulator[card.edition_id] = (accumulator[card.edition_id] ?? 0) + 1;

      return accumulator;
    }, {});
  }, [allCards]);

  const sortedEditions = useMemo(() => {
    return sortEditionsByCardCount(editions, cardCountByEdition);
  }, [editions, cardCountByEdition]);

  const editionDisplayById = useMemo<
    Record<string, ReturnType<typeof resolveEditionDisplay>>
  >(() => {
    return editions.reduce<
      Record<string, ReturnType<typeof resolveEditionDisplay>>
    >((accumulator, edition) => {
      accumulator[edition.id] = resolveEditionDisplay(edition.id, [edition]);
      return accumulator;
    }, {});
  }, [editions]);

  const pendingEditionName = useMemo(() => {
    if (!pendingEditionId) return "this deck";
    return (
      editionDisplayById[pendingEditionId]?.name ??
      resolveEditionDisplay(pendingEditionId, editions).name
    );
  }, [editionDisplayById, editions, pendingEditionId]);

  const normalizedEmail = emailInput.trim().toLowerCase();
  const isEmailReady = isValidEmail(normalizedEmail);
  const isSubmitDisabled =
    submitting ||
    authLoading ||
    !isEmailReady ||
    passwordInput.length === 0 ||
    (authMode === "signUp" && confirmPasswordInput.length === 0);
  const primaryAuthButtonText = submitting
    ? authMode === "signUp"
      ? "Creating..."
      : "Signing In..."
    : authMode === "signUp"
      ? "Create Account"
      : "Sign In";
  const isAuthActionDisabled = submitting || authLoading;

  const modalInfoText = infoMessage ?? DEFAULT_MODAL_INFO_TEXT;

  const resetAuthFields = useCallback(
    (nextMode: LibraryAuthMode = "signIn") => {
      setPasswordInput("");
      setConfirmPasswordInput("");
      setAuthMode(nextMode);
      setInfoMessage(null);
      setAuthError(null);
    },
    [],
  );

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
    setPendingEditionId(null);
    resetAuthFields();
  }, [resetAuthFields]);

  const openLoginModal = useCallback(
    (editionId?: string) => {
      setPendingEditionId(editionId ?? null);
      resetAuthFields("signIn");
      setShowLoginModal(true);
    },
    [resetAuthFields],
  );

  const switchAuthMode = useCallback(
    (nextMode: LibraryAuthMode) => {
      resetAuthFields(nextMode);
    },
    [resetAuthFields],
  );

  const toggleAuthMode = useCallback(() => {
    switchAuthMode(authMode === "signIn" ? "signUp" : "signIn");
  }, [authMode, switchAuthMode]);

  const completeUnlockFlow = useCallback(async () => {
    const editionToUnlock = pendingEditionId;
    closeLoginModal();

    if (editionToUnlock) {
      await setEdition(editionToUnlock);
      navigateBackToHome();
    }
  }, [closeLoginModal, navigateBackToHome, pendingEditionId, setEdition]);

  const handleSubmitEmailAuth = useCallback(async () => {
    const password = passwordInput;
    const confirmPassword = confirmPasswordInput;

    setAuthError(null);

    if (!isEmailReady) {
      setAuthError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setAuthError("Please enter your password.");
      return;
    }

    if (authMode === "signUp" && password.length < MIN_PASSWORD_LENGTH) {
      setAuthError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      );
      return;
    }

    if (authMode === "signUp" && password !== confirmPassword) {
      setAuthError("Passwords do not match. Please re-check your password.");
      return;
    }

    setSubmitting(true);

    try {
      if (authMode === "signUp") {
        const { requiresEmailConfirmation } = await signUpWithEmail(
          normalizedEmail,
          password,
        );

        if (requiresEmailConfirmation) {
          setInfoMessage(
            "Account created. Please verify your email, then sign in to unlock decks.",
          );
          setAuthError(null);
          setAuthMode("signIn");
          setPasswordInput("");
          setConfirmPasswordInput("");
          return;
        }
      } else {
        await signInWithEmail(normalizedEmail, password);
      }

      await completeUnlockFlow();
    } catch (error) {
      const nextError =
        error instanceof Error
          ? error.message
          : "Please try again in a moment.";

      setAuthError(nextError);

      if (Platform.OS !== "web") {
        Alert.alert(
          authMode === "signUp" ? "Could Not Create Account" : "Sign-In Failed",
          nextError,
        );
      }
    } finally {
      setSubmitting(false);
    }
  }, [
    authMode,
    completeUnlockFlow,
    confirmPasswordInput,
    isEmailReady,
    normalizedEmail,
    passwordInput,
    signInWithEmail,
    signUpWithEmail,
  ]);

  const handleSignOut = useCallback(async () => {
    setSubmitting(true);

    try {
      await signOut();
      await setEdition("classic");
    } catch (error) {
      Alert.alert(
        "Sign Out Failed",
        error instanceof Error ? error.message : "Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }, [setEdition, signOut]);

  const authModalTitle =
    pendingEditionId && pendingEditionName !== "this deck"
      ? `Unlock ${pendingEditionName}`
      : authMode === "signUp"
        ? "Create Account"
        : "Sign In";

  const handleSelectEdition = useCallback(
    async (editionId: string) => {
      if (!canAccessEdition(editionId, isAuthenticated)) {
        openLoginModal(editionId);
        return;
      }

      await setEdition(editionId);
      navigateBackToHome();
    },
    [isAuthenticated, navigateBackToHome, openLoginModal, setEdition],
  );

  const handleAccountActionPress = useCallback(() => {
    if (isAuthActionDisabled) {
      return;
    }

    if (isAuthenticated) {
      void handleSignOut();
      return;
    }

    openLoginModal();
  }, [handleSignOut, isAuthActionDisabled, isAuthenticated, openLoginModal]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-violet-400/50"
      style={{
        paddingTop: Math.max(insets.top, 20),
      }}
    >
      <AppScreenHeader title="CARD LIBRARY" onBack={navigateBackToHome} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 40,
          width: "100%",
          maxWidth: 600,
          alignSelf: "center",
        }}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <LibraryAccessPanel
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          disabled={isAuthActionDisabled}
          onPressAction={handleAccountActionPress}
        />

        {editions.length === 0 ? (
          <LibraryEmptyState />
        ) : (
          <View className="gap-y-4 sm:gap-y-6">
            {sortedEditions.map((edition) => {
              const isLocked = !canAccessEdition(edition.id, isAuthenticated);
              const editionDisplay =
                editionDisplayById[edition.id] ??
                resolveEditionDisplay(edition.id, editions);
              const isSelected = currentEdition === edition.id;
              const cardCount = cardCountByEdition[edition.id] ?? 0;
              const cardBgClass = editionDisplay.bgClass;
              const cardIcon = editionDisplay.icon;
              const cardName = editionDisplay.name;
              const cardDescription =
                edition.description ??
                "A custom deck from your Supabase edition library.";

              return (
                <LibraryEditionCard
                  key={edition.id}
                  icon={cardIcon}
                  name={cardName}
                  description={cardDescription}
                  bgClass={cardBgClass}
                  cardCount={cardCount}
                  isSelected={isSelected}
                  isLocked={isLocked}
                  onPress={() => {
                    void handleSelectEdition(edition.id);
                  }}
                />
              );
            })}
          </View>
        )}
      </ScrollView>

      <LibraryAuthModal
        visible={showLoginModal}
        authMode={authMode}
        title={authModalTitle}
        infoText={modalInfoText}
        authError={authError}
        emailInput={emailInput}
        passwordInput={passwordInput}
        confirmPasswordInput={confirmPasswordInput}
        submitting={submitting}
        isSubmitDisabled={isSubmitDisabled}
        primaryAuthButtonText={primaryAuthButtonText}
        onChangeEmail={setEmailInput}
        onChangePassword={setPasswordInput}
        onChangeConfirmPassword={setConfirmPasswordInput}
        onToggleAuthMode={toggleAuthMode}
        onSubmit={() => {
          void handleSubmitEmailAuth();
        }}
        onCancel={closeLoginModal}
      />
    </KeyboardAvoidingView>
  );
}
