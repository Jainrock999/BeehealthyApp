import React, { Component } from 'react';
import { AsyncStorage, FlatList, View, ScrollView,StatusBar, Alert, ActivityIndicator, Text, Picker, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Axios from 'axios';

export default class AcceptSchedule extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Accept Schedule',
    drawerLabel: 'Accept Schedule',
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
   
  }
  getItem(pid, ptitle, pdesc) {
    console.log(pid + ptitle + pdesc);
    mystate = {
        projectid:pid,
        projecttitle:ptitle,
        projectdesc:pdesc,
    }

    this.props.navigation.navigate('AcceptReassignScreen', { mystate: mystate})

  }

  componentDidMount = () => {
    this.setState({ loading: true })
    AsyncStorage.getItem('USER_ID')
      .then(user_Id => {
        const formData = new FormData();
        formData.append('UserID',user_Id);
        console.log(user_Id);
        Axios.post('http://attendanceapp.manukahealth.ph/api/project_detail', formData,
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
              Alert.alert('No Accepted Schedule')
              this.setState({
                isLoading: false,
              },
              );
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
            <TouchableOpacity onPress={() => this.getItem(item.ProjectID, item.ProjectTitle, item.Description)}>
             
                <View style={styles.items}>
                <Text style={{ color: '#fff' }}>{'Title : ' + item.ProjectTitle}</Text>
                <Text style={{ color: '#fff' }}>{'Description : ' + item.Description}</Text>
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

})
