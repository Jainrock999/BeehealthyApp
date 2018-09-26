import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, Dimensions, ActivityIndicator, YellowBox, StatusBar, ScrollView, ListView, Text, View, Image, PermissionsAndroid, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Axios from 'axios';
import PDFView from 'react-native-view-pdf';


import RNFetchBlob from 'rn-fetch-blob';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class PdfActivity extends React.Component {

    static navigationOptions =
        {
            title: 'Pdf ',
            headerTintColor: '#056839',
            headerStyle: {
                backgroundColor: '#8DC63F',
            },
        };
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pdfUrl: null,
            filename: null,

            data: []
        }
    }
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,], )
            console.log(granted);
            if (granted[0] === PermissionsAndroid.RESULTS.GRANTED && granted[1] === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    getdownload = () => {
        this.setState({
            isLoading: true,

        },
        );
        let dirs = RNFetchBlob.fs.dirs
        this.requestCameraPermission()
            .then(p => {
                RNFetchBlob
                    .config({
                        // DCIMDir is in external storage

                        notification: true,
                        path: dirs.DownloadDir + this.state.filename
                    })
                    .fetch('GET', this.state.pdfUrl)
                    .then((res) => {
                        console.log(res);
                        return RNFetchBlob.fs.scanFile([{ path: res.path(), mime: 'text/plain' }])
                    })
                    .then((res) => {
                        // scan file successcon
                        console.log('success', res);
                        Alert.alert("Success", "File Downloaded")
                        this.setState({
                            isLoading: false,

                        },
                        );
                    })
                    .catch((err) => {
                        // scan file error
                        console.log('err', err)
                        Alert.alert("Not Success", "File is not Download")
                        this.setState({
                            isLoading: false,

                        },
                        );
                    })

            })
    }


    componentDidMount() {
        this.setState({
            isLoading: true,

        },
        );
        const props = this.props.navigation.getParam('memoid');
        console.log(props, this.props.navigation.state);
        AsyncStorage.getItem('USER_ID')
            .then(userid => {
                console.log('user id : ', userid);

                Axios.get(`http://attendanceapp.manukahealth.ph/api/memostatus?userid=${userid}&memoid=${props}&status='SEEN'`, )
                    .then(p => {
                        console.log('reponcerohit', p.data.status)
                        if (p.data.status == 'True') {
                            const pdfurl = p.data.rows;
                            console.log('jjj', pdfurl.MemoFile)
                            var getname = pdfurl.MemoFile;
                            console.log('spilt', pdfurl.MemoFile)
                            var res = getname.split("http://attendanceapp.manukahealth.ph/uploads/");
                            this.setState({ filename: res })
                            console.log('spilt11', res)
                            if (pdfurl.MemoFile == "") {
                                Alert.alert("There is no memo right now")
                                this.setState({
                                    isLoading: false,

                                },
                                );
                            } else {
                                this.setState({ pdfUrl: pdfurl.MemoFile })
                                console.log('jjj', pdfurl)
                                this.setState({
                                    isLoading: false,

                                },
                                );
                            }
                        } else {
                            Alert.alert('Pdf Not Found')
                            this.setState({
                                isLoading: false,

                            },
                            );
                        }
                    }).catch(p => console.log('Not Responding!', p));


            })

    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <TouchableOpacity
                    onPress={this.getdownload}>
                    <Image source={require('../assets/images/download.png')} style={styles.ImageStyle} />
                </TouchableOpacity>

                <PDFView
                    style={{ flex: 1 }}
                    onError={(error) => console.log('onError', error)}
                    // data={this.state.data}     

                    resource={this.state.pdfUrl}

                    resourceType="url"
                />
                <StatusBar
                    backgroundColor="#056839"
                    barStyle="light-content"
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    ImageStyle: {
        marginLeft: 150,
        marginTop: 10,
        width: 30,
        backgroundColor: '#fff',
        height: 30,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }

});
