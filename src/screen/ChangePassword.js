import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, YellowBox, ScrollView, ListView, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AsyncStorage, FlatList, ActivityIndicator, Text } from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ChangePassword extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            currentpassword: '',
            newpassword: '',
            confirmpassword: '',
            isLoading: true,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Change Password',
        drawerLabel: 'Change Password',
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

    getchangepassowrd = () => {
        if (this.state.newpassword != this.state.confirmpassword) {
            Alert.alert('Password and Confirm Password Must be Same')
        } else {
            AsyncStorage.getItem('USER_ID')
                .then(user_Id => {
                    const formData = new FormData();
                    formData.append('userid', user_Id);
                    formData.append('password', this.state.currentpassword);
                    formData.append('newpassword', this.state.newpassword);
                    Axios.post('http://attendanceapp.manukahealth.ph/api/change_password', formData,
                        { headers: { 'Content-Type': 'multipart/form-data' } })
                        .then(p => {

                            if (p.data.status == 'True') {
                                Alert.alert('Success', 'Update Password.')
                                this.props.navigation.navigate('App');
                                this.setState({
                                    isLoading: false,

                                },
                                );
                            } else {
                                Alert.alert('Try Again', '.')
                                this.setState({
                                    isLoading: false,

                                },
                                );
                            }
                        }).catch(p => Alert.alert('Error Occured!'));
                })
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container1}>
                    <Image source={require('../assets/images/logo.jpg')} style={{ width: 250, height: 80 }} />
                    <Text style={styles.welcome}>Change Password</Text>
                    <TextInput
                        placeholder="Current Password"
                        value={this.state.currentpassword}
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType='text'
                        onChangeText={(currentpassword) => { this.setState({ currentpassword }) }}
                    />
                    <TextInput
                        value={this.state.newpassword}
                        placeholder="*********"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType='text'
                        maxLength={10}

                        secureTextEntry={true}
                        onChangeText={(newpassword) => { this.setState({ newpassword }) }} />
                    <TextInput
                        value={this.state.confirmpassword}
                        placeholder="Confirm Password"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType='text'
                        onChangeText={(confirmpassword) => { this.setState({ confirmpassword }) }} />

                    <TouchableOpacity
                        style={styles.button}

                        onPress={this.getchangepassowrd}>
                        <Text style={styles.TextStyle}>Change Password</Text>
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
        borderRadius: 10,
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