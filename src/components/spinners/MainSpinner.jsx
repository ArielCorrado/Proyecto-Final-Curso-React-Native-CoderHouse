import { View, ActivityIndicator, StyleSheet, Modal} from 'react-native'
import React from 'react'
import { generalStyles } from '../../styles/generalStyles'
import { useSelector } from 'react-redux'

const MainSpinner = () => {

    const spinnerState = useSelector((state) => state.spinner.value);

    return (
        <Modal transparent={true} visible={spinnerState.show}>
            <View style={[generalStyles.screensContainer, styles.container]}>
                <ActivityIndicator size={spinnerState.size} style={styles.spinner}/>   
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

