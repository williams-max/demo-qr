import React, { useContext, useState, useEffect } from "react";
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView, Dimensions } from "react-native";
//import Swiper from 'react-native-swiper'
import { mowColors } from "../../values/Colors/MowColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MowContainer } from "../../components/ui/Core/Container/MowContainer";
import { mowStrings } from "../../values/Strings/MowStrings";
import { categoryStyle, gPadding } from "../../values/Styles/MowStyles";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { MowButton } from "../../components/ui/Common/Button/MowButton";
import MowTitleView from "../../components/ui/AppSpecifics/MowTitleView";
//import { MowCountDown } from "../../components/ui/AppSpecifics/CountDown/MowCountDown";
import { navigate, openDrawer } from "../../RootMethods/RootNavigation";
import { MowStarView } from "../../components/ui/AppSpecifics/StarView/MowStarView";

import { isTablet, navbarHeight, platform } from "../../values/Constants/MowConstants";
import SportShoe from "../../SampleData/Product/SportShoe";
import Laptop from "../../SampleData/Product/Laptop";

import { LineChart } from 'react-native-chart-kit';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import GetLocation from 'react-native-get-location';
import axios from "axios";
import { types } from "../../store/storeReducer";
import { StoreContext } from "../../store/StoreProvider";/* */
import useInterval from "use-interval";
import Device, { useDeviceName } from 'react-native-device-info';

const HomeScreen = () => {


    const [store, dispatch] = useContext(StoreContext)
    const { userActive } = store;
    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,

    });

    let deviceId = Device.getDeviceId();


    console.log("Device id ", deviceId)

    Device.getAndroidId().then((androidId) => {
        // androidId here
        console.log("android id ",androidId)
      });

      var uniqueId = Device.getUniqueId();
      console.log("uniqueID ",uniqueId)
   // console.log("usuario e home", userActive)
    const navigation = useNavigation();

    useEffect(() => {
        //     devovlerImei();
        procesos()

    }, [userActive]);


    const procesos = async () => {
      await  getLocation();
      apiValidarQr();

    }

    useInterval(() => {
        // Your custom logic here
        apiValidarQr();
      }, 60000);

    const getLocation = async () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                const current = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
                console.log(location.latitude);
                console.log(location.longitude);
                setOrigin(current)


            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }


    const apiValidarQr = async () => {

        const result = await axios.post(`http://localhost:8080/hello/validar-qr`, {
       
          
            "login": "uniqueId", // "client": "rrivera",
            "tokenConexion": "12366",
            "identificadorUUID": uniqueId,
            "latitud": origin.latitude,
            "longitud": origin.longitude
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

    const openDrawer = () => {

        navigation.dispatch(DrawerActions.openDrawer())
        // navigation.navigate("Info");
    }


    const _handleLoginQR = () => {
        // to update user login situation
        // new User().setLogin(true);
        // to let know the navigator user has login
        //this.context.setLogin(true);
        console.log("press btn QR")


        navigation.navigate("QrLogin")
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

              {/*  <TouchableOpacity
                    onPress={openDrawer}
                    style={{ flex: 1.5, alignItems: "center", zIndex: 1 }}>

                    <FAIcon
                        style={{ fontSize: hp("3%"), marginBottom: 5 }}
                        color={"black"}
                        name={'bars'} />

                </TouchableOpacity>*/}

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
                   {/* <Text style={{ color: 'black', fontWeight: 'bold' }}>Demo QR Scanner</Text>*/}

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
           {/* <Text style={{ textAlign: 'center', marginTop: 20, color: 'black' }}>User : {userActive}</Text>*/}
            {/* <Image
                    source={{uri : "https://www.lavanguardia.com/files/image_948_465/uploads/2020/02/07/5fa902b44316c.jpeg"}}
                    resizeMode={"contain"}
                    style={{
                        marginBottom: hp("3%"),
                        alignSelf: "center",
                        width: wp("70%"),
                        height: hp("50%")
                    }}/>*/}

            <View>
                <View
                    style={{ marginTop: hp(15), marginLeft: hp(7), marginRight: hp(7) }}>




                    <MowButton
                        buttonText={"QR scanner"}
                        onPress={() => { _handleLoginQR() }}
                        style={{ marginTop: hp("3%") }}
                        containerStyle={{
                            marginTop: hp("5%"), backgroundColor: '#FFF2CD',
                            borderWidth: 1,
                            borderColor: '#E3D081'
                        }}
                        textStyle={{ color: "black", fontWeight: "bold", letterSpacing: 0 }}
                        type={"default"} />

                </View>
            </View>

        </MowContainer >

    );

}

export default HomeScreen
