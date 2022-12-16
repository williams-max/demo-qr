import React, { useContext, useState, useRef ,useEffect} from "react";

import { Text, Linking, View, StyleSheet, 
    Alert,AppRegistry, Image, FlatList, TouchableOpacity, ScrollView, Dimensions } from "react-native";
//import Swiper from 'react-native-swiper'
import { mowColors } from "../../values/Colors/MowColors";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MowContainer } from "../../components/ui/Core/Container/MowContainer";
import { mowStrings } from "../../values/Strings/MowStrings";
import { categoryStyle, gPadding } from "../../values/Styles/MowStyles";
import FAIcon from "react-native-vector-icons/FontAwesome";
import IoniIcon from "react-native-vector-icons/Ionicons";
import { MowButton } from "../../components/ui/Common/Button/MowButton";
import MowTitleView from "../../components/ui/AppSpecifics/MowTitleView";
//import { MowCountDown } from "../../components/ui/AppSpecifics/CountDown/MowCountDown";
import { navigate, openDrawer } from "../../RootMethods/RootNavigation";
import { MowStarView } from "../../components/ui/AppSpecifics/StarView/MowStarView";

import { isTablet, navbarHeight, platform } from "../../values/Constants/MowConstants";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { LineChart } from 'react-native-chart-kit';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { types } from "../../store/storeReducer";
import { StoreContext } from "../../store/StoreProvider";
import axios from "axios";
import GetLocation from 'react-native-get-location';
import useInterval from "use-interval";
import Device, { useDeviceName } from 'react-native-device-info';

const QrLogin = () => {


    const [store, dispatch] = useContext(StoreContext)
    const { userActive } = store;
    const [resultado, setResultado] = useState('')
    const [sms, setSms] = useState('')

    const [valor, setValor] = useState(true)

    var uniqueId = Device.getUniqueId();
   // console.log("usuario e home", userActive)
    const navigation = useNavigation();
    const [origin, setOrigin] = useState({
        latitude: 0,
        longitude: 0,

    });


    useEffect(() => {
        //     devovlerImei();
        procesos()

    }, []);


    const procesos = async () => {
      await  getLocation();
      apiValidarQr();

    }

    useInterval(() => {
        // Your custom logic here
        apiValidarQr();
      }, 5000);

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
       
          
            "login": "condo", // "client": "rrivera",
            "tokenConexion": "12366",
            "identificadorUUID": uniqueId,
            "latitud": origin.latitude,
            "longitud": origin.longitude
        })
            .then(
                res => {

                    console.log("call")
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

                    console.log("error ",err)
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

    const onSuccess = async (e) => {
        setResultado(e.data)
        setValor(false)
        Alert.alert(
            "Resultado ",
            e.data,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
        /*try {
            const result = await axios.post(`https://geolocationrosil.herokuapp.com/geo/updateConexion`, {
                "client": e.data,
           
            })

            console.log("result " ,result.data)
            setSms("Welcome");
           // setRespuesta(result.data.continueFlow)

        } catch (error) {
          
            console.log(error)
        }*/

        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    const btnBack = () => {
        console.log("press btn back")
        navigation.navigate("HomeScreen")
    }

    let scanner = useRef(null);

    const volverACaputurar = () => {
        scanner.reactivate()
      // setValor(true)
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

             <TouchableOpacity
                    onPress={btnBack}
                    style={{ flex: 1.5, alignItems: "center", zIndex: 1 }}>

                    <IoniIcon
                        style={{ fontSize: hp("4%"), marginBottom: 5 }}
                        color={"black"}
                        name={'ios-arrow-back-circle-sharp'} />

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
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Demo QR Scanner</Text>

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

            <QRCodeScanner
                cameraContainerStyle={{ width: '80%', borderWidth: 1, borderColor: 'white', alignSelf: 'center', }}
                cameraStyle={{ width: '97%', alignSelf: 'center', }}

                onRead={onSuccess}
                // flashMode={RNCamera.Constants.FlashMode.torch}
              //  reactivate={valor}
                showMarker={true}

               ref={node => { scanner = node;}}

            />
            <Text style={{ textAlign: 'center', marginTop: 20, color: 'black' }}>  {sms}

            </Text>
            <MowButton
                buttonText={"Volver a Capturar"}
                onPress={() => { volverACaputurar() }}
                style={{ marginTop: hp("3%") }}
                containerStyle={{
                    marginTop: hp("5%"), backgroundColor: '#FFF2CD',
                    borderWidth: 1,
                    borderColor: '#E3D081'
                }}
                textStyle={{ color: "black", fontWeight: "bold", letterSpacing: 0 }}
                type={"default"} />

        </MowContainer>

    );

}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    containerQr: {
        height: '50%'
    }

});


export default QrLogin
