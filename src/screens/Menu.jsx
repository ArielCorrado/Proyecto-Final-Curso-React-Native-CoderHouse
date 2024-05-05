import { StyleSheet, Text, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { SCREEN_AVAILABLE_HEIGHT, SCREEN_WIDTH } from '../constants/dimensions'

const Menu = ({closeMenu, handleFunction }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    
    const animatedStyles1 = {
        opacity: opacity,
        translateX: translateX
    };
    
    useEffect(() => {
        handleFunction(opacity, translateX, closeMenu);
    }, [handleFunction])
    
    return (
        <Animated.View style={[styles.container, animatedStyles1]}>
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