import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../services/firebaseDB'
import { useEffect } from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'
import { modal } from '../features/modal'
import { useDispatch } from 'react-redux'
import { spinner } from '../features/spinner'

const EditProfile = ({navigation, route}) => {

    const dispatch = useDispatch();
    const {userId} = route.params;
    const {data: userProfileFromDB, error, isLoading} = useGetUserDataQuery({userId, field: "profile"});
    const [triggerUpdateUserData, result] = useUpdateUserDataMutation();
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        avatarImage: "",
        deliveryAddress: "",
        phone: "",
    })

    useEffect(() => {
        if (userProfileFromDB) setUserProfile(userProfileFromDB)
    }, [userProfileFromDB])

    const saveChanges = () => {
        triggerUpdateUserData({userId: userId, field: "profile", data: userProfile});
    }

    useEffect(() => {
        if (result) {
            if(result.isSuccess) {
                dispatch(spinner({show: false, size: 75}));
                dispatch(modal({show: true, text: "Datos de perfil actualizados con éxito", icon: "Success"}));
            } else if (result.isLoading) {
                dispatch(spinner({show: true, size: 75}));
            } else if (result.isError) {
                dispatch(spinner({show: false, size: 75}));
                const errorMessage = result.error.data.error.message;
                dispatch(modal({show: true, text: `Error al actualizar datos de perfil: ${errorMessage}`, icon: "Error"}));
            }
        } 
     
    }, [result])
    
     
    if (isLoading) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Cargando...</Text>
            </View>
        )
    } else if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener datos de Perfil</Text>
            </View>
        )
    } else {
        return (
            <View style={generalStyles.screensContainer} >
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    value={userProfile.firstName}
                    onChangeText={ (text) => setUserProfile((current) => ({...current, firstName: text})) }
                    style={styles.input}
                    placeholder='Nombre'
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.label}>Apellido</Text>
                 <TextInput
                    value={userProfile.lastName}
                    onChangeText={ (text) => setUserProfile((current) => ({...current, lastName: text})) }
                    style={styles.input}
                    placeholder='Apellido'
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.label}>Dirección de envío</Text>
                <TextInput
                    value={userProfile.deliveryAddress}
                    onChangeText={ (text) => setUserProfile((current) => ({...current, deliveryAddress: text})) }
                    style={styles.input}
                    placeholder='Dirección de envío'
                    placeholderTextColor="#aaa"
                />
                <Text style={styles.label}>Teléfono</Text>
                 <TextInput
                    value={userProfile.phone}
                    onChangeText={ (text) => setUserProfile((current) => ({...current, phone: text})) }
                    style={styles.input}
                    placeholder='Teléfono'
                    placeholderTextColor="#aaa"
                />
                <ButtonCard color={colors.color2} text="Guardar Cambios" onPressFunction={saveChanges}/>
            </View>
        )
    }
}

export default EditProfile

const styles = StyleSheet.create({
    input: {
        borderColor: colors.borderColorGray,
        borderWidth: 1,
        width: "80%",
        marginBottom: 30,
        height: 50,
        padding: 10,
        fontSize: 15,
    },
    label: {
        width: "80%",
        textAlign: "left",
        color: colors.color2
    }
})