import React, { Component } from 'react';
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up screen.</Text>

        <TextInput
          onChangeText={(email) => this.setState({ email })}
          style={styles.input}
        />

        <Text>Password</Text>
        <TextInput
          onChangeText={(password) => this.setState({ password })}
          style={styles.input}
          secureTextEntry
          textContentType="password"
        />
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
});

export default SignUpScreen;
