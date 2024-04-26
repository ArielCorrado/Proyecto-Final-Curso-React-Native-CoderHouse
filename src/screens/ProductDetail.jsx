import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import productList from "../data/productosList.json";
import { colors } from '../constants/coolors';
import { SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions';
import { generalStyles } from '../styles/generalStyles';
import ButtonCard from '../components/buttons/ButtonCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const ProductDetail = ({navigation, route}) => {

    const {productId} = route.params;
    const product = productList.find(product => product.id === productId);
    const dispatch = useDispatch();
        
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
                <Image style={styles.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </TouchableOpacity>
            <Image style={styles.productImage} src={product.imgSrc}/>
            <Text style={styles.text}>{product.description}</Text>
            <Text style={styles.price}>$ {product.price}</Text>
            <ButtonCard text="Agregar al carrito" color={colors.color2} height={40} width={"50%"} onPressFunction={() => dispatch(addToCart({id: product.id}))}/>
        </View>
    )
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
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
    text: {
        color: colors.textColor,
        fontSize: 17,
        textAlign: "center",
        fontFamily: generalStyles.primaryFont
    },
    closeIconContainer: {
        position: "absolute",
        top: 15,
        right: 15,
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
        marginTop: 10,
        fontWeight: "600",
    }
})