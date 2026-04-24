import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchInput } from "../components";
import { CommentDetailParams } from "../navigation/routes";
import { COLORS, SHADOW, SPACING, TYPOGRAPHY } from "../theme";

export default function CommentDetailScreen() {
  const params = useLocalSearchParams() as CommentDetailParams;
  const [query, setQuery] = useState("");

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const initials = params.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <>
      <Stack.Screen
        options={{
          title: "Comment Detail",
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            color: COLORS.text,
            fontWeight: "700",
          },
        }}
      />
      <SafeAreaView style={styles.container}>
        <SearchInput value={query} onChangeText={handleSearchChange} />
        <View style={styles.card}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{params.name}</Text>
            <View style={styles.metaRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
              <View>
                <Text style={styles.email}>{params.email}</Text>
              </View>
            </View>
            <Text style={styles.body}>{params.body}</Text>
            <Text
              style={styles.postMeta}
            >{`Post ID: ${params.postId}, Comment ID: ${params.id}`}</Text>
            <Text style={styles.postedAt}>Posted 2 mins ago</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.surface,
    ...SHADOW,
    marginTop: SPACING.m,
  },
  contentContainer: {
    padding: SPACING.l,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: SPACING.m,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.m,
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
  email: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
  },
  body: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 24,
    marginBottom: SPACING.l,
  },
  postMeta: {
    color: COLORS.muted,
    fontSize: TYPOGRAPHY.subtitle,
    marginBottom: SPACING.xs,
  },
  postedAt: {
    color: COLORS.muted,
    fontSize: TYPOGRAPHY.subtitle,
  },
});
