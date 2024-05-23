import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { modal } from '../../features/modal';
import { colors } from '../../constants/coolors';
import { useNavigation } from '@react-navigation/native';

const MainModal = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.modal.value);

    const confirmModal = () => {
        if (modalState.redirect) navigation.navigate(modalState.redirect, modalState.params);
        dispatch(modal({show: false, text: "", icon: "", showCancelButton: false}));
    }

    const cancelModal = () => {
        dispatch(modal({show: false, text: "", icon: "", showCancelButton: false}));
    }   

    const selectIconImage = () => {
        switch (modalState.icon) {
            case "Success":
                return require(`../../../assets/images/icons/Success.png`);
            case "Error":
                return require(`../../../assets/images/icons/Error.png`);
            case "Info":
                return require(`../../../assets/images/icons/Info.png`);
            default:
                return require(`../../../assets/images/icons/Warning.png`);
        }
    }
        
    return (
        <View style={styles.centeredView}>
            <Modal animationType="fade" transparent={true} visible={modalState.show}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={selectIconImage()} style={[styles.icon, {tintColor: colors["icon" + modalState.icon]}]}/>
                        <Text style={styles.modalText}>{modalState.text}</Text>
                        <View style={{...styles.buttonsCont, ...{justifyContent: modalState.showCancelButton ? "space-between" : "center"}}}>
                            <Pressable
                                style={[styles.buttonConfirm]}
                                onPress={confirmModal}>
                                <Text style={styles.textStyle}>{modalState.showCancelButton ? "Confirmar" : "OK"}</Text>
                            </Pressable>
                            {   modalState.showCancelButton &&
                                <Pressable
                                    style={[styles.buttonConfirm, styles.buttonCancel]}
                                    onPress={cancelModal}>
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </Pressable>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        position: "absolute",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 25,
        alignItems: 'center',
        width: "75%",
    },
    buttonsCont: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        width: "100%",
    },
    buttonConfirm: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        borderRadius: 25,
        height: 50,
        width: 120,
        backgroundColor: colors.color2,
    },
    buttonCancel: {
        backgroundColor: colors.color3,
    },  
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 17.5,
    },
    modalText: {
        fontSize: 17.5,
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 22.5,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 35,
    }
});

export default MainModal;