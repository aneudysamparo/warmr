import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TextInput, Button,
} from 'react-native';
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
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput
          onChangeText={(username) => this.setState({ username })}
          style={styles.input}
          textContentType="username"
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          style={styles.input}
          secureTextEntry
          textContentType="password"
        />
        <Button title="Sign in" onPress={() => this.logIn()} />
      </View>
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
