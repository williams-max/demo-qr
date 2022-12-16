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

import MapView, { Marker, Polyline, MarkerAnimated, Polygon } from 'react-native-maps';
import axios from 'axios';
import useInterval from "use-interval";
import { MowContainer } from '../../components/ui/Core/Container/MowContainer';
import { navbarHeight } from '../../values/Constants/MowConstants';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StoreContext } from "../../store/StoreProvider";

const Registerpoint = () => {

    const [store, dispatch] = useContext(StoreContext)
    const { userActive } = store;

    console.log("Register show points", userActive)

    const [checked, setchecked] = useState(false);

    const [count, setCount] = useState(1);

    const toggleSwitch = (previousState) => {
        console.log("valor toggle ", previousState)
        setchecked(previousState)
    }

    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,

    });

    let current = {
        latitude: -17.392236,
        longitude: -66.277671,
    }

    // time controller  30 seg = 30*1000
    const [delay, setDelay] = useState(30000)


    const navigation = useNavigation();

    const openDrawer = () => {

        navigation.dispatch(DrawerActions.openDrawer())
        // navigation.navigate("Info");
    }

    useInterval(
        () => {
            // Your custom logic here
            console.log("api activated")
            getLocation();
            apicallGeoLatLonNotAlert()
            setCount(count + 1)
        },


        // Delay in milliseconds or null to stop it
        checked ? delay : null,
    )

    useEffect(() => {
        //  console.log("entre")
        getLocation()

    }, [])


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

    const apicallGeoLatLonNotAlert = async () => {

        const result = await axios.post(`https://geolocationrosil.herokuapp.com/geo/saveGeoLatLon`, {
            "user": "scondo",
            "token": "token",
            "client": userActive, // "client": "rrivera",
            "latitude": origin.latitude,
            "longitude": origin.longitude
        })
            .then(
                res => {

                    console.log(res.data)
                    if (res.data.continueFlow == false) {

                        Alert.alert(
                            "something went wrong",

                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
                    /*
                              Alert.alert(
                                "Resultado",
                                `${res.data.message}`,
                                [
                                  {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                  },
                                  { text: "OK", onPress: () => console.log("OK Pressed") }
                                ]
                              );*/
                    // setDataLiveGame(res.data);
                }
            ).catch(
                err => {

                    /* Alert.alert(
                       "Resultado",
                       "intente de nuevo",
                       [
                         {
                           text: "Cancel",
                           onPress: () => console.log("Cancel Pressed"),
                           style: "cancel"
                         },
                         { text: "OK", onPress: () => console.log("OK Pressed") }
                       ]
                     );*/
                }
            );

    }


    const polyline = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
    ]

    const multiPolyline = [
        [
            [51.5, -0.1],
            [51.5, -0.12],
            [51.52, -0.12],
        ],
        [
            [51.5, -0.05],
            [51.5, -0.06],
            [51.52, -0.06],
        ],
    ]

    const polygon = [
        { latitude: -17.395866, longitude: -66.171709 },
        { latitude: -17.379602, longitude: -66.183019 },
        { latitude: -17.375488, longitude: -66.141068 },
    ]

    const polygonStart = [
        [-17.479050, -67.642679],
        [-17.756112, -67.110280],
        [-17.575603, -66.835914],
        [-17.145394, -66.963298],
        [-16.858032, -67.335651],
        [-16.948661, -67.636147],
    ]

    const multiPolygon = [
        [
            [-16.539416, -68.219118],
            [-16.472477, -68.183394],
            [-16.513191, -68.141137],
        ],
        [
            [51.51, -0.05],
            [51.51, -0.07],
            [51.53, -0.07],
        ],
    ]

    const rectangle = [
        [-17.111389, -68.202077],
        [-17.254930, -67.491667],
    ]

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


            <MapView style={styles.map}

                region={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04
                }}

                onPress={(event) => setOrigin(event.nativeEvent.coordinate)}


            >
                <Marker
                    draggable
                    coordinate={origin}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                />

            </MapView>
            <Card.Actions style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                {/*  <TouchableOpacity style={styles.textobtn}
                    onPress={() => updateCoor()}
                >
                    <Text style={styles.textsimple}>Actulizar coordenas</Text>
                </TouchableOpacity>*/}
                <Switch
                    style={styles.btnswitch}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={checked ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={checked}
                />
                <Text style={styles.texto}>{count}: lat : {origin.latitude}, long {origin.longitude}</Text>


            </Card.Actions>


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
        height: '70%'
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

export default Registerpoint;