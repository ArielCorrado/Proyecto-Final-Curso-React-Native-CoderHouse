import { StyleSheet, Text, Animated, Pressable, Image } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_AVAILABLE_HEIGHT, SCREEN_WIDTH } from '../constants/dimensions'
import { closeIconStyle } from '../styles/generalStyles'

const Menu = ({closeMenu}) => {

    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

    const fadeIn = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start(),
            Animated.timing(translateX, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start()
        ])
    }

    const fadeOut = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start(),
            Animated.timing(translateX, {
                toValue: -SCREEN_WIDTH,
                duration: 500,
                useNativeDriver: true
            }).start(() => closeMenu())
        ])
    }
    
    const animatedStyles1 = {
        opacity: opacity,
        translateX: translateX
    };

    useEffect(() => {
        fadeIn();
    }, [])
    
    return (
        <Animated.View style={[styles.container, animatedStyles1]}>
            <Pressable onPress={fadeOut} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            <Text>Menu</Text>
        </Animated.View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        // position: "absolute",
        // left: 0,
        // top: "100%",
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