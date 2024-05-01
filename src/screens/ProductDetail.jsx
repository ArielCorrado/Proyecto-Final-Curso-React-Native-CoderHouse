import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../constants/coolors';
import { SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions';
import { generalStyles } from '../styles/generalStyles';
import ButtonCard from '../components/buttons/ButtonCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { insertDotsInPrice } from '../functions/utils';
import { closeIconStyle } from '../styles/generalStyles';
import { useGetProductByIdQuery } from '../services/firebaseDB';

const ProductDetail = ({navigation, route}) => {

    const {productId} = route.params;
    const dispatch = useDispatch();
    const {data: product, error, isLoading} = useGetProductByIdQuery(productId);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        )
    } else if (error) {
        return (
            <View style={styles.container}>
                <Text>Error al obtener los datos del producto</Text>
            </View>
        )
    } else if (product) {
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                    <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
                </TouchableOpacity>
                <Image style={styles.productImage} src={product.imgSrc} />
                <Text style={styles.text}>{product.description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(product.price)}</Text>
                <ButtonCard text="Agregar al carrito" color={colors.color2} height={60} width={"70%"} onPressFunction={() => dispatch(addToCart(product.id))} />
                <ButtonCard text="Comprar ahora" color={colors.color3} height={60} width={"70%"} onPressFunction={() => null} />
            </View>
        )
    } else if (!product) {
        <View style={styles.container}>
            <Text>Producto no encontrado</Text>
        </View>
    }   
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
    productImage: {
        width: "90%",
        height: "50%",
        objectFit: "contain",
    },
    price: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 50,
        fontWeight: "600",
    }
})