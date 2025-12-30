import * as Clipboard from "expo-clipboard";

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(
  text: string,
  label?: string
): Promise<void> {
  try {
    await Clipboard.setStringAsync(text);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
  }
}
