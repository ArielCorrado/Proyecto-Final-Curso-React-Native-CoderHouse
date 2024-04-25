import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image} from 'react-native';
import { colors } from '../constants/coolors';

const Header = ({navigation}) => {

    const [searchText, setSearchText] = useState("");
       
    useEffect(() => {
        if (searchText) navigation.navigate("ProductsList", {searchText: searchText});
    }, [searchText]);
 
    return (
        <View style={styles.headerCont}>
            <TouchableOpacity style={styles.headerIconsCont} >
                <Image source={require('../../assets/images/icons/menu.png')} style={styles.headerIcons}/>
            </TouchableOpacity>
            <TextInput onChangeText={setSearchText} placeholder='...Search' value={searchText} style={styles.searchBar} />
            <TouchableOpacity style={styles.headerIconsCont} >
                <Image source={require('../../assets/images/icons/cart.png')} style={styles.headerIcons}/>
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
        width: "100%",
        backgroundColor: colors.color2,
    },  
    searchBar: {    
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        padding: 10,
        height: "80%",
        width: "70%",
    },
    headerIconsCont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",        
        width: "15%",
    },
    headerIcons: {
        width: "80%",
        height: "50%",
        objectFit: "contain",
        tintColor: "white"
    }   
})