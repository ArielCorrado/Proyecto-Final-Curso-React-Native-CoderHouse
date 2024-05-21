import { StyleSheet, View, Text, FlatList} from 'react-native';
import { useGetUserDataQuery } from '../services/firebaseDB';
import { useSelector } from 'react-redux';
import { generalStyles } from '../styles/generalStyles';
import { formatDate,insertDotsInPrice } from '../functions/utils';
import ButtonCard from '../components/buttons/ButtonCard';
import { colors } from '../constants/coolors';
import { spinner } from '../features/spinner';
import { useEffect } from 'react';
import { CardOder } from '../components/cards/CardOrder';
import { useGetUserOrderQuery } from '../services/firebaseDB';

const Order = ({route}) => {

    const {id: orderId} = route.params;
    const {localId} = useSelector(state => state.user.value);
    const {data: order, error, isLoading} = useGetUserOrderQuery({userId: localId, orderId: orderId});
    const itemsArr = order ? Object.values(order)[0].items : [];
     
    return (
        <View style={[generalStyles.screensContainer, styles.orderContainer]}>
            <FlatList
                contentContainerStyle={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={itemsArr}
                renderItem={({item}) =>
                    <CardOder
                        price={item.price}
                        description={item.description}
                        quantity={item.quantity}
                        imgSrc={item.imgSrc}
                    />
                }
            />
            <View style={styles.totalPriceCont}>
                <Text style={[styles.totalPrice, styles.totalPriceText]}>Total:  </Text>
                <Text style={styles.totalPrice}>$ {insertDotsInPrice(itemsArr.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
    },
    orderContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 0,
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
    totalPrice: {
        fontSize: 20,
        fontWeight: "900",
        color: colors.color3,
        marginVertical: 10,
    },
    totalPriceText: {
        color: colors.textColor,
        fontWeight: "500",
        fontSize: 17.5,
    },
    totalPriceCont: {
        display: "flex",
        justifyContent: "center",   
        alignItems: "baseline",
        flexDirection: "row",
        borderTopColor: colors.borderColorGray,
        borderTopWidth: 1,
        width: "100%",
    }
})

export default Order;
