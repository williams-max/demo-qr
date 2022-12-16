import React from 'react';
import {View, StatusBar} from 'react-native';
import {MowNavBar} from '../NavBar/MowNavBar';
import MowLoadingBall from "../../Loading/MowLoadingBall";
import PropTypes from 'prop-types';
import {MowFooter} from "../Footer/MowFooter";
import MyDialog from "../../Dialog/MowDialog";
import {MowToast} from "../../Common/Toast/MowToast";
import {mowColors} from "../../../../values/Colors/MowColors";
import {footerHeight} from "../../../../values/Constants/MowConstants";
import MowStatusBar from "../StatusBar/MowStatusBar";

export const MowContainer = (props) => {

    let {statusBar, footer, footerActiveIndex, navbar, title, style} = props;

    return (

        <View
            style={{backgroundColor: mowColors.pageBGColor, flex: 1, ...style}}>

            {
                statusBar &&

                    <MowStatusBar/>
            }

            {
                !statusBar &&

                    <StatusBar hidden />
            }

            {
                navbar &&

                    <MowNavBar
                        title={title}/>

            }

            <View
                style={{flex: 1, paddingBottom: footer ? (footerHeight) : 0}}>

                {props.children}

            </View>

            {/*
                footer &&

                <MowFooter
                    activeIndex={footerActiveIndex}/>
            */}

         {/*   <MowLoadingBall/>

            <MyDialog/>

            <MowToast/>*/}

        </View>

    );

};

MowContainer.propTypes = {
    style: PropTypes.object,
    navbar: PropTypes.bool,
    footer: PropTypes.bool,
    title: PropTypes.string,
    statusBar: PropTypes.bool,
    footerActiveIndex: PropTypes.oneOf([1, 2, 3, 4]),
};

MowContainer.defaultProps = {
    navbar: true,
    footer: true,
    title: "",
    showFooter: false,
    statusBar: true,
};
