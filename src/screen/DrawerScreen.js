import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Platform, Alert, ScrollView, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { YellowBox } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated','Module RCTImageLoader']);
import Permissions from 'react-native-permissions'
export default class DashBoardActivity extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Dashboard',
    drawerLabel: 'Dashboard',
    headerTintColor: '#056839',
    headerStyle: {
      backgroundColor: '#8DC63F',
    },
    headerLeft: (
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <Icon name="md-menu"
          style={{ marginLeft: 10 }} size={30} color="#056839" />
      </TouchableOpacity>
    ),
  })

  getViewAttendence = () => {
    this.props.navigation.navigate('Attendence');
  }
  getMemo = () => {
    this.props.navigation.navigate('Memo');
  }
  getProfile = () => {
    this.props.navigation.navigate('Profile');
  }
  getProject = () => {
    this.props.navigation.navigate('Schedule');

  }
  getCamera = () => {
    this.props.navigation.navigate('CamScreen')

     
  }



  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.container1}>
            <TouchableOpacity
              style={styles.redbox}
              onPress={this.getProfile}>
              <Image source={require('../assets/images/user.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.greenbox}
              onPress={this.getViewAttendence}>
              <Image source={require('../assets/images/clock.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}> TimeIn/TimeOut</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.blackbox}
              onPress={this.getProject}>
              <Image source={require('../assets/images/briefing.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bluebox}
              onPress={this.getMemo}>
              <Image source={require('../assets/images/pad.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}>View Memo</Text>
            </TouchableOpacity>

          
          </View>
          <TouchableOpacity
                        style={styles.button}
                        onPress={this.getCamera}>
                        <Text style={styles.welcome}>Selfie Login</Text>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,

    //  backgroundColor: '#fff',

  },
  container1: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

    //backgroundColor: '#fff',

  },
  button: {
    width: '45%',
    height: 40,
    backgroundColor: '#8DC63F',
    borderRadius: 10,
    marginTop:40,

},
  container2: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: '#fff',

  },
  redbox: {
    width: 140,
    height: 180,
    margin: 2,
    backgroundColor: '#F44336'
  },
  bluebox: {
    width: 140,
    height: 180,
    margin: 2,
    backgroundColor: '#8BC34A'
  },
  blackbox: {
    width: 140,
    height: 180,
    margin: 2,
    backgroundColor: '#00BCD4'
  },

  greenbox: {
    width: 140,
    height: 180,
    margin: 2,
    backgroundColor: '#FF9800'
  },
  TextStyle: {
    textAlign: 'center',
    color: '#F5FCFF',
    margin: 14,
    fontSize: 15,
  },
  ImageStyle: {
    marginLeft: 50,
    marginTop: 30,
    width: 50,
    height: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    marginTop:5,
    
   
},
})

