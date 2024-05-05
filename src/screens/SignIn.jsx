import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'

const SignIn = () => {
    return (
        <View style={generalStyles.screensContainer}>
            <TextInput placeholder='E-Mail'style={styles.input}/>
            <TextInput placeholder='Contraseña' secureTextEntry={true} style={styles.input}/>
            <ButtonCard color={colors.color3} text="Iniciar Sesión" buttonStyle={styles.button}/>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    input: {
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderColor: colors.borderColorGray,
        fontSize: 15,
    },
    button: {
        margin: 10,
    }
})