import React from 'react';
import Axios from 'axios';
import { AsyncStorage, View, ScrollView, Alert, StatusBar, ActivityIndicator, Text, Picker, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import Modal from "react-native-modal";
export default class ConfirmDetail extends React.Component {


  state = {
    isLoading: false,
    projectid: '',
    projecttitle: '',
    projectdesc: '',
    remark: '',
    bdate:'',
    email: '',
    data: [],
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Accepted Schedule Details',
    drawerLabel: 'Accepted Schedule Details',
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
              console.log('rohit', responseJson.CompletDate)
              this.setState({
                isLoading: false,
                data: responseJson,
                bdate:responseJson.CompletDate

              },
              );
            } else {
              Alert.alert('Not Found')
              this.setState({
                isLoading: false,
                data: responseJson

              },
              );
            }
          }).catch(p => console.log('Not Responding!', p));


      })

  }
  getYesTest = () => {
    this.props.navigation.goBack(null);
    this.props.navigation.navigate('Confirm');
  }
  cancelBtnText = () =>
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  getAcceptStatus = () => {
    if (this.state.email !== '') {
      const props = this.props.navigation.getParam('projectId');
      AsyncStorage.getItem('USER_ID')
        .then(userid => {
          const formdata = new FormData();
          formdata.append('userid', userid);
          formdata.append('projectid', props);
          formdata.append('status', 'Complete')
          formdata.append('Time',this.state.email)
          Axios.post('http://attendanceapp.manukahealth.ph/api/project_status', formdata,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(p => {
              if (p.data.status == 'true') {
                Alert.alert('Completed Successfully')
                this.props.navigation.goBack(null);
                this.props.navigation.navigate('CompleteSchedule')
                this.setState({
                  isLoading: false,
  
                },
                );
  
              } else {
                Alert.alert('Schedule not Found !')
                this.setState({
                  isLoading: false,
  
                },
                );
              }
            }).catch(p => console.log('Network Error!'));
  
  
        })

    }else{
    //this.setState({ loading: true })
    Alert.alert('Time is required !');
}
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
          <DatePicker
                        style={styles.TextInputStyle}
                        date={this.state.bdate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={this.state.data.AssignDate}
                        underlineColorAndroid="transparent"
                        maxDate="2216-06-01"
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
                        onDateChange={(date) => { this.setState({ bdate:date }) }}
                        />
          {/* <Text style={styles.TextFoget}>{this.state.data.PCreateTime}</Text> */}
          <Text style={styles.TextHading}>{'Assigned By:'}</Text>
          <Text style={styles.TextFoget}>{this.state.data.AssignBy}</Text>
          <Text style={styles.TextHading}>{'Hours Worked:'}</Text>
          <TextInput
                        placeholder="HH:MM"
                        value={this.state.email}
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType={'numeric'}
                        onChangeText={(email) => {
                            this.setState({email})
                        }}
                    />

          <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>

            <TouchableOpacity
              style={styles.button}
              onPress={this.getAcceptStatus}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.cancelBtnText} >
              <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
            <StatusBar
              backgroundColor="#056839"
              barStyle="light-content"
            />
             <Modal isVisible={this.state.isModalVisible}>
              <View style={styles.container1}>
                <Text style={{ color: '#000', fontSize: 18}}>Are You Sure Want To Cancel ?</Text>
                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, margin: 8, alignItems: 'center', justifyContent: 'center' }}>

                  <TouchableOpacity
                    style={styles.buttonModel}
                    onPress={this.getYesTest}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonModel}
                    onPress={this.cancelBtnText} >
                    <Text style={{ color: '#fff', fontSize: 16 }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    backgroundColor: '#fff',


  },
  MainContainer1: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,

  },
  textset: {
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
    height: 38,
    margin: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  TextFoget: {
    fontSize: 16,
    color: '#009688',
    margin: 4,
  },
  container1: {
    //  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    backgroundColor: '#fff',
  },
  TextHading: {
    fontSize: 18,
    color: '#000',
    margin: 4,
  },
  button: {
    height: 50,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#056839',
    borderRadius: 3,
    margin: 1,
    width: '49%'
  },
  TextStyle: {
    textAlign: 'center',
    color: '#F5FCFF',
    fontSize: 15,
  },
  buttonModel: {
    height: 40,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#056839',
    borderRadius: 3,
    margin: 1,
    width: '39%'
  },
});
