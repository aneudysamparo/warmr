import React, { Component } from 'react';
import {
  StyleSheet, ScrollView, View, Text, TextInput, Button, KeyboardAvoidingView,
} from 'react-native';
import { Header } from 'react-navigation';
import { logIn } from '../../services/authService';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  logIn = async () => {
    const { username, password } = this.state;
    await logIn({ username, password });
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Header.HEIGHT + 20} behavior="padding">
        <View style={styles.container}>
          <View>
            <Text>Username</Text>
          </View>
          <TextInput
            onChangeText={(username) => this.setState({ username })}
            style={styles.input}
            textContentType="username"
            autoCapitalize="none"
          />
          <View>
            <Text>Password</Text>
          </View>
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            style={styles.input}
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
          />
          <Button title="Sign in" onPress={this.logIn} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '50%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
  },
});

export default SignInScreen;
