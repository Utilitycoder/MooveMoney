import { ThemeColors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ThemeColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 24,
  },
  floatingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
