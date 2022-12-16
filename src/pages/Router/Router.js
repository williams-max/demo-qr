import React,{useContext} from 'react';

// screens
import Home from "../NotLogin/Home";
import HomeScreen from '../Login/HomeScreen';
//import HomeScreen from '../Login/HomeScreen';

import Cart from "../Login/CartOperations/Cart";


import { navigationRef, isMountedRef } from '../../RootMethods/RootNavigation';
import { LoginContext } from '../../contexts/LoginContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { DialogContext } from '../../contexts/DialogContext';
import { ToastContext } from "../../contexts/ToastContext";
import {deviceWidth, isTablet} from "../../values/Constants/MowConstants";
import MowDrawerMenu from '../../components/ui/Core/DrawerMenu/MowDrawerMenu';

//import MowDrawerMenu from "../../components/ui/Core/DrawerMenu/MowDrawerMenu";
import MyAccount from "../Login/User/MyAccount";


import NormalLogin from "../NotLogin/NormalLogin";
import Showpoints from '../Maps/Showpoints';
import Registerpoint from '../Maps/Registerpoint';
import DeviceInfo from '../Caputure/DeviceInfo';
import DrawPolygons from '../Maps/DrawPolygons';
import QrLogin from '../NotLogin/QrLogin';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StoreContext } from '../../store/StoreProvider';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="HomeScreen">
            <Stack.Screen name={"Home"} component={HomeScreen} />
            <Stack.Screen name={"Showpoints"} component={Showpoints} />
            <Stack.Screen name={"MyAccount"} component={MyAccount} />

        </Stack.Navigator>
    )
};

const Router = (props) => {

    
    const [store,dispatch] = useContext(StoreContext)
    // required for navigating screens
    const {isLogin}=store
    // to get user login status from login context
  //  let isLogin = loginContext.isLogin;

    //let isLogin=false;
//  drawerStyle={{ width: isTablet ? (deviceWidth * 0.5) : deviceWidth * 0.75, backgroundColor: "transparent" }}

//ref={navigationRef}
    return (
        <NavigationContainer

            >

            {
                (isLogin) // if login true

                    ?

                    <Drawer.Navigator

                    screenOptions={{
                        headerShown: false,
                        drawerStyle: {
                            backgroundColor: 'transparent',
                        },
                    }}
                      
                        drawerContent={(props) => <MowDrawerMenu {...props} />}
                        initialRouteName="HomeScreen">
                        <Drawer.Screen name={"HomeScreen"} component={HomeScreen} />
                        <Drawer.Screen name={"Showpoints"} component={Showpoints} />
                        <Drawer.Screen name={"Registerpoint"} component={Registerpoint} />
                        <Drawer.Screen name={"DeviceInfo"} component={DeviceInfo} />
                        <Drawer.Screen name={"DrawPolygons"} component={DrawPolygons} />
                        <Drawer.Screen name={"QrLogin"} component={QrLogin} />
                    </Drawer.Navigator>

                    :

                    <Stack.Navigator
                        screenOptions={{ headerShown: false }}
                        initialRouteName="HomeScreen">
                        {/*  <Stack.Screen name={"IntroScreen"} component={IntroScreen}/>*/}
                        <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
                        <Stack.Screen name={"Home"} component={Home} />
                        <Stack.Screen name={"NormalLogin"} component={NormalLogin} />
                        <Stack.Screen name={"QrLogin"} component={QrLogin} />
                       {/* <Stack.Screen name={"NormalRegister"} component={NormalRegister} />
                        <Stack.Screen name={"Verification"} component={Verification} />
                        <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} />
                        <Stack.Screen name={"ExtraSecurity"} component={ExtraSecurity} />
                        <Stack.Screen name={"ChangePassword"} component={ChangePassword} />*/}
                    </Stack.Navigator>
            }

        </NavigationContainer>
    );
};

export default Router