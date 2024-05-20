import { StyleSheet, View, Text, FlatList} from 'react-native';
import { useGetUserDataQuery } from '../services/firebaseDB';
import { useSelector } from 'react-redux';
import { generalStyles } from '../styles/generalStyles';
import { formatDate,insertDotsInPrice } from '../functions/utils';
import ButtonCard from '../components/buttons/ButtonCard';
import { colors } from '../constants/coolors';
import { spinner } from '../features/spinner';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Orders = ({navigation}) => {

    const dispatch = useDispatch();
    const {localId} = useSelector(state => state.user.value);
    const {data: ordersFromDB, error, isLoading} = useGetUserDataQuery({userId: localId, field: "orders"});

    useEffect(() => {
        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));
    }, [isLoading])
    
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener órdenes de compra</Text>
            </View>
        )
    } else if (!ordersFromDB || !ordersFromDB.length ) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text style={styles.emptyCartText}>Todavía no tienes órdenes de compra</Text>
            </View>
        )
    } else {
        return (
            <View style={[generalStyles.screensContainer, styles.ordersContainer]}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={ordersFromDB}
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
                                <Text style={styles.textBold}>TOTAL: $ </Text>
                                <Text style={styles.text}>{insertDotsInPrice(order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</Text>
                            </View>
                            <ButtonCard
                                text="Detalles"
                                color={colors.color2}
                                height={40}
                                width={"60%"}
                                textStyle={{ textAlign: "center", fontSize: 17.5 }}
                                buttonStyle={{ alignSelf: "center", marginTop: 20 }}
                                onPressFunction={() => navigation.navigate("Order", {id: order.id})}
                            />
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
    }
})

export default Orders;