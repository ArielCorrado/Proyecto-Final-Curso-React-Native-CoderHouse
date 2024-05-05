import { StyleSheet } from "react-native"
import { HEADER_HEIGHT, SCREEN_AVAILABLE_HEIGHT } from "../constants/dimensions"
import { colors } from "../constants/coolors"

export const generalStyles = {
    primaryFont: "Poppins",
    screensContainer: {
        marginTop: HEADER_HEIGHT,
        height: SCREEN_AVAILABLE_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: colors.borderColorGray,
        backgroundColor: colors.lightColor,
        padding: 20,
    },
}

export const closeIconStyle = StyleSheet.create({
    closeIconContainer: {
        position: "absolute",
        top: 15,
        right: 15,
        width: 20,
        height: 20,
        zIndex: 10,
    },
    closeIcon: {
        width: "100%",
        height: "100%",
    },
})
