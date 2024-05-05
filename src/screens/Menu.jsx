import { StyleSheet, Text, Animated, Pressable, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_AVAILABLE_HEIGHT, SCREEN_WIDTH } from '../constants/dimensions'
import { closeIconStyle } from '../styles/generalStyles';
import { colors } from '../constants/coolors';
import ButtonCard from '../components/buttons/ButtonCard';

const Menu = ({closeMenu, handleMenuFunction, menuFadeOut, navigation, route }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    
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
    
    return (
        <Animated.View style={[styles.container, animatedStyles1]}>
            <Pressable onPress={() => menuFadeOut(opacity, translateX, closeMenu)} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            <ButtonCard text="Iniciar Sesión" color={colors.color2} onPressFunction={() => handleNavigation("SignIn")}/>
            <ButtonCard text="Crear Cuenta" color={colors.color3} onPressFunction={() => handleNavigation("SignUp")}/>
        </Animated.View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: SCREEN_AVAILABLE_HEIGHT,
        width: "100%",
        backgroundColor: colors.lightColor,
        borderWidth: 10,
        borderColor: colors.borderColorGray,
        padding: 20,
    }
})