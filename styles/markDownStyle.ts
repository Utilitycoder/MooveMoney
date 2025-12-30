import { Fonts, ThemeColors } from "@/constants/theme";

export const getMarkdownStyle = (isUser: boolean = false) => ({
  body: {
    fontFamily: Fonts.brand,
    fontSize: 15,
    lineHeight: 22,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
    margin: 0,
    padding: 0,
  },
  paragraph: {
    marginTop: 0,
    marginBottom: 0,
    flexWrap: "wrap" as const,
  },
  strong: {
    fontFamily: Fonts.brandBold,
    fontWeight: "700" as const,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
  },
  em: {
    fontStyle: "italic" as const,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
  },
  code_inline: {
    fontFamily: "monospace",
    backgroundColor: isUser
      ? "rgba(255, 255, 255, 0.2)"
      : ThemeColors.borderLight,
    color: isUser ? ThemeColors.surface : ThemeColors.primary,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 14,
  },
  code_block: {
    fontFamily: "monospace",
    backgroundColor: isUser
      ? "rgba(255, 255, 255, 0.15)"
      : ThemeColors.borderLight,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 13,
    lineHeight: 18,
  },
  fence: {
    fontFamily: "monospace",
    backgroundColor: isUser
      ? "rgba(255, 255, 255, 0.15)"
      : ThemeColors.borderLight,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 13,
    lineHeight: 18,
  },
  blockquote: {
    backgroundColor: isUser
      ? "rgba(255, 255, 255, 0.1)"
      : ThemeColors.borderLight,
    borderLeftColor: isUser ? "rgba(255, 255, 255, 0.3)" : ThemeColors.border,
    borderLeftWidth: 4,
    paddingLeft: 12,
    paddingVertical: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
  bullet_list: {
    marginVertical: 4,
  },
  ordered_list: {
    marginVertical: 4,
  },
  list_item: {
    marginVertical: 2,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
  },
  hr: {
    backgroundColor: isUser ? "rgba(255, 255, 255, 0.2)" : ThemeColors.border,
    marginVertical: 12,
    height: 1,
  },
  heading1: {
    fontFamily: Fonts.brandBold,
    fontSize: 24,
    fontWeight: "700" as const,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  heading2: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    fontWeight: "700" as const,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
    marginTop: 10,
    marginBottom: 6,
  },
  heading3: {
    fontFamily: Fonts.brandBold,
    fontSize: 18,
    fontWeight: "600" as const,
    color: isUser ? ThemeColors.surface : ThemeColors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  link: {
    color: isUser ? ThemeColors.surface : ThemeColors.primary,
    textDecorationLine: "underline" as const,
  },
  text: {
    color: isUser ? ThemeColors.surface : ThemeColors.text,
  },
});

// Default export for backward compatibility
export const markdownStyle = getMarkdownStyle(false);
