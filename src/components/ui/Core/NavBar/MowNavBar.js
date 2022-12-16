import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

import {navbarHeight} from "../../../../values/Constants/MowConstants";
import {mowColors} from "../../../../values/Colors/MowColors";
import {fontFamily} from "../../../../values/Styles/MowStyles";
import {goBack, openDrawer} from "../../../../RootMethods/RootNavigation";

export const MowNavBar = (props) => {

    let {title} = props;

    return (

        <View
            style={{
                height: navbarHeight,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row',
                zIndex: 999,
                backgroundColor: mowColors.navBarColor,
            }}>

            {/* back button */}
            <TouchableOpacity
                onPress={() => goBack()}
                style={{
                    flex: 1.5,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,
                }}>

                <FAIcon
                    style={{fontSize: hp("4%")}}
                    color={"white"}
                    name={'angle-left'}/>

            </TouchableOpacity>

            {/* page title */}
            <Text
                style={{
                    flex: 7,
                    fontSize: hp("2%"),
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: fontFamily.bold
                }}>

                {title}

            </Text>

            {/* user button */}
            <TouchableOpacity
                onPress={() => {openDrawer()}}
                style={{flex: 1.5, alignItems: "center"}}>

                <FAIcon
                    style={{fontSize: hp("3%")}}
                    color={"white"}
                    name={'bars'}/>

            </TouchableOpacity>

        </View>

    );
};

MowNavBar.propTypes = {
    title: PropTypes.string,
};

MowNavBar.defaultProps = {
    title: "",
};
