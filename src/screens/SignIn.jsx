import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native'
import React from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../features/userSlice'
import { useSignInMutation } from '../services/firebaseAuth'
import { useEffect, useState, useCallback } from 'react'
import { modal } from '../features/modal'
import { getFirebaseDBUserData } from '../services/firebaseDBFetch'
import { updateCart } from '../features/cartSlice'
import { spinner } from '../features/spinner'
import { SQLite } from '../persistence'
import { setTitle } from '../features/titleSlice'
import { useFocusEffect } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';

const SignIn = ({navigation}) => {
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();
    const {registered, localId} = useSelector(state => state.user.value);
    
    useEffect(() => {
        (async () => {
            if (registered) {
                dispatch(spinner({show: true}))
                const response = await getFirebaseDBUserData(localId, "cart");                               //Cuando el usuario se registra obtenemos el carrito de la base de datos
                dispatch(spinner({show: false}))
                if (response.success) {
                    const cartFromDB = response.data;
                    if (cartFromDB && cartFromDB.length) {
                        dispatch(updateCart(cartFromDB));
                        navigation.navigate('ProductsList');
                    }
                } else {
                    dispatch(modal({show: true, text: "Error al obtener el carrito de la base de datos", icon: "Error"}));
                }
            }
        })();
    }, [registered])

    useFocusEffect (                                                                                        //Setemos título de screen en el header
        useCallback(() => {
           dispatch(setTitle("Inicio de Sesión"))
        })
    )

    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    const signIn = () => {
        if (signInData.email.trim() === "" || signInData.password.trim() === "") {
            dispatch(modal({show: true, text: "Los campos no pueden estar vacíos, intenta nuevamente", icon: "Warning"}));
            return;
        }
        try {
            triggerSignIn({email: signInData.email, password: signInData.password, returnSecureToken: true});
        } catch (error) {
            dispatch(modal({show: true, text: "Error de incio de sesión, intenta nuevamente", icon: "Error"}));
        }
    }   
    
    useEffect(() => {
        (async () => {
            if (result.isSuccess) {
                const sessionDataFromDB = {
                    email: result.data.email,
                    idToken: result.data.idToken,
                    refreshToken: result.data.refreshToken,
                    expiresIn: result.data.expiresIn,
                    localId: result.data.localId,
                    registered: result.data.registered,
                }
                dispatch(setUser(sessionDataFromDB));

                try {
                    await SQLite.clearTable();
                    await SQLite.insertData(sessionDataFromDB);
                } catch (err) {
                    dispatch(modal({show: true, text: "Error al escribir base de datos local. Los datos de sesión no serán persistidos", icon: "Error"}));
                }

                setSignInData({email: '', password: ''});
                dispatch(modal({show: true, text: "Inicio de sesión exitoso", icon: "Success"}));
                navigation.navigate('ProductsList');
            } else if (result.isError) {
                const errorMessage = result.error.data.error.message;
                if (errorMessage === "INVALID_LOGIN_CREDENTIALS") {
                    dispatch(modal({show: true, text: "Credenciales incorrectas, intenta nuevamente", icon: "Warning"}));
                } else {
                    dispatch(modal({show: true, text: `Error de inicio de sesión: ${errorMessage}`, icon: "Error"}));
                }
            } 
        })();
        result.isLoading ?dispatch(spinner({show: true})) : dispatch(spinner({show: false}))
    }, [result])
    
    return (
        <View style={[generalStyles.screensContainer, styles.mainContainer]}>
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
                <ButtonCard color={colors.color2} text="Crear Cuenta" buttonStyle={{...styles.button, ...{marginTop: 0}}} onPressFunction={() => navigation.navigate("SignUp")}/>
                <Pressable style={styles.menuButtonContainer} onPress={() => navigation.navigate("ProductsList")}>
                    <AntDesign name="home" size={24} color="black" />
                    <Text style={styles.menuButtonText}>Inicio</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 0,
        paddingHorizontal: 0,
    },
    input: {
        height: 60,
        width: '80%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderColor: colors.borderColorGray,
        fontSize: 15,
    },
    button: {
        margin: 10,
        width: '60%',
    },
    formContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    menuButtonContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        margin: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 15,
        borderColor: colors.borderColorGray,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    menuButtonText: {
        fontSize: 15,
        color: colors.textColor,
        marginLeft: 10,
        fontWeight: "500",
    }
})