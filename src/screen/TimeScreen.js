import React from 'react';
//import {Platform,StyleSheet,ListView} from 'react-native';
import {Image,Axios,ImageBackground,AsyncStorage, ScrollView, StatusBar,PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
export default class TimeActivity extends React.Component {

state = {
    loading: false,
    latitude: null,
    longitude: null,
    error: null,
    myapikey:'AIzaSyA8taV_ms-TmzngL_3Lv2OY3aP3uuwtOY4',
    userlocation:'',
  };

  static navigationOptions =
           {
               title: 'Login Time ',
              headerLeft: null,
              
  headerTintColor: '#056839',
              headerStyle: {
                  backgroundColor: '#8DC63F',
              },
         };


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
    AsyncStorage.getItem('LOGINDATE').then(time =>this.setState({timeset: time}));
 AsyncStorage.getItem('LOGINTIME').then(value => this.setState({ timedate: value }));


return fetch('http://attendanceapp.manukahealth.ph/api/bgapp_image')
.then((response) => response.json())
.then((responseJson) => {
console.log("rohit",responseJson)
this.setState({
    isLoading: false,
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
getnext = () => {
            this.props.navigation.navigate('App');  
}


render() {
return (
    <View style={styles.container}>
    < ImageBackground source={{uri:this.state.dataSource}} style={{ flex:1
       }} >

    <ScrollView >
        <View style={styles.container1}>
            <Text style={styles.welcome1}>Login Time and Location</Text>
            <Text style={styles.TextStyles}>{this.state.timedate} </Text>
            <Text style={styles.TextStyles}>{this.state.timeset} </Text>
            <Text style={{ textAlign: 'center',color: '#F5FCFF',fontSize: 14}}>{this.state.userlocation} </Text>
            <TouchableOpacity
                         style={styles.button}
                        onPress={this.getnext}>          
                           <Text style={styles.welcome}>EXIT</Text>
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
        backgroundColor: '#33CC00',
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