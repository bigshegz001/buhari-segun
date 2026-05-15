import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import CalculatorButton from "./src/components/CalculatorButton";
import {
  applyPercent,
  clearCalculator,
  evaluateExpression,
  inputDecimal,
  inputDigit,
  setOperator,
  toggleSign,
} from "./src/utils/calculatorEngine";

const BUTTONS = [
  [
    { label: "C", type: "utility", action: "clear" },
    { label: "+/-", type: "utility", action: "sign" },
    { label: "%", type: "utility", action: "percent" },
    { label: "\u00f7", type: "operator", action: "operator", value: "/" },
  ],
  [
    { label: "7", type: "number", action: "digit", value: "7" },
    { label: "8", type: "number", action: "digit", value: "8" },
    { label: "9", type: "number", action: "digit", value: "9" },
    { label: "\u00d7", type: "operator", action: "operator", value: "*" },
  ],
  [
    { label: "4", type: "number", action: "digit", value: "4" },
    { label: "5", type: "number", action: "digit", value: "5" },
    { label: "6", type: "number", action: "digit", value: "6" },
    { label: "-", type: "operator", action: "operator", value: "-" },
  ],
  [
    { label: "1", type: "number", action: "digit", value: "1" },
    { label: "2", type: "number", action: "digit", value: "2" },
    { label: "3", type: "number", action: "digit", value: "3" },
    { label: "+", type: "operator", action: "operator", value: "+" },
  ],
  [
    { label: "0", type: "number", action: "digit", value: "0", wide: true },
    { label: ".", type: "number", action: "decimal" },
    { label: "=", type: "equals", action: "equals" },
  ],
];

const titleFont = Platform.select({
  ios: "AvenirNext-Bold",
  android: "sans-serif-condensed",
  web: "Impact",
  default: "sans-serif",
});

export default function App() {
  const [calculator, setCalculator] = useState(clearCalculator());
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isCompact = width < 420;

  const handlePress = (button) => {
    switch (button.action) {
      case "digit":
        setCalculator((current) => inputDigit(current, button.value));
        break;
      case "decimal":
        setCalculator((current) => inputDecimal(current));
        break;
      case "operator":
        setCalculator((current) => setOperator(current, button.value));
        break;
      case "equals":
        setCalculator((current) => evaluateExpression(current));
        break;
      case "clear":
        setCalculator(clearCalculator());
        break;
      case "sign":
        setCalculator((current) => toggleSign(current));
        break;
      case "percent":
        setCalculator((current) => applyPercent(current));
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={[styles.layout, isWide && styles.layoutWide]}>
          <View style={styles.brandPanel}>
            <Text style={styles.eyebrow}></Text>
            <Text style={[styles.title, { fontFamily: titleFont }]}>
              Segun Buhari Calculator
            </Text>
            <Text style={styles.subtitle}>
              .
            </Text>

            <View style={styles.featureStrip}>
              <Text style={styles.featureText}>Add</Text>
              <Text style={styles.featureText}>Subtract</Text>
              <Text style={styles.featureText}>Multiply</Text>
              <Text style={styles.featureText}>Divide</Text>
            </View>
          </View>

          <View style={styles.calculatorShell}>
            <View style={styles.display}>
              <Text style={styles.expression}>
                {calculator.expression || "Ready"}
              </Text>
              <Text
                style={[styles.result, isCompact && styles.resultCompact]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {calculator.displayValue}
              </Text>
            </View>

            <View style={styles.keypad}>
              {BUTTONS.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((button) => (
                    <CalculatorButton
                      key={button.label}
                      label={button.label}
                      type={button.type}
                      wide={button.wide}
                      compact={isCompact}
                      active={
                        button.type === "operator" &&
                        calculator.operator === button.value &&
                        calculator.waitingForOperand
                      }
                      onPress={() => handlePress(button)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f1e7",
  },
  page: {
    flexGrow: 1,
    padding: 22,
    justifyContent: "center",
  },
  layout: {
    width: "100%",
    maxWidth: 1120,
    alignSelf: "center",
    gap: 22,
  },
  layoutWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandPanel: {
    flex: 1,
    gap: 18,
    paddingVertical: 18,
  },
  eyebrow: {
    color: "#0f766e",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  title: {
    color: "#1e293b",
    fontSize: 56,
    lineHeight: 62,
  },
  subtitle: {
    color: "#475569",
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 520,
  },
  featureStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featureText: {
    color: "#134e4a",
    backgroundColor: "#ccfbf1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "700",
  },
  calculatorShell: {
    flex: 0.86,
    minWidth: 0,
    borderRadius: 26,
    padding: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#334155",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.16,
    shadowRadius: 26,
    elevation: 8,
  },
  display: {
    minHeight: 176,
    borderRadius: 18,
    padding: 20,
    backgroundColor: "#0f172a",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  expression: {
    color: "#94a3b8",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "right",
  },
  result: {
    color: "#f8fafc",
    fontSize: 64,
    lineHeight: 72,
    fontWeight: "800",
    textAlign: "right",
  },
  resultCompact: {
    fontSize: 52,
    lineHeight: 58,
  },
  keypad: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
