import React from 'react';
import {View, Text} from "react-native";
import {BallIndicator} from "react-native-indicators";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {LoadingContext} from "../../../contexts/LoadingContext";
import {mowColors} from "../../../values/Colors/MowColors";
import {deviceWidth} from "../../../values/Constants/MowConstants";

export default class MowLoadingBall extends React.Component {

    // required for initializing component context
    static contextType = LoadingContext;

    render() {

        const {isLoading, loadingText} = this.context;

        if(isLoading) {

            return(

                <View
                    style={{
                        zIndex: 9999,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        ...this.props.style
                    }}>

                    <View
                        style={{
                            backgroundColor: "black",
                            opacity: 0.55,
                            position: "absolute",
                            width: "100%",
                            height: "100%"
                        }}/>

                    <View
                        style={{width: hp(9), height: hp(9)}}>

                        <BallIndicator
                            size={hp(7)}
                            color={mowColors.loadingIndicatorColor}/>

                    </View>

                    <Text
                        style={{
                            height: 50,
                            width: deviceWidth,
                            fontSize: hp(2.2),
                            textAlign: "center",
                            marginTop: hp(3),
                            color: "white",
                            fontWeight: "bold"
                        }}>

                        {loadingText}

                    </Text>

                </View>

            )

        }

        return null;
    }

}
