import React from "react";
import {MowContainer} from "../../components/ui/Core/Container/MowContainer";
import {mowColors} from "../../values/Colors/MowColors";
import {Text, View, Image} from "react-native";
import {pageContainerStyle} from "../../values/Styles/MowStyles";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {mowStrings} from "../../values/Strings/MowStrings";
import {MowButton} from "../../components/ui/Common/Button/MowButton";
import {goBack, navigate} from "../../RootMethods/RootNavigation";
import {platform} from "../../values/Constants/MowConstants";
import {MowForwardBack} from "../../components/ui/Core/NavBar/MowForwardBack";

export default class Home extends React.Component {

    render() {


        return (

            <MowContainer
                footer={false}
                navbar={false}
                statusBar={true}
                style={{backgroundColor: mowColors.mainColor}}>

                <View
                    style={pageContainerStyle}>

                    <MowForwardBack
                        leftOnPress={() => goBack()}
                        text={mowStrings.appName}/>

                    {/* button view */}
                    <View
                        style={{marginTop: hp("5%"), marginBottom: hp("3%")}}>

                        {/* sign in with email button */}
                        <MowButton
                            buttonText={mowStrings.loginHome.withEmail}
                            onPress={() => {navigate("NormalLogin") }}
                            size={"big"}
                            containerStyle={buttonStyle.container}
                            textStyle={buttonStyle.text}
                            leftIcon={"mail"}
                            type={"success"}/>

                        {/* line view */}
                        <View
                            style={{flexDirection: "row", marginVertical: 30, alignItems: "center"}}>

                            {/* left line view */}
                            <View
                                style={{
                                    borderStyle: "solid",
                                    borderWidth: 1.5,
                                    borderColor: "#ffffff",
                                    height: 1,
                                    flex: 2
                                }}/>


                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    fontSize: hp("3%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: "#ffffff"
                                }}>

                                {mowStrings.or}

                            </Text>

                            {/* right line view */}
                            <View
                                style={{
                                    borderStyle: "solid",
                                    borderWidth: 1.5,
                                    borderColor: "#ffffff",
                                    flex: 2,
                                    height: 1
                                }}/>

                        </View>

                        {/* sign in with facebook button */}
                        <MowButton
                            buttonText={mowStrings.loginHome.withFacebook}
                            size={"big"}
                            containerStyle={buttonStyle.container}
                            textStyle={buttonStyle.text}
                            leftIcon={"log-in"}
                            type={"success"}/>

                        {/* sign in with google button */}
                        <MowButton
                            buttonText={mowStrings.loginHome.withGoogle}
                            size={"big"}
                            containerStyle={buttonStyle.container}
                            textStyle={buttonStyle.text}
                            leftIcon={"log-in"}
                            type={"success"}/>

                        {
                            platform === "ios" &&

                                <MowButton
                                    buttonText={mowStrings.loginHome.withGoogle}
                                    size={"big"}
                                    containerStyle={buttonStyle.container}
                                    textStyle={buttonStyle.text}
                                    leftIcon={"log-in"}
                                    type={"success"}/>
                        }

                    </View>

                    {/* new here text */}
                    <Text
                        style={{
                            marginTop: hp("2%"),
                            fontSize: hp("1.8%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#ffffff"
                        }}>

                        {mowStrings.loginHome.newHere}

                    </Text>

                    {/* create account button */}
                    <MowButton
                        buttonText={mowStrings.loginHome.createAnAccount}
                        onPress={() => {navigate("NormalRegister")}}
                        type={"success"}/>

                    <Text
                        style={{
                            marginTop: hp("2%"),
                            fontSize: hp("2%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#ffffff"
                        }}>

                        {mowStrings.loginHome.usageTerms}

                    </Text>

                </View>

                {/* logo */}
                <Image
                    resizeMode={"contain"}
                    style={{
                        marginBottom: hp("5%"),
                        alignSelf: "center",
                        width: wp("70%"),
                        height: hp("35%"),
                        color:'white'
                        
                    }}
                    source={require("../../assets/logo/logo_white_horizontal.png")}/>

            </MowContainer>

        );
    }
}

const buttonStyle = ({
    container: {
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#ffffff"
    },
    text: {
        fontSize: hp("2%"),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    }
});
