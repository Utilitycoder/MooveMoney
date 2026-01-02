import { AppUser } from "@/types/appStore";

/**
 * Extracts the user's initials from their profile data.
 * Priority: Name -> Email -> "ME"
 * @param user The user object from the app store
 * @returns Upper-case initials (1-2 characters)
 */
export const getUserInitials = (user: AppUser | null): string => {
  if (!user) return "U";

  // 1. Try Name
  if (user.name) {
    const names = user.name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    } else if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
  }

  // 2. Try Email
  if (user.email) {
    return user.email.substring(0, 2).toUpperCase();
  }

  return "ME";
};
