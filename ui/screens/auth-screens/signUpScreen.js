import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class SignUpScreen extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up screen.</Text>
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

export default SignUpScreen;
