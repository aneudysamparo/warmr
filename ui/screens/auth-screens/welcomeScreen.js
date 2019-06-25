import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

class WelcomeScreen extends Component {
  navigate(route) {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome screen.</Text>
        <Button title="Sign in" onPress={() => this.navigate("SignIn")} />
        <Button title="Sign up" onPress={() => this.navigate("SignUp")} />
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

export default WelcomeScreen;
