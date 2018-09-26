import React from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    PermissionsAndroid,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    YellowBox,
    View
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Axios from 'axios';
import { Platform } from 'react-native';
import PushNotification from "react-native-push-notification";
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class LoginActivity extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            email: '',
            password: '',
            datavalues: '',
        }
    }
   
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,],)
            console.log(granted);
            if (granted[0] === PermissionsAndroid.RESULTS.GRANTED && granted[1] === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    static navigationOptions =
        {
            title: 'Login Screen ',
            headerLeft: null,
            headerTintColor: '#056839',
            headerStyle: {
                backgroundColor: '#8DC63F',
            },

        };
    getnext = () => {
        this.props.navigation.navigate('Forget');
    }
    getlogin = () => {
        AsyncStorage.getItem('Token_id')
        .then(p => {
            console.log('TOKEN:12', p);
        const formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('token_id',p)
       
        Axios.post('http://attendanceapp.manukahealth.ph/api/userlogin', formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            .then(p => {
                console.log(p)
                if (p.data.status == 'True') {

                    AsyncStorage.setItem('USER_ID', p.data.user.user_id)
                    AsyncStorage.setItem('LAST_ID', p.data.user.last_id)
                    AsyncStorage.setItem('NAME', p.data.user.name)
                    AsyncStorage.setItem('CONTACT', p.data.user.mobile)
                    AsyncStorage.setItem('LOGINDATE',p.data.user.loginDate)
                    AsyncStorage.setItem('LOGINTIME',p.data.user.loginTime)
                    AsyncStorage.setItem('LOGIN', 'true')
                    this.props.navigation.navigate('Time');

                } else {
                    Alert.alert('Error', 'Invalid username/password.')

                }
            }).catch();

        })
}

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container1}>
                    <Image source={require('../assets/images/logo.jpg')} style={{width: 250, height: 80}}/>
                    <Text style={styles.welcome}>Sign In</Text>
                    <TextInput
                        placeholder="example@gmail.com"
                        value={this.state.email}
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        TextInput="email"
                        keyboardType='email-address'
                        onChangeText={(email) => {
                            this.setState({email})
                        }}
                    />
                    <TextInput
                        value={this.state.password}
                        placeholder="*********"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        TextInput="password"
                        secureTextEntry={true}
                        onChangeText={(password) => {
                            this.setState({password})
                        }}/>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.getlogin}>
                        <Text style={styles.TextStyle}>Login</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={this.getnext}>
                        <Text style={styles.TextFoget}>Forgot Password ?</Text>
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
        color: '#008800',
        marginTop: 20,
    },
    TextInputStyle:
        {
            borderWidth: 2,
            borderColor: '#009688',
            width: '90%',
            height: 40,
            marginTop: 10,
            borderRadius: 5,
            marginBottom: 10,
        },

    button: {
        width: '75%',
        height: 40,
        padding: 10,

        backgroundColor: '#8DC63F',
        borderRadius: 10,
        marginTop: 20,

    },
    TextFoget: {
        fontSize: 16,
        color: '#008800',
        margin: 10,

    },
    TextStyle: {
        textAlign: 'center',
        color: '#F5FCFF',
        fontSize: 15,
    },
});