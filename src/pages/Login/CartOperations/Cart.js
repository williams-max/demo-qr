import React from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import { MowContainer } from "../../../components/ui/Core/Container/MowContainer";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { borderStyle, cardStyle, categoryStyleWithoutShadow, fontFamily } from "../../../values/Styles/MowStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MowButton } from "../../../components/ui/Common/Button/MowButton";
import { navigate } from "../../../RootMethods/RootNavigation";
import CartData from "../../../SampleData/CartData";
import { isTablet } from "../../../values/Constants/MowConstants";

export default class Cart extends React.Component {

    state = {
        cartData: CartData,
        cartDataListKey: 0,
        cartTotal: 3057,
        couponCode: ""
    };

    _deleteItemFromCart(index) {
        let cartData = this.state.cartData;

        cartData.splice(index, 1);

        this.setState({ cartData: cartData, cartDataListKey: this.state.cartDataListKey + 1 });
    }

    _calculateTotalPrice(flag, index) {

        let count = this.state.cartData[index]["count"];

        // +1 product
        if (flag) {
            count++;

            this._updateProductCount(count, index);
        }
        // -1 product
        else {
            if (count !== 1) {
                count--;

                this._updateProductCount(count, index);
            }
        }
    }

    // to update product count according to the user value
    _updateProductCount(value, index) {

        // the value that entered by user
        value = Number(value);

        let newArray = [...this.state.cartData];

        // to update product count according to the value
        newArray[index]["count"] = value;

        // to update new array with new product cost
        newArray = this._updateProductCost(index, newArray, value);

        let totalPrice = 0;
        for (let i in newArray) {
            let price = Number(newArray[i]["totalPrice"]);
            totalPrice += price;
        }

        this.setState({
            cartData: newArray,
            cartTotal: totalPrice
        });

    }

    // to update product total cost
    _updateProductCost(index, productArr, count) {

        // to get product product price
        let price = productArr[index]["price"];

        // to calculate new product total price and update
        productArr[index]["totalPrice"] = (price * count);

        // return new product array
        return productArr;
    }

    _renderCart(item, index) {
        return (

            <View
                key={index}
                style={[categoryStyleWithoutShadow, {
                    flexDirection: "row",
                    marginVertical: 5,
                    backgroundColor: mowColors.viewBGColor,
                    padding: 10,
                    ...cardStyle,
                    marginRight: 5,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0
                }]}>

                <View
                    style={{
                        width: isTablet ? wp(10) : wp(15),
                        alignItems: "center",
                        justifyContent: "center",
                    }}>

                    <Image
                        resizeMode={"contain"}
                        style={{ width: hp("10%"), height: hp("10%") }}
                        source={item["image"]} />

                </View>

                <View
                    style={{ flex: 4, marginLeft: 10 }}>

                    <View
                        style={{ flexDirection: "row" }}>

                        {/* product title text */}
                        <Text
                            style={{
                                flex: 10,
                                fontSize: hp("1.7%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                textAlign: "left",
                                color: mowColors.titleTextColor,
                                marginBottom: 10,
                                paddingRight: 5,
                                fontFamily: fontFamily.semiBold,
                            }}>

                            {item["title"]}

                        </Text>

                        <TouchableOpacity
                            onPress={() => { this._deleteItemFromCart(index) }}
                            style={{ flex: 1 }}>

                            <FeatherIcon
                                style={{
                                    textAlign: "center",
                                    color: mowColors.mainColor,
                                    fontSize: hp("2.5%")
                                }}
                                name={"trash-2"} />

                        </TouchableOpacity>

                    </View>

                    <View
                        style={{ alignItems: "center", flexDirection: "row" }}>

                        <View
                            style={{
                                flex: 3,
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                justifyContent: "flex-start"
                            }}>

                            {/* minus button view */}
                            <TouchableOpacity
                                onPress={() => { this._calculateTotalPrice(false, index) }}
                                style={minusPlusStyle.container}>

                                <Text
                                    style={minusPlusStyle.text}>

                                    -

                                </Text>

                            </TouchableOpacity>

                            {/* product count text */}
                            <Text
                                style={{
                                    fontSize: hp("2%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "center",
                                    color: mowColors.titleTextColor,
                                    marginHorizontal: 15,
                                    fontFamily: fontFamily.semiBold
                                }}>

                                {item["count"]}

                            </Text>

                            {/* plus button view*/}
                            <TouchableOpacity
                                onPress={() => { this._calculateTotalPrice(true, index) }}
                                style={minusPlusStyle.container}>

                                <Text
                                    style={minusPlusStyle.text}>

                                    +

                                </Text>

                            </TouchableOpacity>

                        </View>

                        {/* price view */}
                        <View
                            style={{ flex: 1.5 }}>

                            <Text
                                style={{
                                    fontSize: hp("2%"),
                                    fontWeight: "bold",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "right",
                                    color: mowColors.titleTextColor,
                                    fontFamily: fontFamily.bold
                                }}>

                                {item["currencyIcon"]}{item["totalPrice"]}

                            </Text>

                        </View>

                    </View>

                </View>

            </View>

        )
    }

    render() {

        let { cartTotal } = this.state

        return (

            <MowContainer
                footerActiveIndex={3}
                title={mowStrings.cart}
                style={{ backgroundColor: mowColors.pageBGDarkColor }}>

                <Text style={{ textAlign: 'center', marginTop: 200 }}>My Card</Text>

            </MowContainer>

        )

    }

}

const minusPlusStyle = ({
    container: {
        borderRadius: 3,
        backgroundColor: "#ffffff",
        ...borderStyle,
        alignItems: "center",
        justifyContent: "center",
        width: hp("3%"),
        height: hp("3%"),
    },
    text: {
        fontSize: hp("2%"),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070",
    }
});
