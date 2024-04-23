import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { STATUS_BAR_HEIGHT } from './src/constants/dimensions';
import Navigation  from './src/navigation/Navigation';

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
                <Navigation/>    
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#ccc',
        marginTop: Platform.OS === 'android' ? STATUS_BAR_HEIGHT : 0,
    },
});
