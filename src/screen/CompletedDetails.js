import React from 'react';
import Axios from 'axios';
import { AsyncStorage, View, ScrollView, Alert, StatusBar, ActivityIndicator, Text, Picker, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class CompletedDetails extends React.Component {

 
  state = {
    isLoading: false,
    projectid: '',
    projecttitle: '',
    projectdesc: '',
    remark: '',
    data: [],
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Completed Schedule Details',
    drawerLabel: 'Completed Schedule Details',
    headerTintColor: '#056839',
    headerStyle: {
      backgroundColor: '#8DC63F',
    },
  })

  componentDidMount() {
     //this.setState({ loading: true })
    console.log('hello')
    const props = this.props.navigation.getParam('projectId');
    AsyncStorage.getItem('USER_ID')
      .then(userid => {
        const formdata = new FormData();
        formdata.append('userid', userid);
        formdata.append('projectid', props);
        Axios.post('http://attendanceapp.manukahealth.ph/api/project_detailby_id', formdata,
          { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(p => {
            console.log('reponcerohit', p.data.status)
            if (p.data.status == 'true') {
              const responseJson = p.data.rows;
              console.log('Hello', responseJson);
              console.log('rohit', responseJson.ProjectTitle)
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            } else {
              Alert.alert('Not Found Completed Schedule !')
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            }
          }).catch(p => console.log('Network Error!'));
      })
  }



  render() {
    console.log(this.state)
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView style={styles.MainContainer}>
        <View style={styles.MainContainer1}>

          <Text style={styles.TextHading}>{'Schedule Title:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.ProjectTitle}</Text>
          <Text style={styles.TextHading}>{'Description:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.Description}</Text>
          <Text style={styles.TextHading}>{'Remark:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.PRemark}</Text>
          <Text style={styles.TextHading}>{'Priority:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.Priority}</Text>
          <Text style={styles.TextHading}>{'Assigned Date:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.AssignDate}</Text>
          <Text style={styles.TextHading}>{'Completion Date:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.CompletDate}</Text>
          <Text style={styles.TextHading}>{'Assigned By:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.AssignBy}</Text>
          
         
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

  MainContainer: {

    // Setting up View inside content in Vertically center.
    // justifyContent: 'center',

    // paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#fff',
    // padding: 5,

  },
  MainContainer1: {

    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,

  },
  textset: {
    // Setting up View inside content in Vertically center.
    backgroundColor: '#056839',
    justifyContent: 'center',
    alignItems: 'center',

    margin: 4,


  },

  textViewContainer: {
    backgroundColor: '#056839',
    padding: 10,
    margin: 4,
    marginTop: 8,

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
    color: '#009688',
    margin: 4,
  },
  TextHading: {
    fontSize: 18,
    color: '#000',
    margin: 4,
  },
  button: {
    width: '65%',
    height: 40,
    padding: 10,

    alignItems: 'center',
    backgroundColor: '#8DC63F',
    borderRadius: 10,
    marginTop: 20,

  },
  TextStyle: {
    textAlign: 'center',
    color: '#F5FCFF',
    fontSize: 15,
  },
});
