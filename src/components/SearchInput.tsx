import { memo } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

interface SearchInputProps {
  value: string;
  onChangeText: (value: string) => void;
}

function SearchInputComponent({ value, onChangeText }: SearchInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={20} color={COLORS.muted} style={styles.icon} />
        <TextInput
          placeholder="Search "
          placeholderTextColor={COLORS.muted}
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}

export const SearchInput = memo(SearchInputComponent);

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
  },
  icon: {
    marginRight: SPACING.s,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPOGRAPHY.body,
  },
});
