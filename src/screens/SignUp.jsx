import { StyleSheet, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'
import { useDispatch } from 'react-redux'
import { useSignUpMutation } from '../services/firebaseAuth'
import { useEffect } from 'react'
import { setUser } from '../features/userSlice'

const SignUp = () => {

    const dispatch = useDispatch();
    const [triggerSignUp, result] = useSignUpMutation();

    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    });

    const signUp = () => {
        try {
            triggerSignUp({email: signUpData.email, password: signUpData.password, returnSecureToken: true});
        } catch (error) {
            console.log(error);
        }   
    }
    
    useEffect(() => {
        if (result.isSuccess) {
            dispatch(setUser({
                email: result.data.email,
                idToken: result.data.idToken,
                refreshToken: result.data.refreshToken,
                expiresIn: result.data.expiresIn,
                registered: result.data.registered
            }));
        } else if (result.isError) {
            console.log(result.error);
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
                />
                <TextInput 
                    onChangeText={(text) => setSignUpData((current) => ({...current, password: text}))}
                    placeholder='Contraseña' 
                    secureTextEntry={true} 
                    style={styles.input}
                />
                <TextInput 
                    onChangeText={(text) => setSignUpData((current) => ({...current, repeatPassword: text}))}
                    placeholder='Repetir Contraseña' 
                    secureTextEntry={true} 
                    style={styles.input}
                />
                <ButtonCard color={colors.color3} text="Iniciar Sesión" buttonStyle={styles.button} onPressFunction={signUp}/>
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