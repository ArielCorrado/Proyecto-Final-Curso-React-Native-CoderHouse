import { StyleSheet } from "react-native"

export const generalStyles = {
    primaryFont: "Poppins"
}

export const closeIconStyle = StyleSheet.create({
    closeIconContainer: {
        position: "absolute",
        top: 15,
        right: 15,
        width: 20,
        height: 20,
        zIndex: 10,
        display: "none",
    },
    closeIcon: {
        width: "100%",
        height: "100%",
    },
})