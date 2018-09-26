import React, { Component } from "react";
import RootStack from "./src/navigation";
import PushNotification from "react-native-push-notification";
// YellowBox.ignoreWarnings(['Warning: isMoussnted(...) is deprecated'])

export default class App extends React.Component {
    componentDidMount() {
    }
render() {
return <RootStack />;
}
}

