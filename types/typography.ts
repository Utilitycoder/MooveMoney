import { TextProps, TextStyle } from "react-native";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodyMedium"
  | "bodyBold"
  | "caption"
  | "captionMedium"
  | "label"
  | "labelMedium"
  | "labelBold"
  | "button"
  | "buttonBold";

export type TypographySize =
  | "xs"
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type TypographyWeight = "regular" | "medium" | "bold" | "black";

export type TypographyColor =
  | "text"
  | "textSecondary"
  | "textMuted"
  | "primary"
  | "primaryDark"
  | "success"
  | "error"
  | "surface"
  | "background"
  | "white";

export interface TypographyProps extends TextProps {
  /**
   * Predefined variant that sets size, weight, and line height
   */
  variant?: TypographyVariant;
  /**
   * Custom size (overrides variant size)
   */
  size?: TypographySize;
  /**
   * Custom weight (overrides variant weight)
   */
  weight?: TypographyWeight;
  /**
   * Custom color (overrides variant color)
   */
  color?: TypographyColor;
  /**
   * Custom text color (overrides color prop)
   */
  textColor?: string;
  /**
   * Text alignment
   */
  align?: "left" | "center" | "right" | "justify";
  /**
   * Number of lines (0 = unlimited)
   */
  lines?: number;
  /**
   * Enable text wrapping (default: true for Android compatibility)
   */
  wrap?: boolean;
  /**
   * Letter spacing
   */
  letterSpacing?: number;
  /**
   * Line height multiplier
   */
  lineHeight?: number;
  /**
   * Additional custom styles
   */
  style?: TextStyle | TextStyle[];

  text?: string;
}
