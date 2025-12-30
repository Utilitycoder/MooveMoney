export type BiometricResult =
  | { status: "success" }
  | { status: "not_available" }
  | { status: "cancelled" }
  | { status: "failed" };
