import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../constants/coolors'

const ButtonCard = ({text, color}) => {

    const styles = StyleSheet.create({
        button: {
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 100,
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
        text: {
            color: colors.lightColor,
            fontSize: 20,
            fontWeight: '700',
        }
    })

    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonCard
