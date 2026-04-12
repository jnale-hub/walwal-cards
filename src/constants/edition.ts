import { BG_COLOR_CLASSES } from "./theme";

export interface EditionLike {
  id: string;
  name?: string | null;
  color?: string | null;
  icon?: string | null;
}

export interface EditionDisplay {
  name: string;
  icon: string;
  bgClass: string;
  gridEmoji: string;
}

const DEFAULT_ICON = "🍺";
const DEFAULT_BG_CLASS = BG_COLOR_CLASSES[0];
const PUBLIC_EDITION_IDS = new Set(["classic"]);

const normalizeEditionId = (editionId: string): string => {
  return editionId.trim().toLowerCase();
};

const hasText = (value: string | null | undefined): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const prettifyEditionId = (editionId: string): string => {
  return editionId
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const isPublicEdition = (editionId: string): boolean => {
  return PUBLIC_EDITION_IDS.has(normalizeEditionId(editionId));
};

export const canAccessEdition = (
  editionId: string,
  isAuthenticated: boolean,
): boolean => {
  return isAuthenticated || isPublicEdition(editionId);
};

const normalizeBgClass = (value?: string | null): string | null => {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  return normalized.startsWith("bg-") ? normalized : `bg-${normalized}`;
};

export const resolveEditionDisplay = (
  editionId: string,
  editions: EditionLike[],
): EditionDisplay => {
  const matchedEdition = editions.find((edition) => edition.id === editionId);

  const name = hasText(matchedEdition?.name)
    ? matchedEdition.name
    : prettifyEditionId(editionId || "classic");

  const icon = hasText(matchedEdition?.icon)
    ? matchedEdition.icon
    : DEFAULT_ICON;

  const bgClass = normalizeBgClass(matchedEdition?.color) ?? DEFAULT_BG_CLASS;

  return {
    name,
    icon,
    bgClass,
    gridEmoji: icon,
  };
};

export const sortEditionsByCardCount = <T extends EditionLike>(
  editions: T[],
  cardCountByEdition: Record<string, number>,
): T[] => {
  return [...editions].sort((firstEdition, secondEdition) => {
    const firstCount = cardCountByEdition[firstEdition.id] ?? 0;
    const secondCount = cardCountByEdition[secondEdition.id] ?? 0;

    if (firstCount !== secondCount) {
      return secondCount - firstCount;
    }

    const firstName = hasText(firstEdition.name)
      ? firstEdition.name
      : prettifyEditionId(firstEdition.id);
    const secondName = hasText(secondEdition.name)
      ? secondEdition.name
      : prettifyEditionId(secondEdition.id);

    return firstName.localeCompare(secondName);
  });
};
