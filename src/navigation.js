import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SplashScreen from './screen/SplashScreen';
import LoginScreen from './screen/LoginScreen';
import TimeScreen from './screen/TimeScreen';
import DrawerScreen from './screen/DrawerScreen';
import ForgetScreen from './screen/ForgetScreen';
import ProfileScreen from './screen/ProfileScreen';
import LogoutActivity from './screen/LogoutScreen';
import ViewMemoScreen from './screen/ViewMemoScreen';
import CameraScreen from './screen/CamaraScreen';
import ConfirmScreen from './screen/ConfirmSchedule';
import ScheduleScreen from './screen/ScheduleScreen';
import AssignSchedule from './screen/AssignSchedule';
import ReSignedSchedule from './screen/ResignSchedule';
import AssignedDetailsScreen from './screen/AssignedScheduleDetails';
import CompleteSchedule from './screen/CompleteSchedule';
import CompleteDetailsScreen from './screen/CompletedDetails';
import ReassignDetailsScreen from './screen/ReassignedDetails';
import ConfirmDetailsScreen from './screen/ConfirmDetails';

import Drawer from './screen/Drawer';
import ViewAttendenceSrceen from './screen/ViewAttendenceSrceen';
import PdfScreen from './screen/PdfMemo'
import { TouchableOpacity } from "react-native";
import React from "react";
import ChangePassScreen from './screen/ChangePassword';
import Icon from 'react-native-vector-icons/Ionicons'


const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
    },
    Forget: {
        screen: ForgetScreen,
    },
    Time: {
        screen: TimeScreen,
    },

});
const TimeStack = createStackNavigator({
    Time: {
        screen: TimeScreen,
    },

})

const DrawerStack = createStackNavigator({
    DrawerScreen: {
        screen: DrawerScreen,
    },
    CamScreen: {
        screen: CameraScreen,
    },

})
    // {
    //     navigationOptions: ({ navigation }) => ({
    //         headerTitle: 'Dashboard',
    //         drawerLabel: 'Dashboard',
    //         headerLeft: (
    //             <TouchableOpacity onPress={navigation.toggleDrawer}>
    //                 <Icon name="md-menu"
    //                     style={{ marginLeft: 10 }} size={30} color="#056839" />
    //             </TouchableOpacity>
    //         ),
    //     }),
   // });

const ProfilerStack = createStackNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
        headerLeft: <Icon name="md-menu" size={35} />

    },

}, )
const MemoStack = createStackNavigator({
    MemoScreen: {
        screen: ViewMemoScreen,
    },
    Pdf: {
        screen: PdfScreen,
    },
})

const ChangePassstack = createStackNavigator({
    ChangeScreen: {
        screen: ChangePassScreen,
    },
})
const SchduleStack = createStackNavigator({
    ScheduleScreen: {
        screen: ScheduleScreen,
    },
})
const AttendenceStack = createStackNavigator({
    AttendenceScreen: {
        screen: ViewAttendenceSrceen,
    },
})

const AssignStack = createStackNavigator({
    AssignScreen: {
        screen: AssignSchedule,
    },
    AssignedDetailsScreen: {
        screen: AssignedDetailsScreen,
    },
})
    

const CompleteStack = createStackNavigator({
    CompleteScreen: {
        screen: CompleteSchedule,
    },
    CompleteDetailsScreen:{
        screen:CompleteDetailsScreen,
    },
})
const ResignStack = createStackNavigator({
    Resign: {
        screen: ReSignedSchedule,
    },
ResignDetailsScreen:{
    screen:ReassignDetailsScreen,
},
})
const ConfirmStack = createStackNavigator({
    Resign: {
        screen: ConfirmScreen,
    },
    ConfirmDetailsScreen:{
        screen:ConfirmDetailsScreen,
    },
})
const LogoutStack = createStackNavigator({
    LogoutScreen: {
        screen: LogoutActivity,

    },
})


const AppStack = createDrawerNavigator(
    {
        Dashboard: DrawerStack,
        Profile: ProfilerStack,
        Memo: MemoStack,
        Schedule: SchduleStack,
        ChangePassword: ChangePassstack,
        Attendence: AttendenceStack,
        logout: LogoutStack,
        AssignScreen: AssignStack,
        CompleteSchedule: CompleteStack,
        ReSignedSchedule: ResignStack,
        Confirm: ConfirmStack,
    },
    {
        initialRouteName: 'Dashboard',
        contentComponent: Drawer,
    }
);
export default createSwitchNavigator(
    {
        AuthLoading: SplashScreen,
        Time: TimeStack,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);