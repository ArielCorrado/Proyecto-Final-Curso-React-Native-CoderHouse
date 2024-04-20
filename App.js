import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
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
        marginTop: StatusBar.currentHeight || 30,
        minHeight: "100%",
        width: "100%",
        backgroundColor: 'white',
    },
});
