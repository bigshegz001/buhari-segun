import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const palette = {
  number: {
    backgroundColor: "#f8fafc",
    borderColor: "#dbe4ee",
    textColor: "#0f172a",
  },
  operator: {
    backgroundColor: "#14b8a6",
    borderColor: "#14b8a6",
    textColor: "#ffffff",
  },
  utility: {
    backgroundColor: "#fef3c7",
    borderColor: "#fde68a",
    textColor: "#92400e",
  },
  equals: {
    backgroundColor: "#f97316",
    borderColor: "#f97316",
    textColor: "#ffffff",
  },
};

export default function CalculatorButton({
  label,
  onPress,
  type,
  wide,
  active,
  compact,
}) {
  const colors = palette[type];

  return (
    <Pressable
      style={({ hovered, pressed }) => [
        styles.button,
        wide && styles.wide,
        compact && styles.compact,
        {
          backgroundColor: colors.backgroundColor,
          borderColor: active ? "#0f766e" : colors.borderColor,
        },
        hovered && styles.hovered,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          compact && styles.labelCompact,
          { color: colors.textColor },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: 76,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wide: {
    flex: 2.18,
    alignItems: "flex-start",
    paddingLeft: 26,
  },
  compact: {
    minHeight: 66,
  },
  hovered: {
    transform: [{ translateY: -1 }],
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 28,
    fontWeight: "800",
  },
  labelCompact: {
    fontSize: 24,
  },
});
