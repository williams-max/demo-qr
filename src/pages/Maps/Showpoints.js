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

import MapView, { Marker, Polyline, MarkerAnimated } from 'react-native-maps';
import axios from 'axios';
import useInterval from "use-interval";
import { MowContainer } from '../../components/ui/Core/Container/MowContainer';
import { navbarHeight } from '../../values/Constants/MowConstants';
import FAIcon from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { DrawerActions, useNavigation } from '@react-navigation/native';



import { StoreContext } from "../../store/StoreProvider";

const Showpoints = () => {


  const [store, dispatch] = useContext(StoreContext)
  const { userActive } = store;

  console.log("page show points", userActive)

  const [checked, setchecked] = useState(false);

  const [count, setCount] = useState(1);

  const [coord, setCoord] = useState([])

  const [coordup, setCoordup] = useState([])

  const pathTest = []

  const bandera = false;

  const toggleSwitch = (previousState) => {
    console.log("valor toggle ", previousState)
    setchecked(previousState)
  }

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,

  });

  let current = {
    latitude: 0,
    longitude: 0,
  }

  // time controller  30 seg = 30*1000
  const [delay, setDelay] = useState(30000)


  const coordinates = [
    { latitude: -17.4164009, longitude: -66.2724298 },
    {
      latitude: 22.306885,
      longitude: 70.780538,
    },
    {
      latitude: 22.310696,
      longitude: 70.803152,
    },
    {
      latitude: 22.293067,
      longitude: 70.791559,
    },
    {
      latitude: 22.306885,
      longitude: 70.780538,
    },
  ];


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
      apicallGeoLatLonNotAlert()
      setCount(count + 1)
    },


    // Delay in milliseconds or null to stop it
    checked ? delay : null,
  )*/

  useEffect(() => {
    //  console.log("entre")
   // getLocation()

    /**Coordenades */
    getDataCoords()

  }, [])


  /*update call minute */
  useInterval(() => {

    getDataCoords()
  }, 60000);


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
      "latitude": origin.latitude,
      "longitude": origin.longitude
    })
      .then(
        res => {

          console.log(res.data)
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


      <MapView style={styles.map}

        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}

        onPress={(event) => setOrigin(event.nativeEvent.coordinate)}


      >

        <Polyline
          coordinates={coordup}
          strokeColor="#000"
          strokeColors={['#7F0000']}
          strokeWidth={3}
        />
        {/* <Marker
                     draggable
                     coordinate={origin}
                     onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                 />*/}
        {coord.points?.map((place, id) => {
          return (
            <Marker
              key={id}

              coordinate={{ latitude: Number(place.latitude), longitude: Number(place.longitude) }}
            />
          );
        })}
      </MapView>
      {/* <Card.Actions style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
 
               <TouchableOpacity style={styles.textobtn}
                     onPress={() => updateCoor()}
                 >
                     <Text style={styles.textsimple}>Actulizar coordenas</Text>
                 </TouchableOpacity>
                 <Switch
                     style={styles.btnswitch}
                     trackColor={{ false: "#767577", true: "#81b0ff" }}
                     thumbColor={checked ? "#f5dd4b" : "#f4f3f4"}
                     ios_backgroundColor="#3e3e3e"
                     onValueChange={toggleSwitch}
                     value={checked}
                 />
                 <Text style={styles.texto}>{count}: lat : {origin.latitude}, long {origin.longitude}</Text>
 
 
             </Card.Actions>*/}


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

export default Showpoints;