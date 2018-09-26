import { AsyncStorage, StyleSheet, Image, StatusBar, Text, View } from 'react-native';
import React, { Component } from 'react';

export default class SplashScreen extends React.Component {
  static navigationOptions = { header: null };

  componentDidMount() {
    AsyncStorage.getItem('LOGIN')
      .then(p => {
        if (p === 'true') {
          setTimeout(() => this.props.navigation.navigate('App'), 1500);
        } else {
          setTimeout(() => this.props.navigation.navigate('Login'), 1500);
        }
      })

  }

  render() {
    return (

      <View style={styles.container}>
        {/* <StatusBar barStyle ='{#056839}'  hidden = {false}/> */}
        <Image source={require('../assets/images/logo.jpg')} style={{ width: 300, height: 100 }} />
        <StatusBar
          backgroundColor="#056839"
          barStyle="light-content"
        />


      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 30,
    color: '#ffffff',
    margin: 10,
  },

});

