import { StyleSheet, View, Image, Text, Pressable, FlatList } from 'react-native';
import productList from "../data/productosList.json";
import { colors } from '../constants/coolors';
import { SCREEN_AVAILABLE_HEIGHT } from '../constants/dimensions';
import { useSelector } from 'react-redux';
import { closeIconStyle } from '../styles/generalStyles';
import { insertDotsInPrice } from '../functions/utils';

const CardCart = ({imgSrc, description, price, quantity}) => {

    return (
        <View style={styles.container} >
            <View style={styles.line1Container}>
                <View style={[styles.column1, styles.productImageCont]}>
                    <Image style={[styles.productImage]} src={imgSrc}/>
                </View>
                <View style={[styles.descriptionCont, styles.column2]}>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
                <View style={[styles.trashIconCont, styles.column3]}>
                    <Image source={require("../../assets/images/icons/trash.png")} style={styles.trashIcon}/>
                </View>
            </View>
            <View style={styles.line2Container}>
                <View style={[styles.column1]}>
                    <Text>Precio Unitario</Text>
                </View>
                <View style={[styles.column2]}>
                    <Text>Cantidad</Text>
                </View>
                <View style={[styles.column3]}>
                    <Text>Subtotal</Text>
                </View>
            </View>
            <View style={styles.line3Container}>
                <View style={[styles.column1]}>
                    <Text style={styles.price}>$ {insertDotsInPrice(price)}</Text>
                </View>
                <View style={[styles.column2]}>
                    <Text style={styles.quantity}>{quantity}</Text>
                </View>
                <View style={[styles.column3]}>
                    <Text style={styles.subtotal}>$ {insertDotsInPrice(price * quantity)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderColorGray,
        borderTopWidth: 0.5,
        borderTopColor: colors.borderColorGray,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    line1Container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "65%",
        width: "100%",
    },
    line2Container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "15%",
        width: "100%",
    },
    line3Container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "20%",
        width: "100%",
    },
    column1: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 5,
        marginRight: 10,
    },
    column2: {
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 5
    },
    column3: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 5
    },
    productImageCont: {
    },
    productImage: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
    descriptionCont: {
        height: "100%",
    },
    descriptionText: {
        textAlign: "left",
    },
    trashIconCont: {
        width: "20%",
        height: "100%",
    },
    trashIcon: {
        width: "50%",
        height: "50%",
        objectFit: "contain",
        tintColor: colors.color3,
        opacity: 0.85,
    },
    price: {
        fontSize: 17.5,
        fontWeight: "600",
    },
    quantity: {
        fontSize: 17.5,
        fontWeight: "600",
    },
    subtotal: {
        fontSize: 17.5,
        fontWeight: "900",
        color: colors.color3
    }
})

const Cart = ({navigation, route}) => {

    const cart = useSelector(state => state.cart);
    const itemsInCartDataArr = cart.map((productInCart) => ({...productInCart, ...productList.find((productInList) => productInList.id === productInCart.id)}));

    return (
        <View style={cartStyle.container} >
            <Pressable onPress={() => navigation.goBack()} style={closeIconStyle.closeIconContainer}>
                <Image style={closeIconStyle.closeIcon} source={require("../../assets/images/icons/close.png")} />
            </Pressable>
            <FlatList
                contentContainerStyle={cartStyle.flatList}
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
        </View>
    )
}

export default Cart;

const cartStyle = StyleSheet.create({
    container: {
        height: SCREEN_AVAILABLE_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 10,
        borderColor: colors.borderColorGray,
        backgroundColor: colors.lightColor,
        paddingTop: 50
    },
    flatList: {
   
    }
})