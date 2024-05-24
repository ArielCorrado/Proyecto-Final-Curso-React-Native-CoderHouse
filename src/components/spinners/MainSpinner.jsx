import { View, ActivityIndicator, StyleSheet, Modal} from 'react-native'
import React, { useRef, useState } from 'react'
import { generalStyles } from '../../styles/generalStyles'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { modal } from '../../features/modal'
import { useDispatch } from 'react-redux'

const MainSpinner = () => {

    const dispatch = useDispatch();
    const spinnerState = useSelector((state) => state.spinner.value);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {

        let timer;

        if (spinnerState.show) {
            timer = setTimeout(() => {                                                                                      //El spinner se cierra a los 5 segundos de carga y se muestra un mensaje
                setShowSpinner(false);
                dispatch(modal({ show: true, text: "Tiempo de espera agotado", icon: "Warning" }));
            }, 5000);
        }  

        return () => {
            clearTimeout(timer);
        }

    }, [spinnerState])

    useEffect(() => {
        setShowSpinner(spinnerState.show);
    }, [spinnerState])
                
    return (
        <Modal transparent={true} visible={showSpinner}>
            <View style={[generalStyles.screensContainer, styles.container]}>
                <ActivityIndicator size={75} style={styles.spinner}/>   
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
       position: "relative"
    },
    spinner: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        margin: "auto",
        backgroundColor: "#ffffff",
    }
})

export default MainSpinner

