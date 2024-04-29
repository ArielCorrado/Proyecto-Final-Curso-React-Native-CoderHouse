import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { colors } from '../../constants/coolors';
import { generalStyles } from '../../styles/generalStyles';
import ButtonCard from '../buttons/ButtonCard';
import { insertDotsInPrice } from '../../functions/utils';

const CardHardware = ({price, description, imgSrc, id, navigation}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} src={imgSrc} ></Image>
            <View style={styles.dataContainer}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(price)}</Text>
                <ButtonCard text="Ver detalles" color={colors.color2} height={55} width={"50%"} onPressFunction={() => navigation.navigate("ProductDetail", {productId: id})}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 450,
        marginTop: 30,
        borderWidth: 1,
        borderColor: colors.borderColorGray,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.lightColor,
    },
    dataContainer: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
    },
    image: {
        width: "100%",
        height: "60%",
        objectFit: "contain",
        
    },
    description: {
        textAlign: "center",
        marginBottom: 5,
        fontFamily: generalStyles.primaryFont,
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    }
})

export default CardHardware;
