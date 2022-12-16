import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import { MowContainer } from "../../components/ui/Core/Container/MowContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { pageContainerStyle } from "../../values/Styles/MowStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { mowColors } from "../../values/Colors/MowColors";
import { mowStrings } from "../../values/Strings/MowStrings";
import { MowInput } from "../../components/ui/Common/Input/MowInput";
import { LoginContext } from "../../contexts/LoginContext";
import { User } from "../../components/global/user/User";
import { MowForwardBack } from "../../components/ui/Core/NavBar/MowForwardBack";
import { goBack, navigate } from "../../RootMethods/RootNavigation";
import { MowButton } from "../../components/ui/Common/Button/MowButton";

import { useNavigation } from '@react-navigation/native';
import { types } from '../../store/storeReducer'
import { StoreContext } from '../../store/StoreProvider';


const NormalLogin = () => {

    // static contextType = LoginContext;
    const [store, dispatch] = useContext(StoreContext)
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    /*
       const state = {
            email: "",
            password: ""
        }*/

    // to store entered regular from user
    const onChangeText = (key, value) => {
        setState({
            ...state,
            [key]: value,
        })
    };

    const navigation = useNavigation();

    const _handleLogin = () => {
        // to update user login situation
        // new User().setLogin(true);
        // to let know the navigator user has login
        //this.context.setLogin(true);
        console.log("press", state)
        if (state.email && state.password) {
            dispatch({ type: types.updateUser, payload: state.email })
            dispatch({ type: types.authLogin })
        }

        //navigation.navigate("HomeScreen")
    }

    const _handleLoginQR = () => {
        // to update user login situation
        // new User().setLogin(true);
        // to let know the navigator user has login
        //this.context.setLogin(true);
        console.log("press btn QR")


        navigation.navigate("QrLogin")
    }


    //let { email, password } = state;

    return (

        <MowContainer
            footer={false}
            hideStatusBar={true}
            navbar={false}
            style={{ backgroundColor: mowColors.mainColor }}>

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={pageContainerStyle}>

                {/* top navigation button area */}
                {/* <MowForwardBack
                    text={"Demo Geolocation"}
                />*/}

                <Text style={{
                    textAlign: 'center', fontWeight: 'bold', color: 'black',
                    fontSize: 16, marginTop: 40
                }}>
                    Demo QR Scanner
                </Text>
                <View
                    style={{ ...pageContainerStyle, marginTop: hp("5%") }}>

                    {/* username view */}
                    <View
                        style={inputStyle.container}>

                        {/*<Text
                                style={inputStyle.titleText}>

                                {mowStrings.loginPage.username}

                            </Text>*/}

                        <MowInput
                            value={state.email}

                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            keyboardType={"email-address"}
                            placeholder={"User"}
                            onChangeText={value => onChangeText("email", value)} />

                    </View>

                    {/* password view */}
                    <View
                        style={inputStyle.container}>

                        {/* title regular */}
                        {/* <Text
                                style={inputStyle.titleText}>

                                {mowStrings.loginPage.password}

                            </Text>*/}

                        <MowInput
                            value={state.password}
                            containerStyle={inputStyle.inputContainer}
                            textInputStyle={inputStyle.inputText}
                            onChangeText={value => onChangeText("password", value)}
                            secureTextEntry={true}
                            placeholder={"password"}
                        />

                    </View>

                    <MowButton
                        buttonText={mowStrings.login}
                        onPress={() => _handleLogin()}
                        style={{ marginTop: hp("3%") }}
                        containerStyle={{
                            marginTop: hp("5%"), backgroundColor: '#FFF2CD',
                            borderWidth: 1,
                            borderColor: '#7E9BC5'
                        }}
                        textStyle={{ color: "black", fontWeight: "bold", letterSpacing: 0 }}
                        type={"default"} />

                    {/* forgot password view */}
                    <View
                        style={{ marginTop: hp(3) }}>

                        {/*<Text
                            style={{
                                color: "black",
                                fontSize: hp(1.8),
                                textAlign: "center"
                            }}>

                            OR

                        </Text>*/}

                        {/*
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
                            type={"default"} />*/}

                    </View>

                </View>

            </KeyboardAwareScrollView>


        </MowContainer>
    )


}

export const inputStyle = ({
    container: {
        marginVertical: 10
    },
    titleText: {
        fontSize: hp("2%"),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "black",
        opacity: 0.8
    },
    inputContainer: {
        backgroundColor: "transparent",
        orderStyle: "solid",
        borderWidth: 1,
        borderColor: 'black',
        /* borderBottomWidth: 1,
         borderBottomColor: "black",*/
        width: "100%",
        height: 40
    },
    inputText: {
        fontSize: hp("2.2%"),
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "black",
        width: "85%"
    },
});

export default NormalLogin
