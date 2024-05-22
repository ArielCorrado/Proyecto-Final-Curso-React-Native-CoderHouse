import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'
import { useDispatch } from 'react-redux'
import { useSignUpMutation } from '../services/firebaseAuth'
import { setUser } from '../features/userSlice'
import { validateEmail, validatePassword } from '../validations/signForm'
import { modal } from '../features/modal'
import { setTitle } from '../features/titleSlice'
import { useFocusEffect } from '@react-navigation/native'

const SignUp = ({navigation}) => {

    const dispatch = useDispatch();
    const [triggerSignUp, result] = useSignUpMutation();

    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    });

    useFocusEffect (
        useCallback(() => {
           dispatch(setTitle("Crea tu Cuenta"))
        })
    )
    
    const signUp = () => {
        if (!validateEmail(signUpData.email)) {
            dispatch(modal({show: true, text: "E-mail no válido", icon: "Warning"}));
            return;
        } else if (!validatePassword(signUpData.password)) {
            dispatch(modal({show: true, text: "Password no válido: Debe tener al menos 8 caracteres y combinar letras mayúsculas con minúsculas, números y caracteres especiales (Ejemplo: Ariel@1202)", icon: "Warning"}));
            return;
        } else if (signUpData.password !== signUpData.repeatPassword) {
            dispatch(modal({show: true, text: "Los passwords ingresados no coinciden", icon: "Warning"}));
            return;
        }
        try {
            triggerSignUp({email: signUpData.email, password: signUpData.password, returnSecureToken: true});
            setSignUpData({email: "", password: "", repeatPassword: ""});
            dispatch(modal({show: true, text: "Cuenta creada con éxito", icon: "Success"}));
        } catch (error) {
            dispatch(modal({show: true, text: "Error al crear cuenta, intenta nuevamente", icon: "Error"}));
        }   
    }
    
    useEffect(() => {
        if (result.isSuccess) {
            dispatch(setUser({
                email: result.data.email,
                idToken: result.data.idToken,
                refreshToken: result.data.refreshToken,
                expiresIn: result.data.expiresIn,
                localId: result.data.localId,
                registered: true,
            }));
            navigation.navigate("ProductsList");
        } else if (result.isError) {
            const errorMessage = result.error.data.error.message;
            dispatch(modal({show: true, text: `Error al crear cuenta: ${errorMessage}`, icon: "Error"}));
            navigation.navigate("ProductsList");
        }
    }, [result])
    

    return (
        <View style={generalStyles.screensContainer}>
            <View style={styles.formContainer}>
                <TextInput 
                    textContentType='emailAddress'
                    onChangeText={(text) => setSignUpData((current) => ({...current, email: text}))}
                    placeholder='E-Mail'
                    style={styles.input}
                    value={signUpData.email}
                />
                <TextInput 
                    onChangeText={(text) => setSignUpData((current) => ({...current, password: text}))}
                    placeholder='Contraseña' 
                    secureTextEntry={true} 
                    style={styles.input}
                    value={signUpData.password}
                />
                <TextInput 
                    onChangeText={(text) => setSignUpData((current) => ({...current, repeatPassword: text}))}
                    placeholder='Repetir Contraseña' 
                    secureTextEntry={true} 
                    style={styles.input}
                    value={signUpData.repeatPassword}
                />
                <ButtonCard color={colors.color3} text="Crear Cuenta" buttonStyle={styles.button} onPressFunction={signUp}/>
                <ButtonCard color={colors.color2} text="Iniciar Sesión" buttonStyle={[styles.button, {marginTop: 0}]} onPressFunction={() => navigation.navigate("SignIn")}/>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    input: {
        height: 60,
        width: '90%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderColor: colors.borderColorGray,
        fontSize: 15,
    },
    button: {
        margin: 10,
    },
    formContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
})