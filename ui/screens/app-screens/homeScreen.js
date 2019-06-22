import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

class HomeScreen extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Home screen.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
