import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image} from 'react-native';

const Header = ({route, navigation}) => {

    const [searchText, setSearchText] = useState("");

    const handleChangeText = (text) => {
        setSearchText(text);
    }
    
    useEffect(() => {
        navigation.navigate("ProductsList", {searchText: searchText});
    }, [searchText]);
 
    return (
        <View style={styles.headerCont}>
            <TextInput onChangeText={handleChangeText} placeholder='...Search' value={searchText} style={styles.searchBar} />
            <TouchableOpacity style={styles.searchIconCont} onPress={() => navigation.navigate("ProductsList", {searchText: searchText})}>
                <Image source={require('../../assets/images/icons/search.png')} style={styles.searchIcon}/>
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerCont: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        width: "100%"
    },  
    searchBar: {    
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#cccccc",
        padding: 10,
        marginBottom: 20,
        height: "100%",
        width: "90%",
    },
    searchIconCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",        
        width: "10%",
    },
    searchIcon: {
        width: "90%",
        height: "90%",
        objectFit: "contain",
    }   
})