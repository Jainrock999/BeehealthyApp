import React from 'react';
import {
    Alert,
    AsyncStorage,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    PermissionsAndroid,
    TouchableOpacity,
    View,
    YellowBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios';
let date = new Date();
let month;
let year;
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class LogoutActivity extends React.Component {

    state = {
        loading: false,
            latitude: null,
            longitude: null,
            error: null,
            myapikey:'AIzaSyA8taV_ms-TmzngL_3Lv2OY3aP3uuwtOY4',
            userlocation:'',
          };

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Logout',
        drawerLabel: 'Logout',
        headerTintColor: '#056839',
        headerStyle: {
            backgroundColor: '#8DC63F',
        },
        headerLeft: (
            <TouchableOpacity onPress={navigation.toggleDrawer}>
                <Icon name="md-menu"
                      style={{marginLeft: 10}} size={30} color="#056839"/>
            </TouchableOpacity>
        ),
    })
    
    
  

    getLocation = () => navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        this.setState({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
        })
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' +  position.coords.latitude + ',' + position.coords.longitude+'&key='+this.state.myapikey)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
                  console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0].formatted_address));
                  this.setState({userlocation:responseJson.results[0].formatted_address})
                })
    }, error => console.log(error))

componentWillMount() {
    this.setState({ loading: true })
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



    return fetch('http://attendanceapp.manukahealth.ph/api/bgapp_image')
    .then((response) => response.json())
    .then((responseJson) => {
console.log("rohit",responseJson)
      this.setState({
        dataSource: responseJson.BgImage,
    },
);

    })
    .catch((error) =>{
      console.error(error);
    });
  
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(p => {
    console.log(p);
    if (p) {
    this.getLocation();
    } else {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    .then(p => {
    console.log(p);
    this.getLocation()
    })
    }
    })
}
    getLogout = () => {
        AsyncStorage.getItem('LAST_ID')
            .then(last_id => {
                const formData = new FormData();
                formData.append('last_id', last_id);
                Axios.post('http://attendanceapp.manukahealth.ph/api/userlogout', formData,
                    {headers: {'Content-Type': 'multipart/form-data'}})
                    .then(p => {

                        if (p.data.status == 'True') {
                            console.log('helo.', p.data.status)
                            console.log('helo.', p)
                            AsyncStorage.clear();
                            this.props.navigation.navigate('Login')
                        } else {
                            // Alert.alert('', 'Try Again.')

                        }
                    }).catch(p => Alert.alert('Not Responding..'));

            })

    }


    render() {
        return (
            <View style={styles.container}> 
            < ImageBackground source={{uri:this.state.dataSource}} style={{ flex:1,
            resizeMode: 'cover'}} >
          <ScrollView >
         
       
                <View style={styles.container1}>
               
                    <Text style={styles.welcome1}>Logout Time and Location</Text>
            
                    <Text style={styles.TextStyles}>{this.state.datadate} </Text>
                    <Text style={styles.TextStyles}>{this.state.datatime} </Text>
                    <Text style={{ textAlign: 'center',color: '#F5FCFF',fontSize: 14}}>{this.state.userlocation} </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.getLogout}>
                        <Text style={styles.welcome}>Logout</Text>
                    </TouchableOpacity>
                    <StatusBar
                        backgroundColor="#056839"
                        barStyle="light-content"
                    />
           
                </View>
               
             

          </ScrollView>
          </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
        marginTop:5,
        
       
    },
    
    TextInputStyle:
        {
            borderWidth: 1,
            borderColor: '#009688',
            width: '90%',
            height: 40,
            margin: 10,
            borderRadius: 10,
            marginBottom: 10,
        },
    welcome1: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff',
        marginTop: 30,
    },
 
    button: {
        width: '45%',
        height: 40,
        backgroundColor: '#8DC63F',
        borderRadius: 10,
        marginTop:40,

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
    TextStyles: {
        fontSize: 50,
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff',
        marginTop: 10,
    },
});