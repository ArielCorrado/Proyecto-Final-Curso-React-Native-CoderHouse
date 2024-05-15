import { StyleSheet, Animated, Pressable, Image, Text, View } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { SCREEN_WIDTH } from '../constants/dimensions'
import { closeIconStyle, generalStyles } from '../styles/generalStyles';
import { colors } from '../constants/coolors';
import ButtonCard from '../components/buttons/ButtonCard';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/userSlice';
import { useUpdateUserDataMutation, useGetUserDataQuery } from '../services/firebaseDB';
import { clearCart } from '../features/cartSlice';
import { SQLite } from '../persistence';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const optionList = [
    {
        text: "Inicio",
        icon: <AntDesign name="home" size={24} color="black" />,
        toScreen: "ProductsList"
    },
    {
        text: "Favoritos",
        icon: <AntDesign name="hearto" size={24} color="black" />
    },
    {
        text: "Categorías",
        icon: <Feather name="list" size={24} color="black" />
    },
    {
        text: "Mis compras",
        icon: <Feather name="shopping-bag" size={24} color="black" />
    },
    {
        text: "Mis órdenes de compra",
        icon: <Ionicons name="receipt-outline" size={24} color="black" />
    },
]

const Menu = ({closeMenu, handleMenuFunction, menuFadeOut, navigation, route}) => {
        
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

    const dispatch = useDispatch();
    const {value: user} = useSelector(state => state.user);
    const cart = useSelector(state => state.cart.value);
    const {localId} = useSelector(state => state.user.value);
    const [triggerUpdateUserData, resultUserUpdate] = useUpdateUserDataMutation();
    const {data: userAvatarDataFromDB, error, isLoading} = useGetUserDataQuery({userId: user.localId, field: "profile/avatarImage"});
    const [avatarImage, setAvatarImage] = useState(require("../../assets/images/icons/user2.png"));
    const favorites = useSelector(state => state.favorites.value);
 
    useEffect(() => {
        if (userAvatarDataFromDB) setAvatarImage({uri: userAvatarDataFromDB});
    }, [userAvatarDataFromDB])
        
    const animatedStyles1 = {
        opacity: opacity,
        translateX: translateX
    };
    
    useEffect(() => {
        handleMenuFunction(opacity, translateX, closeMenu);
    }, [handleMenuFunction])

    const handleNavigation = (route) => {
        navigation.navigate(route);
        menuFadeOut(opacity, translateX, closeMenu);
    }
            
    const logOut = () => {
        triggerUpdateUserData({userId: localId, field: "cart", data: cart});                //Guardamos carrito en base de datos;
        dispatch(clearCart());
        dispatch(clearUser());
        SQLite.clearTable();
    }   
      
    return (
        <Animated.View style={[generalStyles.screensContainer, styles.container, animatedStyles1, user.registered ? {} : {justifyContent: "center"}]}>
            <Pressable onPress={() => menuFadeOut(opacity, translateX, closeMenu)} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            {
                user.registered && 
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Mi Perfil</Text>
                    <View style={styles.profileIconContainer}>
                        <Image style={{...styles.profileIcon, ...(avatarImage ? {} : {tintColor: colors.color2})}} source={avatarImage} />
                        <Pressable style={styles.editIconContainer} onPressIn={() => navigation.navigate("EditProfile", {userId: user.localId})}>
                            <Image style={styles.editIcon} source={require("../../assets/images/icons/edit.png")} />
                        </Pressable>
                    </View>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
            }
            {   
                !user.registered &&
                    <>
                        <ButtonCard text="Iniciar Sesión" color={colors.color2} onPressFunction={() => handleNavigation("SignIn")}/>
                        <ButtonCard text="Crear Cuenta" color={colors.color3} onPressFunction={() => handleNavigation("SignUp")}/>
                    </>
            }
            {   
                user.registered &&
                    <ButtonCard text="Cerrar Sesión" color={colors.color3} height={40} width='50%' buttonStyle={{marginTop: 15}} onPressFunction={logOut}/>
            }

            <View style={styles.menuOptionsContainer}>
                {
                    optionList.map((option, index) => (
                        <Pressable key={index} style={styles.menuButtonContainer} onPress={() => handleNavigation(option.toScreen)}>
                            {option.icon}
                            <Text style={styles.menuButtonText}>{option.text}</Text>
                        </Pressable>
                    ))
                }
            </View>    
        </Animated.View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
       marginTop: 0,
       justifyContent: "flex-start",
    },
    profileContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    profileIconContainer: {
        position: "relative",
    },
    editIconContainer: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 40,
        height: 40,
    },
    editIcon: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        transform: [
            {translateX: -10},
            {translateY: 10}
        ],
    },
    profileIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        objectFit: "contain",
        margin: 20,
    },
    text: {
        fontSize: 15,
        color: colors.textColor
    },
    title: {
        fontSize: 17.5,
        fontWeight: "bold",
        color: colors.darkColor,
    },
    menuOptionsContainer: {
        width: "100%",
        marginTop: 35,
        paddingHorizontal: 10,
    },
    menuButtonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "90%",
        paddingVertical: 15,
        borderColor: colors.borderColorGray,
        borderBottomWidth: 0.5,
    },
    menuButtonText: {
        fontSize: 15,
        color: colors.textColor,
        marginLeft: 10,
        fontWeight: "500",
    }
    
})