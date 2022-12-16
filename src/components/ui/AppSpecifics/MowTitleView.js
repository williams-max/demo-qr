import React from "react";
import PropTypes from 'prop-types';
import {View, Text} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FeatherIcon from "react-native-vector-icons/Feather";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import {MowButton} from "../Common/Button/MowButton";

export default class MowTitleView extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        buttonText: PropTypes.string,
        buttonOnPress: PropTypes.func,
        showButton: PropTypes.bool
    };

    static defaultProps = {
        buttonText: mowStrings.viewMore,
        title: "",
        showButton: true
    };

    render() {

        let {title, showButton, buttonOnPress, buttonText} = this.props;

        return(

            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 15,
                }}>

                {/* title view */}
                <View
                    style={{flex: 2, flexDirection: "row", alignItems: "center"}}>

                    {/* title icon */}
                    <FeatherIcon
                        name={"twitter"}
                        style={{fontSize: hp("3%"), color: mowColors.titleIcon}}/>

                    {/* title text */}
                    <Text
                        style={{
                            fontSize: hp("1.8%"),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: mowColors.titleTextColor,
                            marginLeft: 15
                        }}>

                        {title}

                    </Text>

                </View>

                {/* view more button */}
                {
                    showButton &&

                        <View
                            style={{flex: 1, paddingRight: 15}}>

                            <MowButton
                                buttonText={buttonText}
                                onPress={() => {
                                    if (typeof buttonOnPress == 'function')
                                    {
                                        buttonOnPress();
                                    }
                                }}
                                containerStyle={{
                                    borderRadius: 5,
                                    margin: 0,
                                    borderColor: "rgba(190, 190, 190, 0.95)",
                                }}
                                textStyle={{
                                    fontWeight: "400",
                                    color: mowColors.textColor,
                                    fontSize: hp(1.4)
                                }}
                                shadow={false}
                                filled={false}
                                size={"xSmall"}/>

                        </View>
                }

            </View>

        )

    }
}
