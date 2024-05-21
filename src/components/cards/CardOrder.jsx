import { StyleSheet, View, Image, Text } from 'react-native';
import { colors } from '../../constants/coolors';
import { insertDotsInPrice } from '../../functions/utils';

export const CardOder = ({imgSrc, description, price, quantity, id}) => {

    return (
        <View style={styles.container} >
            <View style={styles.line1Container}>
                <View style={[styles.ImageCont]}>
                    <Image style={[styles.productImage]} src={imgSrc}/>
                </View>
                <View style={[styles.descriptionCont]}>
                    <Text style={styles.descriptionText}>{description}</Text>
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",                
        width: '100%',
        height: 160,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderColorGray,
        borderTopWidth: 0.5,
        borderTopColor: colors.borderColorGray,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.lightColor,
    },
    line1Container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
        width: "100%",
        marginBottom: 5,
    },
    line2Container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    line3Container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    column1: {
        width: "35%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    column2: {
        width: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    column3: {
        width: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // padding: 5
    },
    ImageCont: {
        height: "100%",
        width: "40%",
    },
    productImage: {
        width: "90%",
        height: "100%",
        objectFit: "contain",
    },
    descriptionCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "60%",
        height: "100%",
        padding: 10,
        paddingLeft: 0,
    },
    descriptionText: {
        textAlign: "left",
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
})