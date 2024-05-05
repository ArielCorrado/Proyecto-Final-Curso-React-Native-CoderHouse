import { StyleSheet, Text, Animated, Pressable, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_AVAILABLE_HEIGHT, SCREEN_WIDTH } from '../constants/dimensions'
import { closeIconStyle } from '../styles/generalStyles'

const Menu = ({closeMenu, handleMenuFunction, menuFadeOut }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    
    const animatedStyles1 = {
        opacity: opacity,
        translateX: translateX
    };
    
    useEffect(() => {
        handleMenuFunction(opacity, translateX, closeMenu);
    }, [handleMenuFunction])
    
    return (
        <Animated.View style={[styles.container, animatedStyles1]}>
            <Pressable onPress={() => menuFadeOut(opacity, translateX, closeMenu)} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            <Text>Menu</Text>
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
        backgroundColor: "pink"
    }
})