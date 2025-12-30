import { Fonts, ThemeColors } from "@/constants/theme";
import {
  TypographyColor,
  TypographyProps,
  TypographySize,
  TypographyVariant,
  TypographyWeight,
} from "@/types/typography";
import React from "react";
import { Text, TextStyle } from "react-native";

const SIZE_MAP: Record<TypographySize, number> = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 15,
  lg: 16,
  xl: 18,
  "2xl": 22,
  "3xl": 24,
  "4xl": 32,
  "5xl": 40,
};

const WEIGHT_MAP: Record<TypographyWeight, string> = {
  regular: Fonts.brand,
  medium: Fonts.brandMedium,
  bold: Fonts.brandBold,
  black: Fonts.brandBlack,
};

const COLOR_MAP: Record<TypographyColor, string> = {
  text: ThemeColors.text,
  textSecondary: ThemeColors.textSecondary,
  textMuted: ThemeColors.textMuted,
  primary: ThemeColors.primary,
  primaryDark: ThemeColors.primaryDark,
  success: ThemeColors.success,
  error: ThemeColors.error,
  surface: ThemeColors.surface,
};

const VARIANT_STYLES: Record<
  TypographyVariant,
  { size: TypographySize; weight: TypographyWeight; lineHeight: number }
> = {
  h1: { size: "4xl", weight: "black", lineHeight: 1.2 },
  h2: { size: "3xl", weight: "bold", lineHeight: 1.25 },
  h3: { size: "2xl", weight: "bold", lineHeight: 1.3 },
  h4: { size: "xl", weight: "bold", lineHeight: 1.35 },
  body: { size: "base", weight: "regular", lineHeight: 1.5 },
  bodyMedium: { size: "base", weight: "medium", lineHeight: 1.5 },
  bodyBold: { size: "base", weight: "bold", lineHeight: 1.5 },
  caption: { size: "sm", weight: "regular", lineHeight: 1.4 },
  captionMedium: { size: "sm", weight: "medium", lineHeight: 1.4 },
  label: { size: "sm", weight: "regular", lineHeight: 1.4 },
  labelMedium: { size: "sm", weight: "medium", lineHeight: 1.4 },
  labelBold: { size: "sm", weight: "bold", lineHeight: 1.4 },
  button: { size: "lg", weight: "regular", lineHeight: 1.4 },
  buttonBold: { size: "lg", weight: "bold", lineHeight: 1.4 },
};

const Typography: React.FC<TypographyProps> = ({
  text,
  size,
  weight,
  variant,
  color = "text",
  textColor,
  align,
  lines,
  wrap = true,
  letterSpacing,
  lineHeight,
  style,
  children,
  ...props
}) => {
  // Get variant defaults
  const variantStyle = variant ? VARIANT_STYLES[variant] : null;

  // Determine final values (variant -> prop override)
  const finalSize = size || variantStyle?.size || "base";
  const finalWeight = weight || variantStyle?.weight || "regular";
  const finalLineHeight = lineHeight || variantStyle?.lineHeight || 1.5;
  const finalColor = textColor || COLOR_MAP[color];

  // Build style object
  const textStyle: TextStyle = {
    fontFamily: WEIGHT_MAP[finalWeight],
    fontSize: SIZE_MAP[finalSize],
    color: finalColor,
    lineHeight: SIZE_MAP[finalSize] * finalLineHeight,
    ...(align && { textAlign: align }),
    ...(letterSpacing !== undefined && { letterSpacing }),
    // Permanent fix for text chopping: minor horizontal buffer
    paddingHorizontal: 2,
    // Android compatibility & consistency
    includeFontPadding: false,
    ...(wrap && { flexShrink: 1 }),
    ...(wrap && { flexWrap: "wrap" as any }),
  };

  return (
    <Text
      style={[textStyle, style]}
      numberOfLines={lines !== undefined ? lines : undefined}
      {...props}
    >
      {text || children}
    </Text>
  );
};

export { Typography };
export default Typography;
