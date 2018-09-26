import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Platform, Alert, ScrollView, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { YellowBox } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default class scheduleActivity extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Schedule',
    drawerLabel: 'Schedule',
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

  getAssigned = () => {
   
    this.props.navigation.navigate('AssignScreen');
  }
  getCompleted = () => {
   
    this.props.navigation.navigate('CompleteSchedule');
  }
  getReassigned = () => {
   
    this.props.navigation.navigate('ReSignedSchedule');
  }
  getConfirmed = () => {
   
    this.props.navigation.navigate('Confirm');

  }



  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.container1}>
            <TouchableOpacity
              style={styles.redbox}
              onPress={this.getAssigned}>
              <Image source={require('../assets/images/assigned.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}>Assigned Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.blackbox}
              onPress={this.getReassigned}>
              <Image source={require('../assets/images/reassigned.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}>Reassigned Schedule</Text>
            </TouchableOpacity>


          </View>
          <View style={styles.container2}>

           <TouchableOpacity
              style={styles.bluebox}
              onPress={this.getConfirmed}>
              <Image source={require('../assets/images/confirmed.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}>Accepted Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.greenbox}
              onPress={this.getCompleted}>
              <Image source={require('../assets/images/completed.png')} style={styles.ImageStyle} />
              <Text style={styles.TextStyle}> Completed Schedule</Text>
            </TouchableOpacity>
           
          </View>

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
})

