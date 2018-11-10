import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Timeline extends Component {
  state = {
    username: ''
  }
  static navigationOptions = {
    title: 'Início',
    headerTintColor: '#4BB0EE',
    headerRight: (
      <Icon 
        name="plus"
        style={{marginRight:15}}
        size={24}
        color="#4BB0EE"
      />
    )
  }
  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GoTwitter:username');
    this.setState({username: username})
  }
  render() {
    return (
      <View>
        <Text>Timeline{this.state.username}</Text>
      </View>
    );
  }
}

export default Timeline;