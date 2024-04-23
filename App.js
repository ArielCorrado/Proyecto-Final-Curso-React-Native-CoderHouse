import { StyleSheet, View, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect} from 'react';
import Home from './src/screens/Home';
import { MAIN_PADDING } from './src/constants/dimensions';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

    const [fontsLoaded, fontError] = useFonts({
        "Poppins": require("./assets/fonts/Poppins-Regular.ttf"),
    })

    useEffect(() => {
        const onLayoutRootView = async () => {
            if (fontsLoaded || fontError) {
                await SplashScreen.hideAsync();
            }
        };
        onLayoutRootView();
    }, [fontsLoaded, fontError]);
    
    if (!fontsLoaded || fontError) {
        return null;
    }
    
    return (
        <View style={styles.container}>
            <StatusBar/>
            <Home/>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        backgroundColor: 'white',
        padding: MAIN_PADDING,
    },
});
