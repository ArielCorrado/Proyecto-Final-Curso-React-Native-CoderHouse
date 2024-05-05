import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions'

const Menu = () => {

    const opacity = useRef(new Animated.Value(0)).current;

    const opacityOn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();
    }

    const animatedStyles = {
        opacity: opacity
    };

    useEffect(() => {
        opacityOn();
    }, [])
    
    return (
        <Animated.View style={[styles.container, animatedStyles]}>
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
    }
})