import { StyleSheet, View, Image, Text, Pressable} from 'react-native';
import { colors } from '../../constants/coolors';
import { insertDotsInPrice } from '../../functions/utils';
import { useDispatch } from 'react-redux';
import { addToCart, subtractToCart, deleteItem } from '../../features/cartSlice';

export const CardCart = ({imgSrc, description, price, quantity, id}) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.container} >
            <View style={styles.line1Container}>
                <View style={[styles.column1]}>
                    <Image style={[styles.productImage]} src={imgSrc}/>
                </View>
                <View style={[styles.descriptionCont, styles.column2]}>
                    <Text style={styles.descriptionText}>{description}</Text>
                </View>
                <View style={[styles.trashIconCont, styles.column3]}>
                    <Pressable  onPress={() => dispatch(deleteItem({id: id}))}>
                        <Image source={require("../../../assets/images/icons/trash.png")} style={styles.trashIcon}/>
                    </Pressable>
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
                <View style={[styles.column2, styles.quantityCont]}>
                    <Pressable style={styles.quantityButton} onPress={() => dispatch(subtractToCart({id: id}))}>
                        <Text style={[styles.quantityButtonText]}>-</Text>
                    </Pressable>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <Pressable style={[styles.quantityButton]} onPress={() => dispatch(addToCart({id: id}))}>
                        <Text style={[styles.quantityButtonText]}>+</Text>
                    </Pressable>
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
        alignItems: "center",
        padding: 5,
        marginRight: 10,
    },
    column2: {
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    column3: {
        width: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
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
        textAlign: "center",
    },
    trashIconCont: {
        width: "20%",
        height: "100%",
    },
    trashIcon: {
        width: 50,
        height: 50,
        objectFit: "contain",
        tintColor: colors.color3,
        opacity: 0.85,
    },
    price: {
        fontSize: 17.5,
        fontWeight: "600",
    },
    subtotal: {
        fontSize: 17.5,
        fontWeight: "900",
        color: colors.color3
    },
    quantity: {
        fontSize: 17.5,
        fontWeight: "600",
        marginHorizontal: 10,
    },
    quantityCont: {
        flexDirection: "row",
    },
    quantityButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.color3,
        borderRadius: 5,
        width: 40,
        height: 30,
    },
    quantityButtonText: {
        color: colors.lightColor,
        fontSize: 17.5,
        fontWeight: "600",
    }
})