import { StyleSheet, Image, Text, View } from 'react-native';
import { colors } from '../../constants/coolors';
import { generalStyles } from '../../styles/generalStyles';
import ButtonCard from '../buttons/ButtonCard';
import { insertDotsInPrice } from '../../functions/utils';

const CardFavorites = ({price, description, imgSrc, id, navigation}) => {
     
    return (
        <View style={styles.container}>
            <Image style={styles.image} src={imgSrc} ></Image>
            <View style={styles.dataContainer}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(price)}</Text>
                <View style={styles.buttonsContainer}>
                    <ButtonCard text="Agregar al carrito" color={colors.color3} height={40} width={"55%"} textStyle={{fontSize: 15}} buttonStyle={{paddingHorizontal: 5, marginRight: 10}}/>
                    <ButtonCard text="Eliminar" color={colors.color2} height={40} width={"35%"} textStyle={{fontSize: 15}} buttonStyle={{paddingHorizontal: 5}}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        minHeight: 175,
        height: 175,
        borderBottomWidth: 0.75,
        borderBottomColor: colors.borderColorGray,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.lightColor,
    },
    image: {
        width: "30%",
        height: "100%",
        objectFit: "contain",
    },
    dataContainer: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "70%",
        paddingLeft: 10,
    },
    description: {
        textAlign: "left",
        marginBottom: 5,
        fontFamily: generalStyles.primaryFont,
        width: "100%",
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        width: "100%",
    },
    heartCont: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 10,
        right: 10,
        zIndex: 100,
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    }
})

export default CardFavorites;
