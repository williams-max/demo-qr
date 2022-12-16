import React, { useContext } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { closeDrawer, navigate } from "../../../../RootMethods/RootNavigation";
import { LoginContext } from "../../../../contexts/LoginContext";
import { User } from "../../../global/user/User";
import { mowColors } from "../../../../values/Colors/MowColors";
import { fontFamily } from "../../../../values/Styles/MowStyles";
import { mowStrings } from "../../../../values/Strings/MowStrings";
import { statusBarHeight } from "../../../../values/Constants/MowConstants";

import { types } from "../../../../store/storeReducer";


import { StoreContext } from "../../../../store/StoreProvider";
import { useNavigation } from "@react-navigation/native";
//import { useNavigation } from '@react-navigation/native';



const MowDrawerMenu = () => {

    const navigation = useNavigation();
    const [store, dispatch] = useContext(StoreContext)
    //static contextType = LoginContext;

    const _handleLogout = () => {
        // to store user login status to the app locale
        //  let user = new User();
        // user.setLogin(false);
        // user.clearAllUserData();

        // to let know the navigator user has no more login
        // context.setLogin(false);

        // to close drawer menu after logout
        // closeDrawer();
        // to navigate the Home screen
        // navigate("Home");
        console.log("saliendo")
        dispatch({ type: types.authLogout })
    }

    const _goToProfilePage = () => {
        // navigate("ProfilePage")
    }

    const _renderMenuItem = (icon, text, navigateTo, logout = false) => {
        return (

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: hp("1.5%"),
                    marginVertical: hp("2%"),
                    marginLeft: wp("1%"),
                }}

                onPress={() => {
                    if (!logout) {
                        console.log("ok")
                        //navigate(navigateTo);
                        navigation.navigate(navigateTo);
                    }
                    else {
                        _handleLogout();
                    }
                }}
            >

                <FeatherIcon
                    name={icon}
                    style={{
                        flex: 2,
                        fontSize: hp("2.5%"),
                        color: 'black',
                        textAlign: "center"
                    }} />

                <Text
                    style={{
                        flex: 8,
                        fontSize: hp("2%"),
                        color: 'black',
                        marginLeft: 5,
                        fontWeight: "500",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        fontFamily: fontFamily.medium
                    }}>

                    {text}

                </Text>

            </TouchableOpacity>

        )
    }



    return (

        <View
            style={{ flex: 1, backgroundColor: mowColors.mainColor, borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>

            {/* header view */}
            <View
                style={{
                    marginTop: 10,
                    paddingTop: statusBarHeight,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}>

                {/* profile image view */}
                <View
                    style={{
                        height: hp(10.5),
                        width: hp(10.5),
                        borderRadius: 100,
                        borderWidth: 2,
                        borderColor: "white",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                   {/* <Image
                        style={{ height: hp(15), width: hp(15) }}
                        resizeMode={"contain"}
                        source={require("../../../../assets/image/icon.jpeg")} />*/}

                </View>

                {/* name text */}
              <Text
                        style={{
                            marginTop: 20,
                            fontSize: hp(2),
                            fontWeight: "600",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "black"
                        }}>

                        Demo QR Scanner

                    </Text>

                <Image
                    style={{ width: "100%", marginTop: 20 }}
                    resizeMode={"contain"}
                    source={require("../../../../assets/image/line.png")} />

            </View>

            <ScrollView
                style={{ marginTop: hp("1%"), marginBottom: hp("1%") }}>

                {/* settings button*/}
                {/*_renderMenuItem("settings", mowStrings.drawerMenu.settings, "Settings", false)*/}

                {/* profile button */}
                {/*_renderMenuItem("user", mowStrings.drawerMenu.profile, "Profile", false)*/}

                {/* password button */}
                {/*_renderMenuItem("lock", mowStrings.drawerMenu.password, "Password", false)*/}

                {/* favorites button */}
                {/*_renderMenuItem("heart", mowStrings.drawerMenu.favorites, "Favorites", false)*/}

                {/* notification button */}
                {/**icon, text, navigateTo, logout = false */}
                {_renderMenuItem("home", "Home", "HomeScreen", false)}

                {/*_renderMenuItem("edit-3", "Register Point", "Registerpoint", false)*/}

                {/* faq button 
                {_renderMenuItem("eye", "Show Points", "Showpoints", false)}
                {_renderMenuItem("eye", "Draw Polygons", "DrawPolygons", false)}
                {_renderMenuItem("eye", "Device Information", "DeviceInfo", false)}*/}
                {/* logout button */}
                {_renderMenuItem("log-out", "Sing out", "", true)}

              

            </ScrollView>

            {/*<Image
                    source={require("../../../../assets/logo/logo_white_horizontal.png")}
                    resizeMode={"contain"}
                    style={{
                        marginBottom: hp("3%"),
                        alignSelf: "center",
                        width: wp("40%"),
                        height: hp("5%")
                    }}/>
                */}
        </View>
    );

}

export default MowDrawerMenu