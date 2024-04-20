import React from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const CardHardware = ({price, description, imgSrc, showProductDetail}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={showProductDetail}>
            <Image style={styles.image} src={imgSrc} ></Image>
            <Text style={styles.text}>{description}</Text>
            <Text style={[styles.text, styles.price]}>$ {price}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        height: 500,
        marginBottom: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },
    image: {
        width: "100%",
        height: "80%",
        objectFit: "contain",
        
    },
    text: {
        height: "10%",
        textAlign: "center",
        padding: 10
    },
    price: {
        fontWeight: "bold",
        fontSize: 17.5
    }
})

export default CardHardware;
