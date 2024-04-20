import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import productList from "../data/productosList.json"
import { colors } from '../constants/coolors'

const ProductDetail = ({productId, closeProductDetail}) => {

    const product = productList.find(product => product.id === productId);

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={closeProductDetail} style={styles.closeIconContainer}>
                <Image style={styles.closeIcon} source={require("../images/icons/close.png")} />
            </TouchableOpacity>
            <Text style={styles.text}>{product.description}</Text>
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: "0",
        top: "0",
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "pink",
    },
    text: {
        color: colors.textColor,
    },
    closeIconContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 20,
        height: 20,
    },
    closeIcon: {
        width: "100%",
        height: "100%",
    }
})