import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { isAuthenticated } from "../../services/authService";

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this.loadApp();
  }

  loadApp = async () => {
    const token = await isAuthenticated();
    this.props.navigation.navigate(token ? "App" : "Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
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

export default AuthLoadingScreen;
