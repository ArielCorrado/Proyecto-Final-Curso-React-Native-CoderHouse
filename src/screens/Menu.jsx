import { StyleSheet, Animated, Pressable, Image, Text, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_WIDTH } from '../constants/dimensions'
import { closeIconStyle, generalStyles } from '../styles/generalStyles';
import { colors } from '../constants/coolors';
import ButtonCard from '../components/buttons/ButtonCard';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/userSlice';

const Menu = ({closeMenu, handleMenuFunction, menuFadeOut, navigation, route}) => {
        
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

    const dispatch = useDispatch();
    const {value: user} = useSelector(state => state.user);
    
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
        dispatch(clearUser())
    }   
    
    return (
        <Animated.View style={[generalStyles.screensContainer, styles.container, animatedStyles1, user.registered ? {} : {justifyContent: "center"}]}>
            <Pressable onPress={() => menuFadeOut(opacity, translateX, closeMenu)} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            {
                user.registered && 
                <View style={styles.profileContainer}>
                    <View style={styles.profileIconContainer}>
                        <Image style={styles.profileIcon} source={require("../../assets/images/icons/user2.png")} />
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
        objectFit: "contain",
        margin: 20,
        tintColor: colors.color2,
    },
    text: {
        fontSize: 15,
        color: colors.textColor
    },
})