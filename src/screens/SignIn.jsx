import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { useSignInMutation } from '../services/firebaseAuth'
import { useEffect, useState } from 'react'

const SignIn = ({navigation}) => {

    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();

    const signIn = () => {
        try {
            triggerSignIn({email: signInData.email, password: signInData.password, returnSecureToken: true});
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
            setSignInData({email: '', password: ''});
            navigation.navigate('ProductsList');
            console.log("Registro exitoso:", result.data.email);
        } else if (result.isError) {
            console.log(result.error);
        }
    }, [result])
    
    return (
        <View style={generalStyles.screensContainer}>
            <View style={styles.formContainer}>
                <TextInput 
                    textContentType='emailAddress'
                    onChangeText={(text) => setSignInData((current) => ({...current, email: text}))}
                    value={signInData.email}
                    placeholder='E-Mail'
                    style={styles.input}
                />
                <TextInput 
                    onChangeText={(text) => setSignInData((current) => ({...current, password: text}))}
                    value={signInData.password}
                    placeholder='Contraseña' 
                    secureTextEntry={true} 
                    style={styles.input}
                />
                <ButtonCard color={colors.color3} text="Iniciar Sesión" buttonStyle={styles.button} onPressFunction={signIn}/>
            </View>
        </View>
    )
}

export default SignIn

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