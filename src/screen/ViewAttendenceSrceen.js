import React, { Component } from 'react';
import { AppRegistry, FlatList, AsyncStorage, TextInput, StyleSheet, Platform, Alert, ActivityIndicator, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios';
import DatePicker from 'react-native-datepicker'

export default class ViewAttendenceActivity extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'TimeIn/TimeOut',
    drawerLabel: 'TimeIn/TimeOut',
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      date: ""

    }
  }
  getdatedata = (date) => {
    this.setState({ date: date })

    AsyncStorage.getItem('USER_ID')
      .then(user_Id => {

        const formData = new FormData();
        formData.append('userid', user_Id);
        formData.append('date', date);
        console.log(user_Id);

        Axios.post('http://attendanceapp.manukahealth.ph/api/emp_attendace_date', formData,
          { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(p => {

            if (p.data.status == 'true') {
              const responseJson = p.data.rows;
              console.log('Hello', responseJson);
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            } else {
              Alert.alert('Error', 'Try Again.')
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            }
          }).catch(p =>
            Alert.alert('Data Not Found!')
          );

      })

  }
  componentDidMount() {
    AsyncStorage.getItem('USER_ID')
      .then(user_Id => {
        const formData = new FormData();
        formData.append('userid', user_Id);
        console.log(user_Id);
        Axios.post('http://attendanceapp.manukahealth.ph/api/emp_attendace', formData,
          { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(p => {
            console.log(p);
            if (p.data.status == 'true') {
              const responseJson = p.data.rows;
              console.log('Hello', responseJson);
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            } else {
              Alert.alert('Error', 'Try Again.')
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            }
          }).catch();

      })

  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <DatePicker
          style={styles.TextInputStyle}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2200-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 0,
              borderWidth: 0
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => { this.getdatedata(date) }}
        />

        <View style={styles.MainContainer1}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <View style={styles.textViewContainer}>
                <Text style={styles.TextFoget}>{' Date:' + item.date}</Text>
                <Text style={styles.TextFoget}>{' In Time:' + item.InDateTime}</Text>
                <Text style={styles.TextFoget}>{' Out Time:' + item.OutDateTime}</Text>
                <Text style={styles.TextFoget}>{' Total Time:' + item.TotalTime}</Text>

              </View>}
          

          />
        </View>
        <StatusBar
          backgroundColor="#056839"
          barStyle="light-content"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#fff',
    padding: 5,

  },

  MainContainer1: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#fff',
    padding: 5,

  },
  textViewContainer: {
    backgroundColor: '#8DC63F',
    padding: 15,
    margin: 4,
   

  },
  TextInputStyle:
  {
    borderWidth: 2,
    borderColor: '#009688',
    width: '90%',
    height: 40,
    margin: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  TextFoget: {
    fontSize: 16,
    color: '#fff',
    margin: 4,
  },

});
