import React from "react";
import {View, Text} from "react-native";
import {ToastContext} from "../../../../contexts/ToastContext";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export const MowToast = (props) => {

    let {show, bgColor, message, duration} = React.useContext(ToastContext);

    if (show) {
        return (
            <View
                style={{
                    backgroundColor: bgColor,
                    width: 250,
                    maxWidth: 350,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 50,
                    borderRadius: 5,
                    padding: 10
                }}>

                <Text
                    style={{
                        fontSize: hp(2),
                        color: "white",
                        textAlign: "center",
                        fontWeight: "600"
                    }}>

                    {message}

                </Text>

            </View>
        )
    }
    else {
        return null;
    }
};
