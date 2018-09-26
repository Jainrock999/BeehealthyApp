import React from 'react';
import Axios from 'axios';
import { AsyncStorage, View, ScrollView, Alert, StatusBar, ActivityIndicator, Text, Picker, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
export default class ReassignDetails extends React.Component {


  state = {
    isLoading: false,
    projectid: '',
    projecttitle: '',
    projectdesc: '',
    remark: '',
    email: '',
    data: [],
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Reassigned Schedule Details',
    drawerLabel: 'Reassigned Schedule Details',
    headerTintColor: '#056839',
    headerStyle: {
      backgroundColor: '#8DC63F',
    },
    // headerLeft: (
    //   <TouchableOpacity onPress={navigation.toggleDrawer}>
    //     <Icon name="md-menu"
    //       style={{ marginLeft: 10 }} size={30} color="#056839" />
    //   </TouchableOpacity>
    // ),
  })

  componentDidMount() {
    // this.setState({ loading: true })
    console.log('hello')
    const props = this.props.navigation.getParam('projectid');
    AsyncStorage.getItem('USER_ID')
      .then(userid => {
        const formdata = new FormData();
        formdata.append('userid', userid);
        formdata.append('projectid', props);
        console.log('reponcerohit', userid)
        console.log('reponcerohit', props)
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
              Alert.alert('Assigned Not Found')
              this.setState({
                isLoading: false,
                data: responseJson

              },
              );
            }
          }).catch(p => console.log('Not Responding!', p));


      })

  }

  getReassignSchudle = () => {
    // this.setState({ loading: true })
    if(this.state.email !==''){
      const props = this.props.navigation.getParam('projectId');
      AsyncStorage.getItem('USER_ID')
        .then(userid => {
          const formdata = new FormData();
          formdata.append('userid', userid);
          formdata.append('projectid', props);
          formdata.append('status', 'Reassign')
          formdata.append('comment', this.state.email)
          console.log(this.state.email)
          Axios.post('http://attendanceapp.manukahealth.ph/api/project_status_comment', formdata,
            { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(p => {
              if (p.data.status == 'true') {
                Alert.alert('Request Reassigned Submitted Successfully')
                this.props.navigation.goBack(null);
                this.props.navigation.navigate('ReSignedSchedule')
                this.setState({
                  isLoading: false,
                  isModalVisible: false,
  
                },
                );
  
              } else {
                Alert.alert('no Reassigned Schedule!')
                this.setState({
                  isLoading: false,
  
                },
                );
              }
            }).catch(p => console.log('Network Error!'));
  
  
        })

    }else{
    // this.setState({ loading: true })
    Alert.alert('Reason is Required')
  }
}
  _toggleModal = () =>
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });


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

          <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>

            <TouchableOpacity
              style={styles.button}
              onPress={this.getAcceptStatus}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={this._toggleModal} >
              <Text style={{ color: '#fff', fontSize: 16,textAlign:'center' }}>Request Reassigned</Text>
            </TouchableOpacity>
            <StatusBar
              backgroundColor="#056839"
              barStyle="light-content"
            />
            <Modal isVisible={this.state.isModalVisible}>
              <View style={styles.container1}>
                <Text style={{ color: '#000', fontSize: 18, margin: 8 }}>Reassign Reason</Text>
                <TextInput
                  placeholder="Enter Reassign Resion"
                  value={this.state.email}
                  style={styles.TextInputStyle}
                  underlineColorAndroid="transparent"
                  TextInput="text"
                  onChangeText={(email) => {
                    this.setState({ email })
                  }}
                />
                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, margin: 8, alignItems: 'center', justifyContent: 'center' }}>

                  <TouchableOpacity
                    style={styles.buttonModel}
                    onPress={this.getReassignSchudle}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonModel}
                    onPress={this._toggleModal} >
                    <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
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
  container1: {
    //  flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    height: 50,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#056839',
    borderRadius: 3,
    margin: 1,
    width: '49%'
  },
  button1: {
    height: 50,
    padding: 10,
    backgroundColor: '#056839',
    borderRadius: 3,
    margin: 1,
    width: '49%'
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
  TextStyle: {
    textAlign: 'center',
    color: '#F5FCFF',
    fontSize: 15,
  },
});
