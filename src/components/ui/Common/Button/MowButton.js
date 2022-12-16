import React from "react";
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import FeatherIcon from "react-native-vector-icons/Feather";
import {shadowStyle} from "../../../../values/Styles/MowStyles";
import {mowColors} from "../../../../values/Colors/MowColors";

export const MowButton = (props) => {

    // to define props values
    let {
        containerStyle,
        textStyle,
        leftIcon,
        stickyIcon,
        iconStyle,
        leftIconStyle,
        rightIconStyle,
        buttonText,
        rightIcon,
        filled,
        size,
        type,
        shadow
    } = props;

    let style = getButtonStyle(type, size, filled);

    return (

        <TouchableOpacity
            {...props}
            style={[
                shadow ? shadowStyle : null,
                {
                    flexDirection: "row",
                    margin: 10,
                    width: "100%",
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: "center",
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    ...style["button"],
                    ...containerStyle,
                }
            ]}>

            {/* button left icon */}
            {
                leftIcon &&

                <View
                    style={{
                        flex: stickyIcon ? 0 : 1,
                        right: stickyIcon ? 10 : 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    <FeatherIcon
                        style={{
                            ...style["icon"],
                            ...iconStyle,
                            ...leftIconStyle
                        }}
                        name={leftIcon}/>

                </View>
            }

            {
                !leftIcon &&

                <View
                    style={{flex: stickyIcon ? 0 : 1}}/>
            }


            {/* button text */}
            <View
                style={{flex: stickyIcon ? 0 : 8}}>

                <Text
                    style={{
                        fontWeight: "600",
                        textAlign: "center",
                        ...style["text"],
                        ...textStyle
                    }}>

                    {buttonText}

                </Text>

            </View>

            {/* button right icon */}
            {
                rightIcon &&

                <View
                    style={{
                        flex: stickyIcon ? 0 : 1,
                        left: stickyIcon ? 10 : 0,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    <FeatherIcon
                        style={{
                            ...style["icon"],
                            ...iconStyle,
                            ...rightIconStyle
                        }}
                        name={rightIcon}/>

                </View>
            }

            {
                !rightIcon &&

                <View
                    style={{flex: stickyIcon ? 0 : 1}}/>
            }

        </TouchableOpacity>
    )
};

MowButton.propTypes = {
    buttonText: PropTypes.string,
    textStyle: PropTypes.object,
    type: PropTypes.oneOf(['default', 'success', 'danger', 'warning', 'info']),
    size: PropTypes.oneOf(['default', 'big', 'medium', 'small', 'xSmall']),
    leftIcon: PropTypes.string,
    leftIconStyle: PropTypes.object,
    rightIcon: PropTypes.string,
    rightIconStyle: PropTypes.object,
    stickyIcon: PropTypes.bool,
    filled: PropTypes.bool,
    shadow: PropTypes.bool,
    containerStyle: PropTypes.object
};

MowButton.defaultProps = {
    filled: true,
    type: "default",
    size: "default",
    stickyIcon: false,
    shadow: false,
    buttonText: ""
};

// to determine button style
function getButtonStyle(type, size, filled) {

    const buttonColors = {
        default: "white",
        success: mowColors.successColor,
        warning: mowColors.warningColor,
        danger: mowColors.errorColor,
        info: mowColors.infoColor,
    };

    let style = {};
    switch (size) {
        case "big":
            style = {
                button: {
                    height: hp("7%"),
                    backgroundColor: filled ? buttonColors[type] : "transparent",
                    borderColor: filled ? "transparent" : buttonColors[type],
                    borderWidth: filled ? 0 : 1
                },
                text: {
                    fontSize: hp(2),
                    color: filled ? "white" : buttonColors[type]
                },
                icon: {
                    fontSize: hp(2.5),
                    color: filled ? "white" : buttonColors[type]
                },
            };
            break;
        case "medium":
            style = {
                button: {
                    height: hp("5%"),
                    backgroundColor: filled ? buttonColors[type] : "transparent",
                    borderColor: filled ? "transparent" : buttonColors[type],
                    borderWidth: filled ? 0 : 1
                },
                text: {
                    fontSize: hp(1.8),
                    color: filled ? "white" : buttonColors[type]
                },
                icon: {
                    fontSize: hp(2.2),
                    color: filled ? "white" : buttonColors[type]
                },
            };
            break;
        case "small":
            style={
                button: {
                    height: hp("4.2%"),
                    backgroundColor: filled ? buttonColors[type] : "transparent",
                    borderColor: filled ? "transparent" : buttonColors[type],
                    borderWidth: filled ? 0 : 1,
                },
                text: {
                    fontSize: hp("1.5%"),
                    color: filled ? "white" : buttonColors[type]
                },
                icon: {
                    fontSize: hp(1.9),
                    color: filled ? "white" : buttonColors[type]
                },
            };
            break;
        case "xSmall":
            style = {
                button: {
                    height: hp("3.5%"),
                    backgroundColor: filled ? buttonColors[type] : "transparent",
                    borderColor: filled ? "transparent" : buttonColors[type],
                    borderWidth: filled ? 0 : 1
                },
                text: {
                    fontSize: hp("1.3%"),
                    color: filled ?  "white" : buttonColors[type],
                },
                icon: {
                    fontSize: hp(1.6),
                    color: filled ? "white" :  buttonColors[type],
                },
            };
            break;
        default:
            style = {
                button: {
                    height: hp("5%"),
                    backgroundColor: filled ? buttonColors[type] : "transparent",
                    borderColor: filled ? "transparent" : buttonColors[type],
                    borderWidth: filled ? 0 : 1
                },
                text: {
                    fontSize: hp(1.8),
                    color: filled ? "white" : buttonColors[type]
                },
                icon: {
                    fontSize: hp(2.2),
                    color: filled ? "white" : buttonColors[type]
                },
            };
            break;
    }

    return style;
}
