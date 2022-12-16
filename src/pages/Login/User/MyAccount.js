import React from "react";
import {Text, View, TouchableOpacity, ScrollView} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {cardStyle, fontFamily} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import {MowContainer} from "../../../components/ui/Core/Container/MowContainer";
import MowListItemIcon from "../../../components/ui/ListItem/MowListItemIcon";
import {navigate} from "../../../RootMethods/RootNavigation";
import {heightPercentageToDP as hp} from "react-native-responsive-screen"

export default class MyAccount extends React.Component {

    _renderTopItem(icon, text, navigateTo = "") {
        return (
            <TouchableOpacity
                style={{
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={() => {navigate(navigateTo)}}>

                <MCIcon
                    style={{
                        color: mowColors.mainColor,
                        fontSize: hp(4),
                        marginBottom: 5
                    }}
                    name={icon}/>

                {/* item text */}
                <Text
                    style={{
                        fontSize: hp(1.5),
                        color: mowColors.titleTextColor,
                        fontFamily: fontFamily.regular,
                        textAlign: "center",
                    }}>

                    {text}

                </Text>

            </TouchableOpacity>
        )
    }

    _renderBottomItem(icon, text, navigateTo = "") {
        return(

            <MowListItemIcon
                iconName={icon}
                title={text}
                style={{
                    backgroundColor: mowColors.viewBGColor,
                    marginHorizontal: 15,
                    borderRadius: 5,
                    marginTop: 15,
                    height: hp(8)
                }}
                onPress={() => navigate(navigateTo)}/>

        )
    }

    render() {

        return(

            <MowContainer
                footerActiveIndex={4}
                title={mowStrings.myAccountScreen.title}>
                <Text style={{textAlign:'center',marginTop:200}}>My Account</Text> 
    

            </MowContainer>

        )

    }

}
