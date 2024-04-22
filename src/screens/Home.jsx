import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import ProductsList from '../components/ProductsList';

const Home = () => {

    const [productsList, setProductsList] = useState(<ProductsList searchText=""/>);

    const handleChangeText = (text) => {
        setProductsList(<ProductsList searchText={text}/>);
    }
    
    return (
        <View style={styles.container}>
            <TextInput onChangeText={handleChangeText} style={styles.searchBar} placeholder='...Search'/>
            {productsList}
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        position: "relative",
        display: 'flex',
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
        padding: 10,
    },
    searchBar: {    
        height: 60,
        width: "100%",
        backgroundColor: "#cccccc",
        padding: 10,
        marginBottom: 30,
        width: "100%"
    }
})

export default Home;
