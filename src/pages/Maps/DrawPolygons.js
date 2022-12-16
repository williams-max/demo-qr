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

const DrawPolygons = () => {

    const [store, dispatch] = useContext(StoreContext)
    const { userActive } = store;

    console.log("draw points", userActive)

    const [checked, setchecked] = useState(false);

    const [count, setCount] = useState(1);


    const [coord, setCoord] = useState([])

    const [coordup, setCoordup] = useState([])

    const pathTest = []

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

    /*
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
    )*/

    useEffect(() => {
        //  console.log("entre")
       // getLocation()
        getDataCoords();
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

    const getDataCoords = async () => {

        const result = await axios.post(`https://geolocationrosil.herokuapp.com/geo/getGeoLatLon`, {
            "user": "scondo",
            "token": "token",
            "client": userActive //  "client": "rrivera"
        })
            .then(
                res => {

                    //  setMesage(res.data)
                    // alert(res.data.message)
                    setCoord(res.data)
                    console.log("coordenas ", res.data.points)


                    //  if (! bandera ) {
                    console.log("aqui")
                    for (let i = 0; i < res.data.points.length; i++) {

                        /*Eres el ultimo*/
                        if (i == 0) {
                            let current = {
                                latitude: Number(res.data.points[i].latitude),
                                longitude: Number(res.data.points[i].longitude),
                            }
                            setOrigin(current)
                        }
                        //console.log("test ", i)
                        pathTest.push({ latitude: Number(res.data.points[i].latitude), longitude: Number(res.data.points[i].longitude) })

                    }

                    setCoordup(pathTest)

                    console.log("unicos test ", pathTest)
                    /** */
                    /*  if(i== res.data.points.length){
                        bandera=true;
                      
                      //  return;  
                      }*/
                    //  }


                    // setDataLiveGame(res.data);
                }
            ).catch(
                err => {
                    console.log(err)
                }
            );
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

    const polygonlapaz = [


        { latitude: -16.49606, longitude: -68.13526 },
        { latitude: -16.49337, longitude: -68.13351 },
        { latitude: -16.494996, longitude: -68.130689 },
        { latitude: -16.49773, longitude: -68.13242 },

    ]
    const polygon = [
        { latitude: -17.395866, longitude: -66.171709 },
        { latitude: -17.379602, longitude: -66.183019 },
        { latitude: -17.375488, longitude: -66.141068 },
    ]

    const polygonStart = [
        { latitude: -17.479050, longitude: -67.642679 },
        { latitude: -17.756112, longitude: -67.110280 },
        { latitude: -17.575603, longitude: -66.835914 },
        { latitude: -17.145394, longitude: -66.963298 },
        { latitude: -16.858032, longitude: -67.335651 },
        { latitude: -16.948661, longitude: -67.636147 },
    ]

    const multiPolygon = [

        { latitude: -16.539416, longitude: -68.219118 },
        { latitude: -16.472477, longitude: -68.183394 },
        { latitude: -16.513191, longitude: -68.141137 },


    ]

    const rectangle = [
        { latitude: -17.111389, longitude: - 68.202077 },
        { latitude: -17.254930, longitude: -67.491667 },
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
                <Polyline
                    coordinates={coordup}
                    strokeColor="#000"
                    strokeColors={['#7F0000']}
                    strokeWidth={3}
                />
                {coord.points?.map((place, id) => {
                    return (
                        <Marker
                            key={id}

                            coordinate={{ latitude: Number(place.latitude), longitude: Number(place.longitude) }}
                        />
                    );
                })}
                <Polygon fillColor={'rgba(255, 0, 0, 0.2)'} coordinates={polygonlapaz} />
                <Polygon fillColor={'rgba(255, 0, 0, 0.2)'} coordinates={polygon} />
                <Polygon fillColor={'rgba(255, 0, 0, 0.2)'} coordinates={polygonStart} />
                <Polygon fillColor={'rgba(255, 0, 0, 0.2)'} coordinates={multiPolygon} />
                {/*<Rectangle bounds={rectangle} pathOptions={blackOptions} />*/}



            </MapView>



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

export default DrawPolygons;