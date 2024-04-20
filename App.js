import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Home/>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        minHeight: "100%",
        width: "100%"
    },
});
