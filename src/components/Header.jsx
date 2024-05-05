import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Text, Pressable, Animated } from 'react-native';
import { colors } from '../constants/coolors';
import { HEADER_HEIGHT } from '../constants/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { searchText } from '../features/searchSlice';
import Menu from '../screens/Menu';
import { menuFadeIn, menuFadeOut } from '../animations/animations';

const Header = ({navigation, route}) => {

    const [menu, setMenu] = useState(<></>);
 
    const dispatch = useDispatch();
    const [searchTextInput, setSearchTextInput] = useState("");
    const cart = useSelector(state => state.cart);
    const itemsInCartTotalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
       
    useEffect(() => {
        dispatch(searchText(searchTextInput));
    }, [searchTextInput]);
           
    return (
        <>
        <View style={styles.headerCont}>
            <TouchableOpacity style={styles.headerIconsCont} onPress={() => setMenu( <Menu closeMenu={() => setMenu(<></>)} menuFadeIn={menuFadeIn} menuFadeOut={menuFadeOut}/> )}>
                <Image source={require('../../assets/images/icons/menu.png')} style={styles.headerIcons}/>
            </TouchableOpacity>
            {
                route.name === "ProductsList" ?
                <View style={styles.searchBarCont}>
                    <TextInput onChangeText={setSearchTextInput} placeholder='...Search' value={searchTextInput} style={styles.searchBarInput} />
                    <TouchableOpacity style={styles.searchBarIconCont} onPress={() => null}>
                        <Image source={require('../../assets/images/icons/search.png')} style={styles.searchBarIcon}/>
                    </TouchableOpacity>
                </View>
                :
                <Pressable onPress={() => navigation.goBack()} style={styles.backIconCont}>
                    <Image source={require('../../assets/images/icons/back.png')} style={styles.backIcon}/>                              
                </Pressable>
            }
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
        {menu}        
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    headerCont: {
        position: "relative",
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
        height: "70%",
        width: "70%",
        backgroundColor: colors.lightColor,
    },
    searchBarInput: {    
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        padding: 10,
        height: "100%",
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
    },
    backIconCont: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: 30,
        paddingBottom: 10,
    },
    backIcon: {
        width: 30,
        height: 30,
        objectFit: "contain",
        tintColor: "white",
    }
})