/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useContext } from 'react';
import GetLocation from 'react-native-get-location';
import { Card } from 'react-native-paper'
import {
    PermissionsAndroid,
    TouchableOpacity,
    Switch,
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import MapView, { Marker, Polyline, MarkerAnimated } from 'react-native-maps';
import axios from 'axios';
import useInterval from "use-interval";
import { MowContainer } from '../../components/ui/Core/Container/MowContainer';
import { navbarHeight } from '../../values/Constants/MowConstants';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { DrawerActions, useNavigation } from '@react-navigation/native';


import DeviceInformation from '../../device/DeviceInformation';
import Device, { useDeviceName } from 'react-native-device-info';
import { set } from 'react-native-reanimated';

const DeviceInfo = () => {


    const navigation = useNavigation();

    const [ip, setIP] = useState('')
    const [mac, setMac] = useState('')
    const [seriaNumber, setSerialNumber] = useState('')
    const [isEmulator, SetIsEmulator] = useState(true)
    const [imei, setImei] = useState('')

    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,

    });

    const openDrawer = () => {

        navigation.dispatch(DrawerActions.openDrawer())
        // navigation.navigate("Info");
    }


    // console.log("disitipo ",Device.getDeviceName())

    let deviceId = Device.getDeviceId();


    console.log("Device id ", deviceId)

    // console.log("es emulador ", Device.isEmulator())

    Device.getDeviceName().then((deviceName) => {
        // iOS: "Becca's iPhone 6"
        // Android: ?
        // Windows: ?
        console.log("Device name", deviceName)
    });


    Device.getIpAddress().then((ip) => {
        // "92.168.32.44"
        console.log("ip", ip)
        setIP(ip)
    });

    Device.getMacAddress().then((mac) => {
        // "E5:12:D8:E5:69:97"
        console.log("mac", mac)
        setMac(mac)
    });


    let model = Device.getModel();
    console.log("Model ", model)


 
    const obtenerSerialNumber = async () => {
        Device.getSerialNumber().then((serialNumber) => {
            // iOS: unknown
            // Android: ? (maybe a serial number, if your app is privileged)
            // Windows: ? (a serial number, if your app has the "capability smbios")
            console.log("Serial Number ", serialNumber)
            setSerialNumber(seriaNumber);
        });
    
    }

    Device.isEmulator().then((isEmulator) => {
        // false
        console.log("Es emulador", isEmulator)
        SetIsEmulator(isEmulator)
    });

    Device.getDevice().then((device) => {
        // "walleye"
        console.log("device ", device)
    });
    /*
    Device.getUniqueId().then((uniqueId) => {
      // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
      // Android: "dd96dec43fb81c97"
      // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
      console.log("uniqueID",uniqueId)
      });*/
    //console.log("id del dispositivo", DeviceInformation.getDeviceId())

    useEffect(() => {
        devovlerImei();
        getLocation()
        /*   const IMEI = require('react-native-imei');
           IMEI.getImei().then(imeiList => {
               console.log(imeiList)
               setImei(imeiList)
           });*/
    }, []);




    const getLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                current = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
                // console.log(location.latitude);
                // console.log(location.longitude);
                setOrigin(current)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

/*
    const devovlerImei = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("READ_PHONE_STATE good");
                obtenerSerialNumber();
                const IMEI = require('react-native-imei');
       

                const bandera = await Device.isEmulator().then((isEmulator) => {
                    // false
                    return isEmulator;
                    //console.log("Estas en un emulador");
                });

                console.log("valor de bandera",bandera)
                if (bandera == false) {

                    
                    IMEI.getImei().then(imeiList => {
                        console.log("res imei", imeiList)
                        setImei(imeiList)
                    });

                }

            } else {
                console.log("READ_PHONE_STATE bad");
            }
        } catch (err) {
            console.warn(err);
        }
    }*/
    /*
     const IMEI = require('react-native-imei');
     IMEI.getImei().then(imeiList => {
         console.log("res imei", imeiList)
     });*/

    return (
        <MowContainer
            footerActiveIndex={1}
            navbar={false}>

            {/* home screen navbar */}
            <View
                style={{
                    height: navbarHeight,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    flexDirection: 'row',
                    backgroundColor: 'white',
                }}>

                {/* search button */}
                <TouchableOpacity
                    onPress={openDrawer}
                    style={{ flex: 1.5, alignItems: "center", zIndex: 1 }}>

                    <FAIcon
                        style={{ fontSize: hp("3%"), marginBottom: 5 }}
                        color={"black"}
                        name={'bars'} />

                </TouchableOpacity>

                {/* logo view */}
                <View
                    style={{
                        width: "100%",
                        alignSelf: "center",
                        marginLeft: 80,
                        justifyContent: "center",
                        flex: 7
                    }}>

                    {/* logo with text */}
                    {/*   <Image
                  source={require("../../assets/logo/logo.png")}
                  style={{ height: hp("12%") }}
                  resizeMode={"contain"} />*/}
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Demo Geolocation Rosil</Text>

                </View>


                {/* user button 
              <TouchableOpacity
                  onPress={() => {openDrawer()}}
                  style={{flex: 1.5, alignItems: "center"}}>
  
                  <FAIcon
                      style={{fontSize: hp("3%")}}
                      color={"white"}
                      name={'bars'}/>
  
              </TouchableOpacity>*/}

            </View>

            <Card style={{ marginLeft: 10 }}>

                <Card.Actions>
                    <Text style={{ fontSize: 16 }}>Device ID: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{deviceId}</Text>
                </Card.Actions>

                <Card.Actions>
                    <Text>IP: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{ip}</Text>
                </Card.Actions>
                <Card.Actions>
                    <Text>Coordinates: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{origin.latitude} , {origin.longitude}</Text>
                </Card.Actions>
                <Card.Actions>
                    <Text >Mac ADDRESS: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{mac}</Text>
                </Card.Actions>
                <Card.Actions>
                    <Text>Model: </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{model}</Text>
                </Card.Actions>

                <Card.Actions>
                    <Text>Serial Number: </Text>
                    {seriaNumber == '' ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>undefined</Text> :
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{seriaNumber}</Text>}

                </Card.Actions>
                <Card.Actions style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text>is Emulator ?: {isEmulator}</Text>
                    {isEmulator == false ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>false</Text> :
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>true</Text>}
                </Card.Actions>
                <Card.Actions>
                    <Text>Imei: </Text>
                    {imei == '' ? <Text style={{ fontWeight: 'bold', fontSize: 16 }}>undefined</Text> :
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{imei}</Text>
                    }

                </Card.Actions>
            </Card>
        </MowContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    texto: {
        color: 'black'
    },
    textobtn: {
        backgroundColor: 'white', padding: 2,
        backgroundColor: 'black'
    }
    , textsimple: {
        color: 'white', fontWeight: 'bold'
    }
    , btnswitch: {

    }

});

export default DeviceInfo;