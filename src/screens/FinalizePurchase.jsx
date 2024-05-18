import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { generalStyles } from '../styles/generalStyles';
import { useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { useEffect } from 'react';
import ButtonCard from '../components/buttons/ButtonCard';
import { colors } from '../constants/coolors';
import { useSelector } from 'react-redux';

const FinalizePurchase = () => {

    const cart = useSelector(state => state.cart.value);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(clearCart());
    }, [])
    
    return (
        <View style={generalStyles.screensContainer}>
            <Text style={styles.text1}>Compra finalizada</Text>
            <Text style={styles.text2}>Gracias por elgirnos!</Text>
            <ButtonCard text="Ir a mis órdenes de compra" color={colors.color2} height={60} width={"80%"} textStyle={{textAlign: "center", fontSize: 17.5}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 17.5,
        textAlign: 'center',
        marginBottom: 10
    },
    text2: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    }
})

export default FinalizePurchase;
