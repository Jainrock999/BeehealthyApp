import React, { Component } from 'react';
import { AppRegistry, AsyncStorage,ImageBackground,ScrollView , ActivityIndicator, StyleSheet, Platform, Image, StatusBar, Alert, Text, TouchableOpacity, View } from 'react-native';
import { YellowBox } from 'react-native'
import ImagePicker from './../components/ImagePicker'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
import Axios from 'axios';
let date = new Date();
export default class CamaraActivity extends React.Component {


  static navigationOptions =
    {
      title: 'Selfie login',
      headerTintColor: '#056839',
      headerStyle: {
        backgroundColor: '#8DC63F',
      },
    };

  state = {
    loading: false,
    //cameraLaunched: false,
    // error: false,
    mirror: true,
    // picture:'',
  }
  componentDidMount() {

    options = {
      //   // storageOptions: {
      //   //  // skipBackup: true,
      //   //  // path: 'images'
      //   // }
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log(response);
      if (response.didCancel) {
        this.props.navigation.goBack(null);
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let imageuri = { uri: response.uri, type: response.type, name: response.fileName };
        console.log("rohit", imageuri)
        this.setState({
          picture: imageuri
        });
      }
      
    });
      AsyncStorage.getItem('LAST_ID')
      .then(last_id => {
          const formData = new FormData();
          formData.append('last_id', last_id);
          Axios.post('http://attendanceapp.manukahealth.ph/api/userlogout', formData,
              {headers: {'Content-Type': 'multipart/form-data'}})
              .then(p => {
  
                  if (p.data.status == 'True') {
                      console.log('heloo.', p.data.user)
                      console.log('helo.', p)
                      this.setState({
                          isLoading: false,
                          datadate:p.data.user.OutDate,
                          datatime:p.data.user.logouttime
                      },
                  );
                  } else {
                      // Alert.alert('', 'Try Again.')
  
                  }
              }).catch(p => Alert.alert('Not Responding..'));
  
      })
  
  }
  
   
  getLogout = () => {
    this.setState({ loading: true })
    console.log("data", "hello")
    AsyncStorage.getItem('USER_ID')
      .then(user_Id => {
        const formdata = new FormData();
        formdata.append('userid', user_Id);
        console.log("userid", user_Id)
        formdata.append('screenshot', this.state.picture)
        console.log("imageis", this.state.picture)
        Axios.post('http://attendanceapp.manukahealth.ph/api/screenshot', formdata,
          { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(p => {
            console.log("responce", p)
            if (p.data.status == 'True') {
              this.props.navigation.goBack(null);
              this.setState({ isLoading: false })
              Alert.alert('Suceess', 'Image insert successful');
            } else {
              Alert.alert('Server Error', 'Please Try Again.')
              this.setState({ loading: false })
            }
          }).catch(p => Alert.alert('Error Occured!'));
           
      });
  }



  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container1}>
          <ActivityIndicator />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <ImageBackground
          source={this.state.picture} style={styles.uploadAvatar}>
          <Text style={styles.TextStyles}>{this.state.datadate} </Text>
                    <Text style={styles.TextStyless}>{this.state.datatime} </Text>
    </ImageBackground>

        <TouchableOpacity
          style={styles.button}
          onPress={this.getLogout}>
          <Text style={styles.TextStyle}>Submit </Text>
        </TouchableOpacity>

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
   // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  uploadAvatar: {
    width: '100%',
    height: '85%',
  },


  welcome: {
    fontSize: 30,
    textAlign: 'center',
    justifyContent:'center',
    color: '#8DC63F',
    margin: 10,
  },
  button: {
    width: '55%',
    height: 40,
    padding: 10,
    backgroundColor: '#8DC63F',
    borderRadius: 10,
    marginTop: 20,

  },
  icon: {
    width: 24,
    height: 24,
  },
  TextStyle: {
    textAlign: 'center',
    justifyContent:'center',
    color: '#056839',
    fontSize: 15,
  },
  texthead: {
    textAlign: 'center',
    justifyContent:'center',
    color: '#056839',
    fontSize: 25,
  },
  TextStyles: {
    fontSize: 50,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 80,
},
TextStyless: {
  fontSize: 50,
  textAlign: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  color: '#fff',
  marginTop: 10,
},
});
