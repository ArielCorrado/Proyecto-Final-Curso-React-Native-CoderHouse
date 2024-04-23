import { StyleSheet, View, StatusBar } from 'react-native';
import Home from './src/screens/Home';
import { MAIN_PADDING } from './src/constants/dimensions';

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
        width: "100%",
        backgroundColor: 'white',
        padding: MAIN_PADDING,
    },
});
