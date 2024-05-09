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

    const [image, setImage] = useState("");
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
        setImage("");
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
    
    const verifyGalleryPermissions = async () => {
        const {granted} = await ImagePicker.getMediaLibraryPermissionsAsync();
        return granted;
    }

    const pickImageFromCamera = async () => {
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
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                    setImage(image);
                }
            } else {
                dispatch(modal({show: true, text: "La aplicación no tiene permiso para acceder a la cámara del dispositivo", icon: "Info"}));
            }
            
        } catch (error) {
            dispatch(modal({show: true, text: "Error al obtener imagen de la cámara", icon: "Error"}));
        }
    };
    
    const pickImageFromGallery = async () => {
        try {
            const permissionGallery = await verifyGalleryPermissions();
            
            if (permissionGallery) {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2    
                })
                if (!result.canceled){
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                    setImage(image);
                }
            } else {
                dispatch(modal({show: true, text: "La aplicación no tiene permiso para acceder a los archivos del dispositivo", icon: "Info"}));
            }
            
        } catch (error) {
            dispatch(modal({show: true, text: "Error al acceder a los archivos del dispositivo", icon: "Error"}));
        }
    };

    const confirmImage = () => {
        setUserProfile((current) => ({...current, avatarImage: image}));
        setImage("");
    }

    const cancelImImage = () => {
        setImage("");
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
                <Text style={styles.title}>Edición de Perfil</Text>

                {(userProfile.avatarImage || image) &&  <Image source={{ uri: image ? image : userProfile.avatarImage }} style={styles.profileImage} />}
                {
                    image &&
                    <View style={styles.imageButtonsCont}>
                        <ButtonCard color={colors.color3} text="Confirmar Foto" onPressFunction={confirmImage} buttonStyle={{marginHorizontal: 5, paddingHorizontal: 10}} height={40} width={135} textStyle={{fontSize: 13.5, fontWeight: 400}}/>
                        <ButtonCard color={colors.color3} text="Cancelar Foto" onPressFunction={cancelImImage} buttonStyle={{marginHorizontal: 5, paddingHorizontal: 10}} height={40} width={135} textStyle={{fontSize: 13.5, fontWeight: 400}}/>
                    </View>
                }   
                                
                <Text style={styles.label}>Imagen de perfil</Text>
                <Pressable style={[styles.input, styles.addImageButton]} onPress={pickImageFromGallery}>
                    <Text style={styles.textAddImageButton}>Subir Imagen</Text>
                    <Feather name="upload" size={24} color="white" />
                </Pressable>
                <Pressable style={[styles.input, styles.addImageButton, {marginBottom: 30}]} onPress={pickImageFromCamera}>
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
                <ButtonCard color={colors.color3} text="Guardar Cambios" onPressFunction={saveChanges}/>
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
        marginBottom: 10,
    },
    imageButtonsCont: {
        display: "flex",
        flexDirection: "row",
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: colors.darkColor,
    }
})