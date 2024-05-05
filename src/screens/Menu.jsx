import { StyleSheet, Text, Animated, Pressable, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_AVAILABLE_HEIGHT, SCREEN_WIDTH } from '../constants/dimensions'
import { closeIconStyle } from '../styles/generalStyles'

const Menu = () => {

    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

    const opacityOn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    const translateRight = () => {
        Animated.timing(translateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }
    
    const animatedStyles1 = {
        opacity: opacity
    };

    const animatedStyles2 = {
        translateX: translateX
    };


    useEffect(() => {
        opacityOn();
        translateRight();
    }, [])
    
    return (
        <Animated.View style={[styles.container, animatedStyles2, animatedStyles1]}>
            <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
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
        // borderColor: colors.borderColorGray,
        // borderWidth: 5,
        backgroundColor: "pink"
    }
})