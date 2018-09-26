import React, { Component } from 'react';
import { Platform, StyleSheet, YellowBox, StatusBar, ListView, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AsyncStorage, FlatList, ScrollView, ActivityIndicator, Text } from 'react-native';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateProfile } from '../api/profile';
import DatePicker from 'react-native-datepicker';



export default class ProfileActivity extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            Name: '',
            Email: '',
            Position: '',
            DateHired: '',
            MobileNo: '',
            LandlineNo: '',
            Bday: '',
            Remark: '',
            setUserProfileResult: '',
            isLoading: true,

        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Profile',
        drawerLabel: 'Profile',
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




    componentDidMount() {
        AsyncStorage.getItem('USER_ID')
            .then(user_Id => {
                const formData = new FormData();
                // formData.append('userid',  '1')

                Axios.get('http://attendanceapp.manukahealth.ph/api/personalinfo?userid=' + user_Id)
                    .then(p => {

                        if (p.data.result == 'true') {
                            const user = p.data.data[0];

                            console.log(user)
                            this.setState({
                                Name: user.Name,
                                Email: user.Email,
                                Position: user.Position,
                                DateHired: user.DateHired,
                                MobileNo: user.MobileNo,
                                LandlineNo: user.LandlineNo,
                                Bday: user.Bday,
                                Remark: user.Remark,
                            })
                            this.setState({
                                isLoading: false,

                            },
                            );
                        } else {
                            Alert.alert('', 'Profile Not Updated.')
                            this.setState({
                                isLoading: false,

                            },
                            );
                        }
                    }).catch(p => Alert.alert('Not Responding'));
            })


    }

    getUpdate = () => {
        AsyncStorage.getItem('USER_ID')
            .then(userId => {
                console.log(userId)
                updateProfile(this.state, userId)
                    .then(p => {
                        console.log(p.data)
                        if (p.data.status == 'True') {
                            console.log(p.data.rows)
                            Alert.alert('Success', ' Profile Updated')
                            this.props.navigation.navigate('Dashboard');

                        } else {
                            Alert.alert('Fail', 'Profile Not Updated.')
                        }
                    }).catch(p => { console.log(p) });;

            })
    }



    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.highLight}>Employee Name</Text>
                    <TextInput
                        placeholder="Name"
                        value={this.state.Name}
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType='text'
                        onChangeText={(Name) => { this.setState({ Name }) }} />
                    <Text style={styles.highLight}>Employee Email</Text>
                    <TextInput
                        placeholder="Email"
                        value={this.state.Email}
                        style={styles.TextInputStyle}
                        editable={false}
                        underlineColorAndroid="transparent"

                        onChangeText={(Email) => { this.setState({ Email: Email }) }} />
                    <Text style={styles.highLight}>Position</Text>
                    <TextInput
                        placeholder="Position"
                        value={this.state.Position}
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType='text'
                        onChangeText={(Position) => { this.setState({ Position: Position }) }} />
                    <Text style={styles.highLight}>Date Hired</Text>

                    <DatePicker
                        style={styles.TextInputStyle}
                        date={this.state.DateHired}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2200-06-01"
                        confirmBtnText="Confirm"
                        backgroundColor='#fff'
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
                        onDateChange={(date) => { this.setState({ DateHired: date }) }}
                    />

                    <Text style={styles.highLight}>Mobile Number</Text>
                    <TextInput
                        placeholder="Mobile Number"
                        value={this.state.MobileNo}
                        style={styles.TextInputStyle}
                        editable={false}
                        keyboardType={'numeric'}
                        underlineColorAndroid="transparent"
                        onChangeText={(MobileNo) => { this.setState({ MobileNo: MobileNo }) }} />
                    <Text style={styles.highLight}>Landline Number</Text>
                    <TextInput
                        placeholder="Landline Number"
                        value={this.state.LandlineNo}
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType={'numeric'}
                        maxLength = {7}
                        onChangeText={(LandlineNo) => { this.setState({ LandlineNo: LandlineNo }) }} />
                    <Text style={styles.highLight}>Birthday Date</Text>
                    <DatePicker
                        style={styles.TextInputStyle}
                        date={this.state.Bday}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
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
                          
                        }}
                        onDateChange={(date) => { this.setState({ Bday: date }) }}
                    />

                    <Text style={styles.highLight}>Remark</Text>
                    <TextInput
                        value={this.state.Remark}
                        placeholder="Remark"
                        style={styles.TextInputStyle}
                        underlineColorAndroid="transparent"
                        keyboardType='text'
                        onChangeText={(Remark) => { this.setState({ Remark: Remark }) }} />
                    <View style={styles.container1}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.getUpdate} >
                            <Text style={styles.TextStyle}>Update</Text>
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
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 22,
        color: '#008800',
        margin: 8,
    },
    highLight: {
        fontSize: 16,
        color: '#008800',
        marginLeft: 8,

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
    TextInputStyle:
    {
        borderWidth: 2,
        borderColor: '#009688',
        width: '90%',
        height: 40,
        margin: 8,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 8,
    },

    button: {
        width: '75%',
        height: 40,
        padding: 10,
        backgroundColor: '#8DC63F',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,

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

