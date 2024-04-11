import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const CardHardware = ({price, description, imgSrc}) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} src={imgSrc} ></Image>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        height: 400,
        marginBottom: 50,
        borderWidth: 1,
        borderColor: "#ccc",
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
})

export default CardHardware;
