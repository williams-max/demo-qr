import SyncStorage from 'sync-storage';

export class User {

    setUsername(name) {
        SyncStorage.set("username", name);
    }

    getUsername() {
        return SyncStorage.get("username");
    }

    setName(name) {
        SyncStorage.set("name", name);
    }

    getName() {
        return SyncStorage.get("name");
    }

    setType(type) {
        SyncStorage.set("type", type);
    }

    getType() {
        return SyncStorage.get("type");
    }

    setId(id) {
        SyncStorage.set("id", id);
    }

    getId() {
        return SyncStorage.get("id");
    }

    setMail(mail) {
        SyncStorage.set("mail", mail);
    }

    getMail() {
        return SyncStorage.get("mail");
    }

    setNumber(number) {
        SyncStorage.set("number", number);
    }

    getNumber() {
        return SyncStorage.get("number");
    }

    setUserId(id) {
        SyncStorage.set("user_id", id)
    }

    getUserId() {
        return SyncStorage.get("user_id");
    }

    isLogin() {
        return SyncStorage.get("isLogin");
    }

    setLogin(flag) {
        SyncStorage.set("isLogin", flag);
    }

    setFBLogin(flag) {
        SyncStorage.set("fbLogin", flag);
    }

    getFBLogin() {
        return SyncStorage.get("fbLogin");
    }

    setGoogleLogin(flag) {
        SyncStorage.set("googleLogin", flag);
    }

    getGoogleLogin() {
        return SyncStorage.get("googleLogin");
    }

    setSelectedLocation(locationData) {
        SyncStorage.set("selected_location", locationData);
    }

    getSelectedLocation() {
        return SyncStorage.get("selected_location");
    }

    setLocation(location) {
        SyncStorage.set("user_location", location);
    }

    getLocation() {
        return SyncStorage.get("user_location");
    }

    setGender(gender) {
        SyncStorage.set("user_gender", gender);
    }

    getGender() {
        return SyncStorage.get("user_gender");
    }

    setBirthday(birthday) {
        SyncStorage.set("user_birthday", birthday);
    }

    getBirthday() {
        return SyncStorage.get("user_birthday");
    }

    setAllowPush(allowPush) {
        SyncStorage.set("user_allowPush", allowPush);
    }

    getAllowPush() {
        return SyncStorage.get("user_allowPush");
    }

    setPhoto(photo) {
        SyncStorage.set("user_photo", photo);
    }

    getPhoto() {
        return SyncStorage.get("user_photo");
    }

    clearAllUserData(){
        SyncStorage.set("username", null);
        SyncStorage.set("name", null);
        SyncStorage.set("type", null);
        SyncStorage.set("id", null);
        SyncStorage.set("mail", null);
        SyncStorage.set("number", null);
        SyncStorage.set("user_id", null);
        SyncStorage.set("isLogin", false);
        SyncStorage.set("selected_location", null);
        SyncStorage.set("user_location", null);
        SyncStorage.set("user_gender", null);
        SyncStorage.set("user_birthday", null);
        SyncStorage.set("user_allowPush", null);
        SyncStorage.set("fbLogin", null);
        SyncStorage.set("googleLogin", null);
        SyncStorage.set("user_photo", null);
    }
}
