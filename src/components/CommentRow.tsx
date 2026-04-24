import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Comment } from "../types/comment";
import { COLORS, SHADOW, SPACING, TYPOGRAPHY } from "../theme";

interface CommentRowProps {
  item: Comment;
  onPress: () => void;
}

function CommentRowComponent({ item, onPress }: CommentRowProps) {
  const initials = item.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: COLORS.surface }}
      accessibilityRole="button"
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
      <Text style={styles.body} numberOfLines={2} ellipsizeMode="tail">
        {item.body}
      </Text>
    </Pressable>
  );
}

export const CommentRow = memo(CommentRowComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.m,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.surface,
    marginBottom: SPACING.s,
    ...SHADOW,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.m,
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  header: {
    flex: 1,
  },
  name: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  email: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
  },
  body: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 20,
  },
});
