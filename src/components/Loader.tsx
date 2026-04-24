import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

interface LoaderProps {
  message?: string;
  inline?: boolean;
}

export function Loader({ message, inline }: LoaderProps) {
  return (
    <View
      style={[styles.container, inline ? styles.inline : styles.fullscreen]}
    >
      <ActivityIndicator
        size={inline ? "small" : "large"}
        color={COLORS.primary}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  fullscreen: {
    flex: 1,
  },
  inline: {
    paddingVertical: SPACING.s,
  },
  message: {
    marginTop: SPACING.s,
    color: COLORS.muted,
    fontSize: TYPOGRAPHY.body,
    textAlign: "center",
  },
});
