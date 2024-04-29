import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Text } from 'react-native';
import { colors } from '../constants/coolors';
import { HEADER_HEIGHT } from '../constants/dimensions';
import { useSelector } from 'react-redux';

const Header = ({navigation}) => {

    const [searchText, setSearchText] = useState("");
    const cart = useSelector(state => state.cart);
    const itemsInCartTotalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    useEffect(() => {
        if (searchText.length < 3) {
            return;
        } else {
            navigation.navigate("ProductsList", {searchText: searchText});
        }
    }, [searchText]);
 
    return (
        <View style={styles.headerCont}>
            <TouchableOpacity style={styles.headerIconsCont} >
                <Image source={require('../../assets/images/icons/menu.png')} style={styles.headerIcons}/>
            </TouchableOpacity>
            <View style={styles.searchBarCont}>
                <TextInput onChangeText={setSearchText} placeholder='...Search' value={searchText} style={styles.searchBarInput} />
                <TouchableOpacity style={styles.searchBarIconCont} onPress={() => navigation.navigate("ProductsList", {searchText: searchText})}>
                    <Image source={require('../../assets/images/icons/search.png')} style={styles.searchBarIcon}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.headerIconsCont} onPress={() => itemsInCartTotalQuantity > 0 ? navigation.navigate("Cart") : null}>
                <Image source={require('../../assets/images/icons/cart.png')} style={styles.headerIcons}/>
                {  
                    itemsInCartTotalQuantity > 0
                    && 
                    <View style={styles.cartItemsAmountCont}>
                        <Text style={styles.cartItemsAmountText}>{cart.reduce((acc, product) => product.quantity + acc, 0)}</Text>
                    </View>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: HEADER_HEIGHT,
        width: "100%",
        backgroundColor: colors.color2,
    },  
    searchBarCont: {    
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "80%",
        width: "70%",
        backgroundColor: colors.lightColor,
    },
    searchBarInput: {    
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        padding: 10,
        height: "80%",
        width: "80%",
    },
    searchBarIconCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100%",
        width: "20%",
    },
    searchBarIcon: {    
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        height: "70%",
        width: "100%",
        objectFit: "contain",
        tintColor: colors.color2
    },
    headerIconsCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",        
        width: "15%",
    },
    headerIcons: {
        width: "80%",
        height: "50%",
        objectFit: "contain",
        tintColor: "white"
    },
    cartItemsAmountCont: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 25,
        width: 25,
        borderRadius: 12.5,
        top: 5,
        right: 5,
        backgroundColor: colors.color3,
    },
    cartItemsAmountText: {
        color: colors.lightColor
    }
})