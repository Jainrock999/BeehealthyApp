import React, { Component } from 'react';
import { AsyncStorage, FlatList, View, ScrollView, StatusBar, Alert, ActivityIndicator, Text, Picker, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios';

export default class ReAssignSchedule extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Reassigned Schedule',
    drawerLabel: 'Reassigned Schedule',
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


  state = {
    loading: false,
    error: false,
    projectId:'',
  }
  getItem(projectid) {
    console.log('projectid'+projectid)
    this.props.navigation.navigate('ResignDetailsScreen', { projectid })

  }

  componentDidMount = () => {
    this.setState({ loading: true })
    AsyncStorage.getItem('USER_ID')
      .then(user_Id => {
        const formData = new FormData();
        formData.append('userid', user_Id);
        console.log(user_Id);
        Axios.post('http://attendanceapp.manukahealth.ph/api/project_reassign', formData,
          { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(p => {
            this.setState({ loading: false })
            console.log(p);
            if (p.data.status == 'true') {
              const responseJson = p.data.rows;
              this.setState({
                isLoading: false,
                data: responseJson
              },
              );
            } else {
              Alert.alert('No Reassigned Schedule Available')
            }
          }).catch(p => console.log(p));

      })

  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.getItem(projectid=item.ProjectID)}>

              <View style={styles.items}>
                <Text style={styles.TextFoget}>{'Title:' + item.ProjectTitle}</Text>
                <Text style={styles.TextFoget}>{'Description:' + item.Description}</Text>
              </View>

            </TouchableOpacity>}
        />
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
    flex: 1
  },
  items: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#8DC63F',
  },
  uploadAvatar: {
    width: 100,
    height: 80,
  },
  TextFoget: {
    fontSize: 16,
    color: '#fff',

  },

})
