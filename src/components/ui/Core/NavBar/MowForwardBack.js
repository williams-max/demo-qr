import React from "react";
import {TouchableOpacity, Text,View} from "react-native";
import PropTypes from 'prop-types';
import FeatherIcon from "react-native-vector-icons/Feather";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const MowForwardBack = (props) => {

    let {leftOnPress, text, containerStyle} = props;

    return (

        <View
            style={{flexDirection: "row", marginTop: hp(2), alignItems: "center", ...containerStyle}}>

            {/* back button */}
            <TouchableOpacity
                onPress={() => leftOnPress()}
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                <FeatherIcon
                    style={{
                        color: "white",
                        fontSize: hp("3.5%"),
                        marginLeft: 10
                    }}
                    name={"arrow-left"}/>

            </TouchableOpacity>

            {/* title text */}
            <Text
                style={{
                    fontSize: hp(2.5),
                    fontWeight: "600",
                    fontStyle: "normal",
                    textAlign: "center",
                    color: "black",
                    flex: 6
                }}>

                {text}

            </Text>

            {/* dummy view */}
            <View
                style={{flex: 1}}/>


        </View>

    );
};

MowForwardBack.propTypes = {
    containerStyle: PropTypes.object,
    leftOnPress: PropTypes.func,
    text: PropTypes.string,
};

MowForwardBack.defaultProps = {
    text: ""
};
