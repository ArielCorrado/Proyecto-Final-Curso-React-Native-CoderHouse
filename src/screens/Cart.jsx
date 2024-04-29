import { StyleSheet, View, Image, Text, Pressable, FlatList } from 'react-native';
import productList from "../data/productosList.json";
import { colors } from '../constants/coolors';
import { SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions';
import { useSelector } from 'react-redux';
import { closeIconStyle } from '../styles/generalStyles';
import { CardCart } from '../components/cards/CardCart';

const Cart = ({navigation}) => {

    const cart = useSelector(state => state.cart);
    const itemsInCartDataArr = cart.map((productInCart) => ({...productInCart, ...productList.find((productInList) => productInList.id === productInCart.id)}));
    const itemsInCartTotalQuantity = itemsInCartDataArr.reduce((acc, product) => acc + product.quantity, 0);

    const style = StyleSheet.create({
        container: {
            height: SCREEN_AVAILABLE_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 10,
            borderColor: colors.borderColorGray,
            backgroundColor: colors.lightColor,
            paddingTop: itemsInCartTotalQuantity ? 50 : 0,
        },
        emptyCartText: {
            fontSize: 17.5,
        }
    })

    return (
        itemsInCartTotalQuantity > 0 ?
        <View style={style.container} >
            <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            <FlatList
                contentContainerStyle={style.flatList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={itemsInCartDataArr}
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
        </View> :
        <View style={style.container}>
            <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            <Text style={style.emptyCartText}>No hay productos en el carrito</Text>
        </View>
    )
}

export default Cart;
