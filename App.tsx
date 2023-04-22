import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CodeComponent from "./Componet/CodeComponent";
const App = () => {
  return (
    <View style={styles.container}>
      <CodeComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;