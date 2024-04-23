import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import Home from './src/screens/Home';
import { MAIN_PADDING, STATUS_BAR_HEIGHT } from './src/constants/dimensions';


export default function App() {

    const [fontsLoaded, fontError] = useFonts({
        "Poppins": require("./assets/fonts/Poppins-Regular.ttf"),
    })
        
    if (!fontsLoaded || fontError) {
        return null;
    }
    
    if (fontsLoaded && !fontError) {
        return (
            <SafeAreaView style={styles.container}>
                <Home/>    
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        backgroundColor: 'white',
        padding: MAIN_PADDING,
        marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
    },
});
