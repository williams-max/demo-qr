import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FatherIcon from "react-native-vector-icons/Feather";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {navigate} from '../../../../RootMethods/RootNavigation';
import PropTypes from 'prop-types';
import {footerHeight, platform} from "../../../../values/Constants/MowConstants";
import {mowColors} from "../../../../values/Colors/MowColors";
import {mowStrings} from "../../../../values/Strings/MowStrings";

export const MowFooter = (props) => {

    let {activeIndex} = props;
    const press = () => {
     console.log("Presss")
    }

    function _renderItem(icon, text, index, navigateTo) {
        return (

            <TouchableOpacity
                onPress={() => {navigate(navigateTo)}}
                style={{
                    flex: 1,
                    alignItems: "center",
                    height: "100%"
                }}>

                <FatherIcon
                    name={icon}
                    style={{
                        color: activeIndex === index ? mowColors.mainColor : "#a1a1a1",
                        marginTop:  hp("1%"),
                        fontSize: hp("2.2%"),
                    }}/>

                <Text
                    style={{
                        color: activeIndex === index ? mowColors.mainColor : "#a1a1a1",
                        fontSize: hp("1.3%"),
                        marginTop:  hp("0.5%")
                    }}>

                    {text}

                </Text>

            </TouchableOpacity>

        )
    }

    return (

        <View
            style={{
                height: footerHeight,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                flexDirection: "row",
                backgroundColor: 'orange',
                shadowColor: "rgba(0, 0, 0, 0.11)",
                shadowOffset: {
                    width: 0,
                    height: -3
                },
                shadowRadius: 4,
                shadowOpacity: 1,
                borderTopWidth: 0.5,
                borderTopColor: "#a1a1a1",
                paddingHorizontal: 10
            }}>

            {/* explore button*/}
            {_renderItem("home", mowStrings.explore, 1, "Home")}

            {/* categories button*/}
            {_renderItem("codepen", mowStrings._categories, 2, "Categories")}

            {/* cart button*/}
            {_renderItem("shopping-bag", mowStrings.cart, 3, "Cart")}

            {/* my account button*/}
            {_renderItem("user", mowStrings.drawerMenu.myAccount, 4, "MyAccount")}

        </View>

    );
};

// Footer props
MowFooter.propTypes = {
    activeIndex: PropTypes.oneOf([1, 2, 3, 4])
};

// Footer default props
MowFooter.defaultProps = {

};
