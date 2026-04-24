import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommentRow, ErrorView, Loader, SearchInput } from "../components";
import { useComments } from "../hooks/useComments";
import { ROUTES } from "../navigation/routes";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";
import { Comment } from "../types/comment";
import { filterComments } from "../utils/commentUtils";

export default function CommentsListScreen() {
  const [query, setQuery] = useState("");
  const scrollMomentum = useRef(false);
  const router = useRouter();
  const {
    comments,
    initialLoading,
    loadingMore,
    refreshing,
    error,
    hasMore,
    loadNextPage,
    refresh,
    retry,
  } = useComments();

  const filteredComments = useMemo(
    () => filterComments(comments, query),
    [comments, query],
  );

  const handlePress = useCallback(
    (comment: Comment) => {
      router.push({
        pathname: ROUTES.commentDetail,
        params: {
          id: comment.id.toString(),
          postId: comment.postId.toString(),
          name: comment.name,
          email: comment.email,
          body: comment.body,
        },
      });
    },
    [router],
  );

  const handleSearchChange = useCallback(
    (value: string) => setQuery(value),
    [],
  );

  const canLoadMore = useMemo(
    () => hasMore && !loadingMore && !initialLoading && !refreshing,
    [hasMore, loadingMore, initialLoading, refreshing],
  );

  const handleMomentumScrollBegin = useCallback(() => {
    scrollMomentum.current = true;
  }, []);

  const handleEndReached = useCallback(() => {
    if (canLoadMore && scrollMomentum.current) {
      loadNextPage();
      scrollMomentum.current = false;
    }
  }, [canLoadMore, loadNextPage]);

  const renderItem = useCallback(
    ({ item }: { item: Comment }) => (
      <CommentRow item={item} onPress={() => handlePress(item)} />
    ),
    [handlePress],
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Comments",
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            color: COLORS.text,
            fontWeight: "700",
          },
          headerRight: () => (
            <Ionicons
              name="refresh"
              size={24}
              color={COLORS.primary}
              onPress={refresh}
              style={{ marginRight: SPACING.m }}
            />
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        {initialLoading ? (
          <Loader message="Loading comments..." />
        ) : error ? (
          <View style={styles.centered}>
            <ErrorView message={error} onRetry={retry} />
          </View>
        ) : (
          <FlatList
            data={filteredComments}
            renderItem={renderItem}
            keyExtractor={(item: Comment) => item.id.toString()}
            contentContainerStyle={
              filteredComments.length === 0
                ? styles.emptyList
                : styles.listContainer
            }
            ListHeaderComponent={
              <SearchInput value={query} onChangeText={handleSearchChange} />
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollBegin={handleMomentumScrollBegin}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.6}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={7}
            removeClippedSubviews
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
                tintColor={COLORS.primary}
              />
            }
            ListFooterComponent={
              loadingMore ? (
                <Loader inline message="Loading more comments..." />
              ) : !hasMore && comments.length > 0 ? (
                <Text style={styles.footerText}>No more comments to load.</Text>
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  {query
                    ? "No comments match your search."
                    : "No comments found."}
                </Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SPACING.l,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.l,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SPACING.xxl,
  },
  emptyText: {
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
  },
  footerText: {
    textAlign: "center",
    marginVertical: SPACING.m,
    color: COLORS.secondary,
    fontSize: TYPOGRAPHY.body,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    padding: SPACING.l,
  },
});
