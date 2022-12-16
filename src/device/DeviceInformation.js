import React from 'react';
import Device from 'react-native-device-info';
import SyncStorage from 'sync-storage';
import * as RNLocalize from "react-native-localize";

export default class DeviceInformation{

    getDeviceId() {
        return Device.getUniqueId();
    }

    getDeviceBrand() {
        return Device.getBrand();
    }

    getDeviceName() {
        return Device.getDeviceName();
    }

    getDeviceModel() {
        return Device.getModel();
    }

    getDeviceVersion() {
        return Device.getSystemVersion();
    }

    getAppVersion() {
        return Device.getBuildNumber();
    }

    isEmulator() {
        return Device.isEmulator();
    }

    isTablet() {
        return Device.isTablet();
    }

    getLocaleLanguage() {
        let language = SyncStorage.get("language");

        if (language) {
            return language;
        }
        else {
            language = RNLocalize.getLocales()[0]["languageCode"];

            if (language === "tr") {
                return language
            }
            else {
                return "en"
            }
        }
    }

    getAccessData() {
        let deviceId = this.getDeviceId();
        let token = SyncStorage.get('token');
        let language = this.getLocaleLanguage();

        return {
            accessToken: token || "",
            deviceId: deviceId,
            language: language
        };
    }
}
