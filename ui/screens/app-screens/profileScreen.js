import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { logOut } from '../../services/authService';

class ProfileScreen extends Component {
  logOut = async () => {
    await logOut();
    const { navigation } = this.props;
    navigation.navigate('AuthLoading');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Profile screen </Text>
        <Button title="Sign out" onPress={this.logOut} />
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

export default ProfileScreen;
