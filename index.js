/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import {AsyncStorage} from 'react-native';

PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN11', token);
        AsyncStorage.setItem('Token_id',  token.token);
    },
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: false,
    requestPermissions: true,
    senderID: '561304436771'
});
AppRegistry.registerComponent(appName, () => App);