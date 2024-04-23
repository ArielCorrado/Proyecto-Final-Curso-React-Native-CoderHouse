import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import productList from "../data/productosList.json";
import { colors } from '../constants/coolors';
import { MAIN_PADDING, SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions';

const ProductDetail = ({productId, closeProductDetail}) => {

    const product = productList.find(product => product.id === productId);
    
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={closeProductDetail} style={styles.closeIconContainer}>
                <Image style={styles.closeIcon} source={require("../images/icons/close.png")} />
            </TouchableOpacity>
            <Image style={styles.productImage} src={product.imgScr}/>
            <Text style={styles.text}>{product.description}</Text>
            <Text style={styles.price}>$ {product.price}</Text>
        </View>
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: -MAIN_PADDING,
        top: -MAIN_PADDING,
        right: -MAIN_PADDING,
        bottom: -MAIN_PADDING,
        margin: "auto",
        height: SCREEN_AVAILABLE_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: colors.bordersColor,
        backgroundColor: colors.lightColor,
        padding: 20,
    },
    text: {
        color: colors.textColor,
        fontSize: 17,
        textAlign: "center"
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
    },
    productImage: {
        width: "90%",
        height: "50%",
        objectFit: "contain",
    },
    price: {
        fontSize: 25,
        marginTop: 20,
    }
})