import React from "react";
import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {mowColors} from "../../../values/Colors/MowColors";

class MowListItemIcon extends React.Component {

    static propTypes = {
        selected: PropTypes.bool,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        onPress: PropTypes.func,
        iconName: PropTypes.string,
        iconStyle: PropTypes.object
    };

    render() {

        let selected = this.props.selected;

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    height: hp("10%"),
                    flexDirection: "row",
                    ...this.props.style
                }}>

                {
                    this.props.iconName

                        ?

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: null,
                                justifyContent: "center",
                                alignItems: "center"}
                            }>

                            <FeatherIcon
                                style={{
                                    fontSize: hp(3),
                                    color: mowColors.mainColor,
                                    ...this.props.iconStyle
                                }}
                                name={this.props.iconName}/>

                        </View>

                        :

                        <View
                            style={{
                                flex: 1,
                                backgroundColor: null,
                                justifyContent: "center",
                                alignItems: "center"
                            }}/>
                }

                <View
                    style={{
                        flex: 7,
                        backgroundColor: null,
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>

                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: hp("2%"),
                            color: mowColors.titleTextColor
                        }}>

                        {this.props.title}

                    </Text>

                    {
                        this.props.subtitle &&

                        <Text
                            numberOfLines={3}
                            ellipsizeMode={"tail"}
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("2%"),
                            }}>

                            {this.props.subtitle}

                        </Text>

                    }

                </View>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: null,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                    <FeatherIcon
                        style={{fontSize: hp("3%"), color: selected ? "green" : "#e0e0e0"}}
                        name={selected ? "check" : "chevron-right"} />

                </View>

            </TouchableOpacity>
        )
    }
}

export default MowListItemIcon;
