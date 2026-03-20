import { BG_COLORS } from "./theme";

export interface EditionLike {
  id: string;
  name?: string | null;
  color?: string | null;
  icon?: string | null;
}

export interface EditionDisplay {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  gridEmoji: string;
}

const DEFAULT_ICON = "🍺";
const DEFAULT_BG_COLOR = BG_COLORS[4] ?? "#FB923C";
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

const hashString = (value: string): number => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

const getFallbackColor = (editionId: string): string => {
  if (!editionId) return DEFAULT_BG_COLOR;

  const palette = BG_COLORS.length > 0 ? BG_COLORS : [DEFAULT_BG_COLOR];
  return palette[hashString(editionId) % palette.length] ?? DEFAULT_BG_COLOR;
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

  const color = hasText(matchedEdition?.color)
    ? matchedEdition.color
    : getFallbackColor(editionId);

  return {
    name,
    icon,
    color,
    bgColor: color,
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
