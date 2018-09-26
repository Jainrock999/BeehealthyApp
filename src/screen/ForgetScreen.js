import React, { Component } from 'react';
import { StyleSheet, Platform, StatusBar, ScrollView, ActivityIndicator, View, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Axios from 'axios';
export default class AllData extends Component {
  constructor(props) {

    super(props);
    this.state = {
      usermail: '',
      isLoading: true,
    }
  }
  static navigationOptions =
    {
      title: 'Forgot Screen',
      headerTintColor: '#056839',
      headerStyle: {
        backgroundColor: '#8DC63F',
      },
    };

  getForget = () => {
    const formData = new FormData();
    formData.append('usermail', this.state.usermail);
    Axios.post('http://attendanceapp.manukahealth.ph/api/forgotpassword', formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(p => {
        console.log(p);
        if (p.data.result == 'true') {
          Alert.alert('Success', 'Send Link On Email')
          this.props.navigation.navigate('Login')
          this.setState({
            isLoading: false,
            data: responseJson
          },
          );
        } else {
          console.log(p);
          Alert.alert('Error', 'Retry.')
          this.setState({
            isLoading: false,
            data: responseJson
          },
          );
        }
      }).catch();
  }



  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.welcome}>Forgot</Text>


          <TextInput
            placeholder="Enter Vaild Email"
            value={this.state.email}
            style={styles.TextInputStyle}
            underlineColorAndroid="transparent"
            onChangeText={(usermail) => { this.setState({ usermail }) }}
          />


          <TouchableOpacity
            style={styles.button}
            onPress={this.getForget}>
            <Text style={styles.TextStyle}>Submit</Text>
          </TouchableOpacity>
          <StatusBar
            backgroundColor="#056839"
            barStyle="light-content"
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // paddingVertical:20,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    color: '#008800',
    margin: 10,
  },
  TextInputStyle:
  {
    borderWidth: 1,
    borderColor: '#009688',
    width: '90%',
    height: 40,
    margin: 10,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'left',
  },

  button: {
    width: '75%',
    height: 40,
    padding: 10,
    backgroundColor: '#008800',
    borderRadius: 10,
    marginTop: 20,

  },
  TextFoget: {
    fontSize: 16,
    textAlign: 'center',
    color: '#008800',
    margin: 10,
  },
  TextStyle: {
    textAlign: 'center',
    color: '#F5FCFF',
    fontSize: 15,
  },
});

