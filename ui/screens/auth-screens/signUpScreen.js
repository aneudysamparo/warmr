import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TextInput, Button,
} from 'react-native';
import { Header } from 'react-navigation';
import { registerUser } from '../../services/apiService';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  registerUser = async () => {
    const { username, email, password } = this.state;
    try {
      await registerUser({ username, email, password });
      const { navigation } = this.props;
      navigation.navigate('App');
    } catch (error) {
      console.log({ error });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          onChangeText={(email) => this.setState({ email })}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text>Username</Text>
        <TextInput
          onChangeText={(username) => this.setState({ username })}
          autoCompleteType="username"
          textContentType="username"
          autoCapitalize="none"
          style={styles.input}
        />

        <Text>Password</Text>
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          autoCompleteType="password"
          textContentType="password"
          autoCapitalize="none"
          secureTextEntry
          style={styles.input}
        />
        <Button title="Sign Up" onPress={this.registerUser} />
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

export default SignUpScreen;
