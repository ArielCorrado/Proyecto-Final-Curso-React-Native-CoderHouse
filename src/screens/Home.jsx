import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import CardHardware from '../components/cards/CardHardware';
import productsList from "../data/productosList.json"

const Home = () => {
    return (
        <View style={styles.container}>
            <FlatList 
                contentContainerStyle={styles.flatList}
                showsVerticalScrollIndicator={false}
                data={productsList.sort((producta, productb) => producta - productb)}
                renderItem={({item}) => <CardHardware price={item.price} description={item.description} imgSrc={item.imgScr}/>}
            />
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
})

export default Home;
