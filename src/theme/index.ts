import { Platform } from "react-native";

export const COLORS = {
  background: "#f8fafc",
  card: "#ffffff",
  surface: "#f1f5f9",
  border: "#d1d5db",
  text: "#111827",
  secondary: "#475569",
  muted: "#64748b",
  primary: "#2563eb",
  error: "#dc2626",
};

export const SPACING = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 32,
};

export const TYPOGRAPHY = {
  title: 18,
  subtitle: 14,
  body: 15,
};

export const SHADOW = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: {
    elevation: 2,
  },
});
