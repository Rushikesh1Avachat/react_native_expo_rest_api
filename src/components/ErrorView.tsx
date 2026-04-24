import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SHADOW, SPACING, TYPOGRAPHY } from "../theme";

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: SPACING.l,
    padding: SPACING.l,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW,
  },
  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACING.s,
  },
  message: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.secondary,
    marginBottom: SPACING.m,
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: SPACING.s,
    paddingHorizontal: SPACING.l,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.card,
    fontWeight: "700",
  },
});
