import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { colors } from '../constants/coolors';
import { generalStyles } from '../styles/generalStyles';
import ButtonCard from '../components/buttons/ButtonCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice'; 
import { insertDotsInPrice } from '../functions/utils';
import { closeIconStyle } from '../styles/generalStyles';
import { useGetProductByIdQuery } from '../services/firebaseDB';
import { spinner } from '../features/spinner';
import { setTitle } from '../features/titleSlice';
import { modal } from '../features/modal';
import { useFocusEffect } from '@react-navigation/native';
import { GLOBAL_PRICE_MULTIPLIER } from '../constants/globalPriceMultiplier';

const ProductDetail = ({navigation, route}) => {

    const {registered} = useSelector(state => state.user.value);
    const {productId} = route.params;
    const dispatch = useDispatch();
    const {data: product, error, isLoading} = useGetProductByIdQuery(productId);
    const cart = useSelector(state => state.cart.value);
       
    const addToCardIfNotExistsAndRedirect = () => {                                     //Seleccionamos "Comprar Ahora"...
        const exists = cart.find((item) => item.id === product.id);                     //Verificamos si el producto ya existe en el carrito
        if (!exists) dispatch(addToCart(product.id));                                   //Si nó existe lo agregamos    
        navigation.navigate("Cart");
    }

    useFocusEffect (                                                                    //Setemos título de screen en el header
        useCallback(() => {
           dispatch(setTitle("Detalles de Producto"))
        })
    )

    useEffect(() => {
        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));
    }, [isLoading])
    
    const updateCart = () => {
        dispatch(addToCart(product.id))
        dispatch(modal({show: true, text: "Producto agregado. Puedes modificicar su cantidad en el carrito", icon: "Info"}))
    };
    
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener los datos del producto</Text>
            </View>
        )
    } else if (product) {
        return (
            <View style={generalStyles.screensContainer} >
                <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                    <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
                </Pressable>
                <Image style={styles.productImage} src={product.imgSrc} />
                <Text style={styles.text}>{product.description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(product.price * GLOBAL_PRICE_MULTIPLIER)}</Text>
                <ButtonCard text="Agregar al carrito" color={colors.color2} height={60} width={"70%"} onPressFunction={() => registered ? updateCart() : dispatch(modal({show: true, text: "Debes iniciar sesión para usar el carrito", icon: "Info", redirect: "SignIn"}))} />
                <ButtonCard text="Comprar ahora" color={colors.color3} height={60} width={"70%"} onPressFunction={() => registered ? addToCardIfNotExistsAndRedirect() : dispatch(modal({show: true, text: "Debes iniciar sesión realizar compras", icon: "Info", redirect: "SignIn"}))} />
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