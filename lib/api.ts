import { useAppStore } from "@/stores/appStore";
import { clearAuth, getIdToken } from "./auth";
import { withTimeout } from "./network";

// Session expiration event listener
type SessionExpiredListener = () => void;
let sessionExpiredListener: SessionExpiredListener | null = null;

// Grace period after login to ignore 401 errors from stale requests
let loginGraceUntil: number = 0;
const LOGIN_GRACE_PERIOD_MS = 5000; // 5 second grace period

export function setSessionExpiredListener(listener: SessionExpiredListener) {
  sessionExpiredListener = listener;
}

export function clearSessionExpiredListener() {
  sessionExpiredListener = null;
}

// Call this after successful login to prevent stale 401s from triggering logout
export function setLoginGracePeriod() {
  loginGraceUntil = Date.now() + LOGIN_GRACE_PERIOD_MS;
}

export function isInLoginGracePeriod(): boolean {
  return Date.now() < loginGraceUntil;
}

export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired. Please log in again.");
    this.name = "SessionExpiredError";
  }
}

// Sanitize error messages from the API to prevent exposing internal details
function sanitizeApiError(message: string): string {
  // Log actual error for debugging
  console.error("API Error (raw):", message);
  // Return generic user-friendly message
  return "Something went wrong. Please try again.";
}

export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = await getIdToken();

  const response = await withTimeout(
    fetch(input, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
    })
  );

  // Read response body once
  const text = await response.text();

  if (response.status === 401) {
    // If we're in the login grace period, this is likely a stale request
    // Don't trigger logout, just throw the error
    if (isInLoginGracePeriod()) {
      throw new SessionExpiredError();
    }

    // Clear local auth state
    await clearAuth();
    useAppStore.getState().clearUser();
    useAppStore.getState().clearBalance();

    // Trigger Privy logout via listener
    if (sessionExpiredListener) {
      sessionExpiredListener();
    }

    throw new SessionExpiredError();
  }

  if (!response.ok) {
    try {
      // Try to parse the error response as JSON
      const json = JSON.parse(text);

      // Handle the API error structure: { status: false, info: { message, error, statusCode } }
      if (json?.info?.message) {
        const message = Array.isArray(json.info.message)
          ? json.info.message.join(", ")
          : json.info.message;

        throw new Error(sanitizeApiError(message));
      }

      // Handle case where message might be at root level
      if (json?.message) {
        throw new Error(
          sanitizeApiError(
            Array.isArray(json.message) ? json.message.join(", ") : json.message
          )
        );
      }

      // If we have error info but no message, use the error field
      if (json?.info?.error) {
        throw new Error(sanitizeApiError(json.info.error));
      }

      // Fallback to statusCode or generic message
      if (json?.info?.statusCode) {
        throw new Error(
          sanitizeApiError(`Request failed with status ${json.info.statusCode}`)
        );
      }

      // If we parsed JSON but couldn't extract a message, use the text
      throw new Error(sanitizeApiError(text || "Request failed"));
    } catch (error) {
      // If error is already an Error instance, re-throw it
      if (error instanceof Error) {
        throw error;
      }

      // If text is a JSON string, try to parse it one more time
      try {
        const parsed = JSON.parse(text);
        if (parsed?.info?.message) {
          const message = Array.isArray(parsed.info.message)
            ? parsed.info.message.join(", ")
            : parsed.info.message;
          throw new Error(sanitizeApiError(message));
        }
      } catch {
        // If all parsing fails, use the raw text or a generic message
        throw new Error(sanitizeApiError(text || "Request failed"));
      }
    }
  }

  return text ? JSON.parse(text) : ({} as T);
}
