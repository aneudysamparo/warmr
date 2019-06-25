import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { signIn } from "../../services/authService";

class SignInScreen extends Component {
  state = {};

  signIn = async () => {
    await signIn();
    this.props.navigation.navigate("App");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput style={styles.input} />
        <Text>Password</Text>
        <TextInput style={styles.input} />
        <Button title="Sign in" onPress={() => this.signIn()} />
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
  },
  input: {
    width: "50%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15
  }
});

export default SignInScreen;
