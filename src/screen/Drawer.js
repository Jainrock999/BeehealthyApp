import React from 'react';
import { AsyncStorage, View, Alert, ScrollView, ActivityIndicator, Text, Picker, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
export default class MyDrawer extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            name: '',
            mobile: '',

        }
    }
    getdrawer = () => {

        this.props.navigation.navigate('Dashboard');
    }
    getprofile = () => {

        this.props.navigation.navigate('Profile');
    }
    renderDrawerItem = (route) => {
        const onpress = (route.key === 'Logins') ?
            () => AsyncStorage.clear().then(p => this.props.navigation.navigate(route.key))
            : () => this.props.navigation.navigate(route.key)
        return (
            <TouchableOpacity onPress={onpress} style={{ flexDirection: 'row', padding: 8, marginLeft: 10, marginRight: 10 }}>
                <Icon name={route.icon} size={30} />
                <Text style={{ padding: 8, marginLeft: 10, marginRight: 10, fontSize: 16, }}>{route.label}</Text>
            </TouchableOpacity>
        )
    }
    componentDidMount() {
        AsyncStorage.getItem('NAME')
            .then(Name => {
                this.setState({ name: Name })
            })
    }
    render() {

        return (
            <ScrollView >
                <View style={{}}>

                    <View style={styles.bluebox}>
                        <TouchableOpacity
                            onPress={this.getdrawer}>
                            <Image source={require('../assets/images/logo.jpg')} style={styles.ImageStyle} />
                        </TouchableOpacity>
                    
                        <TouchableOpacity
                            onPress={this.getprofile}>
                            <Text style={styles.TextStyle}>{this.state.name}</Text>
                        </TouchableOpacity>
                    </View>

                    {this.renderDrawerItem({ icon: 'md-home', label: 'Dashboard', key: 'Dashboard' })}
                    {this.renderDrawerItem({ icon: 'ios-contacts', label: 'Profile', key: 'Profile' })}
                    {this.renderDrawerItem({ icon: 'md-time', label: 'TimeIn/TimeOut', key: 'Attendence' })}
                    {this.renderDrawerItem({ icon: 'md-calendar', label: 'Schedule', key: 'Schedule' })}
                    {this.renderDrawerItem({ icon: 'md-calendar', label: 'Assigned Schedule', key: 'AssignScreen' })}
                    {this.renderDrawerItem({ icon: 'md-calendar', label: 'Reassigned Schedule', key: 'ReSignedSchedule' })}
                    {this.renderDrawerItem({ icon: 'md-calendar', label: 'Accepted Schedule', key: 'Confirm' })}
                    {this.renderDrawerItem({ icon: 'md-calendar', label: 'Completed Schedule', key: 'CompleteSchedule' })}
                    {this.renderDrawerItem({ icon: 'ios-contacts', label: 'Change Password', key: 'ChangePassword' })}
                    {this.renderDrawerItem({ icon: 'ios-list-box', label: 'View Memo', key: 'Memo' })}
                    {this.renderDrawerItem({ icon: 'md-log-out', label: 'Logout', key: 'logout' })}

                </View>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        //  backgroundColor: '#fff',

    },
    bluebox: {
        width: '100%',
        height: 130,

        backgroundColor: '#056839'
    },
    ImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        width: '90%',
        marginLeft: 10,
        height: 70,
    },
    TextStyle: {
        textAlign: 'center',
        color: '#F5FCFF',

        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
    },
})