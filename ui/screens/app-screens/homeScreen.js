import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Button,
} from 'react-native';
import { getEvents } from '../../services/apiService';

class HomeScreen extends Component {
  state = {};

  getTasks = async () => {
    const events = await getEvents();
    console.log('Events:', events);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home screen.</Text>
        <Button title="Get Events (test)" onPress={this.getTasks} />
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

export default HomeScreen;
