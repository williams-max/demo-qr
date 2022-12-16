import React, {useState} from "react";
import PropTypes from 'prop-types';
import {TextInput, TouchableOpacity, View} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {mowColors} from "../../../../values/Colors/MowColors";

export const MowInput = (props) => {

    // to define props values
    let {
        leftIcon,
        rightIcon,
        iconColor,
        containerStyle,
        textInputStyle,
        textArea,
        placeholder,
        multiline,
        numberOfLines,
        editable,
        value,
        keyboardType,
        placeholderTextColor,
        secureTextEntry,
        rightIconOnPress,
        autoCapitalize
    } = props;

    // to store 'secureTextEntry' value that comes from props, for changing input area visibility
    const [togglePassword, passwordVisible] = useState(secureTextEntry);
    // to change right icon if the input is secure text entry
    const [localRightIcon, setRightIcon] = useState(secureTextEntry ? "eye" : rightIcon);

    return(

        <View
            style={{
                flexDirection: "row",
                marginVertical: 10,
                height: textArea ? hp(10) : hp(5.5),
                borderRadius: 5,
                alignSelf: "center",
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#afafaf",
                width: "100%",
                ...containerStyle
            }}>

            {
                leftIcon &&

                <View
                    style={{
                        flex: 3,
                        alignSelf: "center",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                    <FeatherIcon
                        name={leftIcon}
                        style={{
                            textAlign: "center",
                            fontSize: hp(2.5),
                            color: iconColor || mowColors.mainColor,
                        }}/>

                </View>
            }

            <TextInput
                {...props}
                autoCapitalize={!autoCapitalize ? "none" : null}
                secureTextEntry={togglePassword}
                multiline={multiline}
                numberOfLines={numberOfLines}
                editable={editable}
                value={value}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor || mowColors.textColor}
                style={{
                    flex: rightIcon ? 14 : 17,
                    padding: 10,
                    fontSize: hp(1.8),
                    fontWeight: "500",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "left",
                    color: mowColors.mainColor,
                    ...textInputStyle
                }}/>

            {
                rightIcon &&

                <TouchableOpacity
                    disabled={!secureTextEntry}
                    onPress={() => {
                        if (secureTextEntry) {
                            passwordVisible(!togglePassword);
                            setRightIcon(togglePassword ? "eye-off" : "eye");
                        }
                        else {
                            if (typeof rightIconOnPress === "function") {
                                rightIconOnPress();
                            }
                        }
                    }}
                    style={{
                        flex: 3,
                        alignSelf: "center",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                    <FeatherIcon
                        name={localRightIcon}
                        style={{
                            textAlign: "center",
                            fontSize: hp(2.5),
                            color: iconColor || mowColors.mainColor,
                        }}/>

                </TouchableOpacity>
            }

        </View>

    )

};

// input props
MowInput.propTypes = {
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    rightIconOnPress: PropTypes.func,
    iconColor: PropTypes.string,
    containerStyle: PropTypes.object,
    textInputStyle: PropTypes.object,
    textArea: PropTypes.bool,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    editable: PropTypes.bool,
    value: PropTypes.string,
    keyboardType: PropTypes.oneOf(["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"]),
    placeHolderTextColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    autoCapitalize: PropTypes.bool,
};

// input default props
MowInput.defaultProps = {
    textArea: false,
    placeholder: "",
    multiline: false,
    numberOfLines: 1,
    editable: true,
    value: "",
    placeholderTextColor: "#707070",
    secureTextEntry: false,
    autoCapitalize: false
};
