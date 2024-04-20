import React from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import { useState, useEffect } from 'react';
import CardHardware from '../components/cards/CardHardware';
import productsList from "../data/productosList.json"

const ProductsList = ({searchText}) => {

    const [result, setResult] = useState([]);

    useEffect(() => {
        const results = !searchText || searchText.length < 3 ? productsList.sort((producta, productb) => producta - productb) : productsList.filter(product => product.description.toLowerCase().includes(searchText.toLowerCase()))
        results.length > 0 ? setResult(results) : setResult([]);
    }, [searchText])
    
    return (
        <FlatList
            contentContainerStyle={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={result}
            renderItem={({ item }) => <CardHardware price={item.price} description={item.description} imgSrc={item.imgScr} />}
        />
    )
}


const Home = () => {

    const [productsList, setProductsList] = useState(<ProductsList searchText=""/>);

    const handleChangeText = (text) => {
        setProductsList(<ProductsList searchText={text}/>);
    }
    
    return (
        <View style={styles.container}>
            <TextInput onChangeText={handleChangeText} style={styles.textInput} />
            {productsList}
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
        padding: 20,
    },
    textInput: {    
        height: "10%",
        width: "100%",
        backgroundColor: "#cccccc",
        padding: 10,
    }
})

export default Home;
