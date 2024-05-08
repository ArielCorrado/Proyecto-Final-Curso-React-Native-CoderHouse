import { StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native'
import React, { useState } from 'react'
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../services/firebaseDB'
import { useEffect } from 'react'
import { generalStyles } from '../styles/generalStyles'
import { colors } from '../constants/coolors'
import ButtonCard from '../components/buttons/ButtonCard'
import { modal } from '../features/modal'
import { useDispatch } from 'react-redux'
import { spinner } from '../features/spinner'
import Feather from '@expo/vector-icons/Feather';
import * as ImagePicker from "expo-image-picker";

const EditProfile = ({navigation, route}) => {

    const [image, setImage] = useState(null);
    const [imageConfirmed, setImageConfirmed] = useState(false);
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

    const saveChanges = () => {
        triggerUpdateUserData({userId: userId, field: "profile", data: userProfile});
    }

    useEffect(() => {
        if (result) {
            if(result.isSuccess) {
                dispatch(modal({show: true, text: "Datos de perfil actualizados con éxito", icon: "Success"}));
            } else if (result.isError) {
                const errorMessage = result.error.data.error.message;
                dispatch(modal({show: true, text: `Error al actualizar datos de perfil: ${errorMessage}`, icon: "Error"}));
            }
            result.isLoading ? dispatch(spinner({show:true})) : dispatch(spinner({show:false}));
        } 

        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));

        if (userProfileFromDB) setUserProfile(userProfileFromDB)

    }, [result, isLoading, userProfileFromDB])
    


    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync();
        return granted;
    }

    const pickImage = async () => {
        try {
            const permissionCamera = await verifyCameraPermissions()
            
            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2    
                })
                if (!result.canceled){
                    setImageConfirmed(false);
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                    setImage(image);
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    const confirmImage = () => {
        triggerUpdateUserData({userId: userId, field: "avatar", data: {imageData: image}});
        setImageConfirmed(true);
    }
     
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener datos de Perfil</Text>
            </View>
        )
    } else {
        return (
            <View style={generalStyles.screensContainer} >

                <Image source={{ uri: image }} style={styles.profileImage} />
                {image && !imageConfirmed && <ButtonCard color={colors.color3} text="Confirmar" onPressFunction={confirmImage} buttonStyle={{marginBottom: 20, marginTop: 20}} height={40} width={120} textStyle={{fontSize: 15}}/>}
                <Text style={styles.label}>Imagen de perfil</Text>
                <Pressable style={[styles.input, styles.addImageButton]}>
                    <Text style={styles.textAddImageButton}>Subir</Text>
                    <Feather name="upload" size={24} color="white" />
                </Pressable>
                <Pressable style={[styles.input, styles.addImageButton, {marginBottom: 30}]} onPress={pickImage}>
                    <Text style={styles.textAddImageButton}>Sacar Foto</Text>
                    <Feather name="camera" size={24} color="white" />
                </Pressable>

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
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderColor: colors.borderColorGray,
        borderWidth: 1,
        width: "80%",
        marginBottom: 20,
        height: 50,
        padding: 10,
        fontSize: 15,
    },
    label: {
        width: "80%",
        textAlign: "left",
        color: colors.color2
    },
    addImageButton: {
        backgroundColor: colors.color2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    textAddImageButton: {
        color: colors.lightColor,
        marginRight: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    }
})