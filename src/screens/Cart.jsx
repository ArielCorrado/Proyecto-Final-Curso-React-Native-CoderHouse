import { StyleSheet, View, Image, Text, Pressable, FlatList } from 'react-native';
import { colors } from '../constants/coolors';
import { SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions';
import { useSelector } from 'react-redux';
import { closeIconStyle } from '../styles/generalStyles';
import { CardCart } from '../components/cards/CardCart';
import { insertDotsInPrice } from '../functions/utils';
import ButtonCard from '../components/buttons/ButtonCard';
import { useGetProductsQuery } from '../services/firebaseDB';
import { useState, useEffect } from 'react';

const Cart = ({navigation}) => {

    const cart = useSelector(state => state.cart);
    const [cartData, setCartData] = useState({
        cartItemsData: null,
        itemsInCartTotalQuantity: 0,
        totalPrice: 0,
    })

    const {data: allProductsFromDB, error, isLoading} = useGetProductsQuery();
    
    useEffect(() => {
        if (allProductsFromDB) {
            const cartItemsData = cart.map((cartItem) => ({ ...allProductsFromDB.find((dBitem) => dBitem.id === cartItem.id), ...cartItem}));
            const itemsInCartTotalQuantity = cartItemsData.reduce((acc, product) => acc + product.quantity, 0);
            const totalPrice = cartItemsData.reduce((acc, item) => (item.quantity * item.price) + acc, 0);
            setCartData({cartItemsData, itemsInCartTotalQuantity, totalPrice});
        }    
    }, [allProductsFromDB, cart])

    if (isLoading) {
        return  (
            <View style={styles.noResultsTextCont}>
                <Text>Cargando...</Text>
            </View>
        )
    } else if (error) {
        return (
            <View style={styles.noResultsTextCont}>
                <Text>Error al obtener datos de productos</Text>
            </View>
        )
    } else if (cartData.cartItemsData) {
        return (
            cartData.itemsInCartTotalQuantity > 0 ?
            <View style={styles.container} >
                <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                    <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
                </Pressable>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={cartData.cartItemsData}
                    renderItem={({ item }) =>
                        <CardCart
                            price={item.price}
                            description={item.description}
                            imgSrc={item.imgSrc}
                            id={item.id}
                            quantity={item.quantity}
                        />
                    }
                />
                <View style={styles.totalPriceCont}>
                    <Text style={[styles.totalPrice, styles.totalPriceText]}>Total:  </Text>
                    <Text style={styles.totalPrice}>$ {insertDotsInPrice(cartData.totalPrice)}</Text>
                </View>
                <ButtonCard text="Comprar ahora" color={colors.color3} height={60} width={"70%"} onPressFunction={() => null} />
            </View>
            :
            <View style={styles.container}>
                <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                    <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
                </Pressable>
                <Text style={styles.emptyCartText}>No hay productos en el carrito</Text>
            </View>
        )
    } 
          
    // return (
    //     cartData.itemsInCartTotalQuantity > 0 ?
    //     <View style={styles.container} >
    //         <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
    //             <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
    //         </Pressable>
    //         <FlatList
    //             contentContainerStyle={styles.flatList}
    //             showsVerticalScrollIndicator={false}
    //             keyExtractor={item => item.id}
    //             data={cartData.cartItemsData}
    //             renderItem={({ item }) =>
    //                 <CardCart
    //                     price={item.price}
    //                     description={item.description}
    //                     imgSrc={item.imgSrc}
    //                     id={item.id}
    //                     quantity={item.quantity}
    //                 />
    //             }
    //         />
    //         <View style={styles.totalPriceCont}>
    //             <Text style={[styles.totalPrice, styles.totalPriceText]}>Total:  </Text>
    //             <Text style={styles.totalPrice}>$ {insertDotsInPrice(cartData.totalPrice)}</Text>
    //         </View>
    //         <ButtonCard text="Comprar ahora" color={colors.color3} height={60} width={"70%"} onPressFunction={() => null}/>
    //     </View> 
    //     :
    //     <View style={styles.container}>
    //         <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
    //             <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
    //         </Pressable>
    //         <Text style={styles.emptyCartText}>No hay productos en el carrito</Text>
    //     </View>
    // )
}

const styles = StyleSheet.create({
    container: {
        height: SCREEN_AVAILABLE_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: colors.borderColorGray,
        // paddingTop: itemsInCartTotalQuantity ? 50 : 0,
    },
    emptyCartText: {
        fontSize: 17.5,
    },
    flatList: {
        zIndex: -1,
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

export default Cart;