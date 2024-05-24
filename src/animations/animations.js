import { Animated } from "react-native";
import { SCREEN_WIDTH } from "../constants/dimensions";

export const menuFadeIn = (opacity, translateX) => {                        //Animación de entrada del menú
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

export const menuFadeOut = (opacity, translateX, cb) => {                   //Animación de salida del menú
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
        }).start(() => cb())
    ])
}