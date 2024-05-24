import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../constants/coolors'

const ButtonCard = ({text, color, height = 60, width = "70%", onPressFunction, buttonStyle={}, textStyle={}}) => {              //Componente botón customizado

    const styles = StyleSheet.create({
        button: {
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
            paddingVertical: 5,
            paddingHorizontal: 20,
            width: width,
            height: height,
        },
        text: {
            color: colors.lightColor,
            fontSize: 20,
            fontWeight: '700',
        }
    })

    return (
        <Pressable style={{...styles.button, ...buttonStyle}} onPress={onPressFunction}>
            <Text style={{...styles.text, ...textStyle}}>{text}</Text>
        </Pressable>
    )
}

export default ButtonCard
