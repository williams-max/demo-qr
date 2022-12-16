import React, { Component } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import {Dialog, SlideAnimation} from 'react-native-popup-dialog';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {DialogContext} from '../../../contexts/DialogContext';
import {mowColors} from "../../../values/Colors/MowColors";
import {deviceWidth, isTablet} from "../../../values/Constants/MowConstants";

const _dialogType = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning"
};

export default class MyDialog extends Component {

    _buttonPositiveClick() {
        if (typeof this.context.buttonPositive == 'function')
        {
            this.context.buttonPositive();
        }
        // to hide dialog after button click
        this.context.hideDialog();
    }

    _buttonNegativeClick() {
        if (typeof this.context.buttonNegative() == 'function')
        {
            this.context.buttonNegative();
        }
        // to hide dialog after button click
        this.context.hideDialog();
    }

    _buttonView(buttonColor, bpt, bnt, twoButton) {

        return (

            <View
                style={{
                    height: hp(5),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: twoButton ? 30 : 90
                }}>

                {
                    twoButton &&

                    <TouchableOpacity
                        onPress={() => {this._buttonNegativeClick()}}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            flex: 1,
                            // marginLeft: 10,
                            height: hp(4),
                            backgroundColor: buttonColor
                        }}>

                        <Text
                            style={{
                                alignSelf: "center",
                                color: "white",
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                textAlign: "center"
                            }}>

                            {bnt}

                        </Text>

                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => {this._buttonPositiveClick()}}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        flex: 1,
                        // marginLeft: 10,
                        height: hp(4),
                        backgroundColor: buttonColor,
                        marginLeft: twoButton ? 10 : 0
                    }}>

                    <Text
                        style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: hp("1.8%"),
                            fontWeight: "600",
                            textAlign: "center"
                        }}>

                        {bpt}

                    </Text>

                </TouchableOpacity>

            </View>

        );

    }

    _dialogContent(iconName, color) {

        const {twoButton, title, message, bpt, bnt} = this.context;

        return (

            <View>

                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 99999999999,
                        backgroundColor: color,
                        width: hp("6%"),
                        height: hp("6%"),
                        alignSelf: "center",
                        borderRadius: 100,
                        marginTop: hp(1.5),
                    }}>

                    <FAIcon
                        style={{
                            color: "white",
                            fontSize: hp("3.5%"),
                            textAlign: "center"
                        }}
                        name={iconName}/>

                </View>

                <View
                    style={{backgroundColor: "white"}}>

                    {/* text view */}
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: hp(12),
                        }}>

                        {/* title text */}
                        <Text
                            style={{
                                flex: 1.3,
                                fontSize: hp(2.5),
                                marginVertical: hp(1),
                                textAlign: "center",
                                color: color,
                                fontWeight: "bold",
                                marginBottom: hp(0.5),
                            }}>

                            {title}

                        </Text>

                        <View
                            style={{flex: 3, justifyContent: "center", alignItems: "center"}}>

                            {/* message text */}
                            <Text
                                style={{
                                    fontSize: hp(1.8),
                                    textAlign: "center",
                                    color: "grey",
                                    fontWeight: "500",
                                    marginHorizontal: wp(1.5)
                                }}>

                                {message}

                            </Text>

                        </View>

                    </View>

                    {this._buttonView(color, bpt, bnt, twoButton)}

                </View>

            </View>

        );
    }

    // required for initializing component context
    static contextType = DialogContext;

    render() {
        const {dialogType, show} = this.context;

        return (

            <Dialog
                overlayBackgroundColor={"#454545"}
                width={isTablet ? (deviceWidth * 0.6) : (deviceWidth * 0.85)}
                height={hp(25)}
                visible={show}
                dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
                dialogStyle={{zIndex: 999}}>


                <View>

                    {
                        dialogType === _dialogType.SUCCESS &&
                        this._dialogContent("check", mowColors.successColor)
                    }

                    {
                        dialogType === _dialogType.ERROR &&
                        this._dialogContent("times", mowColors.errorColor)
                    }

                    {
                        dialogType === _dialogType.WARNING &&
                        this._dialogContent("exclamation", mowColors.warningColor)
                    }

                </View>


            </Dialog>

        )
    }
}