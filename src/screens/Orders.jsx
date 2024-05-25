import { StyleSheet, View, Text, FlatList} from 'react-native';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../services/firebaseDB';
import { useSelector } from 'react-redux';
import { generalStyles } from '../styles/generalStyles';
import { formatDate,insertDotsInPrice } from '../functions/utils';
import ButtonCard from '../components/buttons/ButtonCard';
import { colors } from '../constants/coolors';
import { spinner } from '../features/spinner';
import { useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { modal } from '../features/modal';
import { setTitle } from '../features/titleSlice';
import { useFocusEffect } from '@react-navigation/native';

const Orders = ({navigation}) => {

    const dispatch = useDispatch();
    const {localId} = useSelector(state => state.user.value);
    const {data: ordersFromDB, error, isLoading, isSuccess} = useGetUserDataQuery({userId: localId, field: "orders"});
    const [triggerUpdateUserData, resultUpdateUser] = useUpdateUserDataMutation();
    const [orders, setOrders] = useState([]);
    
    useFocusEffect (                                                                                            //Setemos título de screen en el header
        useCallback(() => {
           dispatch(setTitle("Mis Órdenes"))
        })
    )

    useEffect(() => {
        if (ordersFromDB && ordersFromDB.length) {
            let ordersSort = [...ordersFromDB];
            ordersSort = ordersSort.filter((order) => JSON.parse(order.inProgress) === true);                  //Filtramos órdenes de compra por estado "en progreso"
            setOrders(ordersSort.sort((a, b) => b.id - a.id));
        }

        if (!resultUpdateUser.isLoading) {
            if (isLoading) {
                dispatch(spinner({show: true}))
            } else if (isSuccess) {
                dispatch(spinner({show: false}));
            } 
        }

        if (resultUpdateUser.isSuccess) {
            dispatch(spinner({show: false}))
            dispatch(modal({show: true, text: "Compra finalizada. Gracias por elegirnos!", icon: "Success"}));
        } else if (resultUpdateUser.isError) {
            dispatch(spinner({show: false}))
            dispatch(modal({show: true, text: "Error al guardar datos de compra. Intenta nuevamente", icon: "Error"}));
        }
    }, [isLoading, ordersFromDB, resultUpdateUser])

    const finalizePurchase = (orderId) => {
        dispatch(spinner({show: true}))
        const ordersFromDBAux = JSON.parse(JSON.stringify(ordersFromDB)); 
        const orderIndexToFinalize = ordersFromDBAux.findIndex((order) => order.id === orderId);
        ordersFromDBAux[orderIndexToFinalize].inProgress = "false";
        triggerUpdateUserData({userId: localId, field: "orders", data: ordersFromDBAux}); 
    }
    
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener órdenes de compra</Text>
            </View>
        )
    } else if (!orders || !orders.length ) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text style={styles.emptyCartText}>No tienes órdenes en proceso</Text>
            </View>
        )
    } else {
        return (
            <View style={[generalStyles.screensContainer, styles.ordersContainer]}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={orders}
                    renderItem={({ item: order }) =>
                        <View style={styles.orderCardCont}>
                            <View style={styles.textContainer}>
                                <Text style={styles.textBold}>Fecha: </Text>
                                <Text style={styles.text}>{formatDate(order.id)}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textBold}>Orden Nº: </Text>
                                <Text style={styles.text}>{order.id}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textBold}>Estado: </Text>
                                <Text style={styles.text}>En proceso</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.textBold}>TOTAL: $ </Text>
                                <Text style={styles.text}>{insertDotsInPrice(order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</Text>
                            </View>
                            <View style={styles.buttosCont}>
                                <ButtonCard
                                    text="Detalles"
                                    color={colors.color2}
                                    height={40}
                                    width={"35%"}
                                    textStyle={{ textAlign: "center", fontSize: 16 }}
                                    buttonStyle={{ alignSelf: "center", marginTop: 20, marginRight: 20, paddingHorizontal: 0}}
                                    onPressFunction={() => navigation.navigate("Order", {id: order.id, title: "Mi orden de compra"})}
                                />
                                <ButtonCard
                                    text="Recibí los productos"
                                    color={colors.color3}
                                    height={40}
                                    width={"60%"}
                                    textStyle={{ textAlign: "center", fontSize: 16 }}
                                    buttonStyle={{ alignSelf: "center", marginTop: 20, paddingHorizontal: 0}}
                                    onPressFunction={() => finalizePurchase(order.id)}
                                />
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
   
}

const styles = StyleSheet.create({
    flatList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
    },
    orderCardCont: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        borderBottomWidth: 0.5,
        borderColor: colors.borderColorGray,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    ordersContainer: {
        padding: 0,
        alignItems: "unset"
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginVertical: 3,
    },
    textBold: {
        fontSize: 15,
        color: colors.textColor,
        fontWeight: "bold",
    },
    text: {
        fontSize: 15,
        color: colors.textColor,
    },
    emptyCartText: {
        fontSize: 17.5,
    },
    buttosCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    },
})

export default Orders;
