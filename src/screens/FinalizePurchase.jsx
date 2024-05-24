import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { generalStyles } from '../styles/generalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { useEffect } from 'react';
import ButtonCard from '../components/buttons/ButtonCard';
import { colors } from '../constants/coolors';
import { useUpdateUserDataMutation, useGetUserDataQuery } from '../services/firebaseDB';
import { spinner } from '../features/spinner';
import { GLOBAL_PRICE_MULTIPLIER } from '../constants/globalPriceMultiplier';
import { modal } from '../features/modal';

const FinalizePurchase = ({navigation, route}) => {

    const {localId} = useSelector((state) => state.user.value);
    const cartItemsData = route.params ? route.params.cartItemsData : "";
    const dispatch = useDispatch();
    const [triggerUpdateUserData, resultUpdateUser] = useUpdateUserDataMutation();
    const {data: ordersFromDB, error, isLoading, isSuccess} = useGetUserDataQuery({userId: localId, field: "orders"});
    
    useEffect(() => {
        if (isSuccess) {
            const orderItemsDataArr = cartItemsData.map((item) => (                                 //Obtenemos los datos de la orden de compra a guardar en la base de datos (por parametros de ruta)
                {
                    description: item.description,
                    itemId: item.id,
                    quantity: item.quantity,
                    price: item.price * GLOBAL_PRICE_MULTIPLIER,
                    imgSrc: item.imgSrc,
                }
            ));
            const order = {
                id: Date.now(),
                inProgress: "true",
                items: orderItemsDataArr,
            }
            const ordersUpdated = ordersFromDB ? [...ordersFromDB] : [];
            ordersUpdated.push(order);
            triggerUpdateUserData({userId: localId, field: "orders", data: ordersUpdated}); 
        }
        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));
    }, [isSuccess, isLoading])

    useEffect(() => {
        if (resultUpdateUser.isSuccess) {
            dispatch(clearCart());
        } else if (resultUpdateUser.isError) {
            dispatch(modal({show: true, text: "Error al actualizar datos de órdenes en la base de datos", icon: "Error"}));
        }
    }, [resultUpdateUser]);
    
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text style={styles.text1}>Ocurrió un error al finalizar la compra, intenta nuevamente</Text>
            </View>
        )
    } else if (isSuccess) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text style={styles.text2}>Gracias por elgirnos!</Text>
                <Text style={styles.text1}>Tu orden de compra está siendo procesada</Text>
                <ButtonCard text="Ir a mis órdenes de compra" color={colors.color2} height={60} width={"80%"} textStyle={{textAlign: "center", fontSize: 17.5}} onPressFunction={() => navigation.navigate("Orders")}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 17.5,
        textAlign: 'center',
        marginBottom: 20,
    },
    text2: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    }
})

export default FinalizePurchase;
