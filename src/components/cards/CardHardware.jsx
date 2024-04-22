import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';

const CardHardware = ({price, description, imgSrc, showProductDetail}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={showProductDetail}>
            <Image style={styles.image} src={imgSrc} ></Image>
            <View style={styles.dataContainer}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>$ {price}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 350,
        marginBottom: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    dataContainer: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
    },
    image: {
        width: "100%",
        height: "70%",
        objectFit: "contain",
        
    },
    description: {
        textAlign: "center",
        marginBottom: 5
    },
    price: {
        fontWeight: "bold",
        fontSize: 20
    }
})

export default CardHardware;
