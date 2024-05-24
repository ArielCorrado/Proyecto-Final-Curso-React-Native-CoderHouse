import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Text, Pressable } from 'react-native';
import { colors } from '../constants/coolors';
import { HEADER_HEIGHT } from '../constants/dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { searchText } from '../features/searchSlice';
import Menu from '../screens/Menu';
import { menuFadeIn, menuFadeOut } from '../animations/animations';
import { modal } from '../features/modal';
import { useUpdateUserDataMutation } from '../services/firebaseDB';

const Header = ({navigation, route}) => {
   
    const [menu, setMenu] = useState(null);
    let menuAnimating = useRef(false);
 
    const dispatch = useDispatch();
    const [searchTextInput, setSearchTextInput] = useState("");
    const cart = useSelector(state => state.cart.value);
    const title = useSelector(state => state.title.value);
    const {registered, localId} = useSelector(state => state.user.value);
    const itemsInCartTotalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [triggerUpdateUserData, resultUserUpdate] = useUpdateUserDataMutation();
       
    useEffect(() => {
        dispatch(searchText(searchTextInput));
    }, [searchTextInput]);

    useEffect(() => {
        triggerUpdateUserData({userId: localId, field: "cart", data: cart});
    }, [cart])

    useEffect(() => {
        if (resultUserUpdate.isError) {
            dispatch(modal({show: true, text: "Error al actualizar carrito", icon: "Error"}));
        }
    }, [resultUserUpdate])
        
    const handleMenu = () => {
        if (!menuAnimating.current) {
            menuAnimating.current = true;
            menu ? 
            setMenu( <Menu closeMenu={() => setMenu(null)} handleMenuFunction={menuFadeOut} menuFadeOut={menuFadeOut} navigation={navigation} route={route} /> ) :
            setMenu( <Menu closeMenu={() => setMenu(null)} handleMenuFunction={menuFadeIn} menuFadeOut={menuFadeOut} navigation={navigation} route={route} /> );
            setTimeout(() => {
                menuAnimating.current = false;
            }, 500);
        }
    }

    const handleCartIconPress = () =>  {
        if (itemsInCartTotalQuantity > 0 && registered) {
            navigation.navigate("Cart");
        } else if (!registered) {;
            dispatch(modal({show: true, text: "Debes iniciar sesión para ingresar al carrito", icon: "Info"}))
            navigation.navigate("SignIn");
        } else if (itemsInCartTotalQuantity === 0 && registered) {
            dispatch(modal({show: true, text: "El carrito está vacío", icon: "Info"}))
        }
    }
           
    return (
        <>
            <View style={styles.headerCont}>
                <TouchableOpacity style={styles.headerIconsCont} onPress={handleMenu}>
                    <Image source={require('../../assets/images/icons/menu.png')} style={styles.headerIcons}/>
                </TouchableOpacity>
                {                                                                                                                                           
                    route.name !== "ProductsList" || menu ?                                                                 //Ocultamos barra de busqueda si no estamos en la screen "ProductsList" o si está el menú abierto
                    (   
                        (!menu && route.name !== "FinalizePurchase") &&
                        <>
                            <Pressable onPress={() => navigation.goBack()} style={styles.backIconCont}>
                                <Image source={require('../../assets/images/icons/back.png')} style={styles.backIcon}/>                              
                            </Pressable>
                            <Text style={styles.title}>{title}</Text>
                        </>
                    )
                    :
                    <View style={styles.searchBarCont}>
                        <TextInput onChangeText={setSearchTextInput} placeholder='...Search' value={searchTextInput} style={styles.searchBarInput} />
                        <TouchableOpacity style={styles.searchBarIconCont} onPress={() => null}>
                            <Image source={require('../../assets/images/icons/search.png')} style={styles.searchBarIcon} />
                        </TouchableOpacity>
                    </View>
                }
                {
                    !menu &&
                    <TouchableOpacity style={styles.headerIconsCont} onPress={handleCartIconPress}>
                        <Image source={require('../../assets/images/icons/cart.png')} style={styles.headerIcons}/>
                        {  
                            itemsInCartTotalQuantity > 0
                            && 
                            <View style={styles.cartItemsAmountCont}>
                                <Text style={styles.cartItemsAmountText}>{cart.reduce((acc, product) => product.quantity + acc, 0)}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                }
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
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: 30,
        left: 80,
        top: 0,
        bottom: 0,
        margin: "auto",
    },
    backIcon: {
        width: "90%",
        height: "100%",
        objectFit: "contain",
        tintColor: "white",
    },
    title: {
        color: "white",
        fontSize: 17.5,
        fontWeight: "bold",
    }
})