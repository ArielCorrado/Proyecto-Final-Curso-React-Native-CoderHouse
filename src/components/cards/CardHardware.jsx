import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import { colors } from '../../constants/coolors';
import { generalStyles } from '../../styles/generalStyles';
import ButtonCard from '../buttons/ButtonCard';
import { insertDotsInPrice } from '../../functions/utils';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleFavorites } from '../../features/favoritesSlice';

const CardHardware = ({price, description, imgSrc, id, navigation}) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [isFavoriteError, setIsFavoriteError] = useState(false);
    const favorites = useSelector((state) => state.favorites.value);
    const dispatch = useDispatch(); 

    const handleFavorite = async() => {
        dispatch(handleFavorites(id));
        setIsFavorite(!isFavorite);
        // try {
        //     const favoritesStr = await AsyncStorage.getItem("favorites");
        //     if (favoritesStr) {
        //         const favoritesParsed = JSON.parse(favoritesStr);
        //         const favoritesIndex = favoritesParsed.indexOf(id);
        //         if (favoritesIndex !== -1) {
        //             favoritesParsed.splice(favoritesIndex, 1);
        //             await AsyncStorage.setItem("favorites", JSON.stringify(favoritesParsed));
        //             setIsFavorite(false);
        //         } else {
        //             favoritesParsed.push(id);
        //             await AsyncStorage.setItem("favorites", JSON.stringify(favoritesParsed));
        //             setIsFavorite(true);
        //         }
        //     } else {
        //         const favorites = [id];
        //         await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        //         setIsFavorite(true);
        //     }
        // } catch (err) {
        //     setIsFavoriteError(true);
        // }
    }

    useEffect(() => {
        // (async() => {
        //     const favoritesStr = await AsyncStorage.getItem("favorites");
        //     if (favoritesStr) {
        //         const favoritesParsed = JSON.parse(favoritesStr);
        //         if (favoritesParsed && favoritesParsed.length) {
        //             const favoritesIndex = favoritesParsed.indexOf(id);
        //             favoritesIndex !== -1 ? setIsFavorite(true) : setIsFavorite(false);
        //         }
        //     }
        // })();
        const favoritesIndex = favorites.indexOf(id);
        favoritesIndex !== -1 ? setIsFavorite(true) : setIsFavorite(false);
    }, []);

    return (
        <View style={styles.container}>
            {
                !isFavoriteError &&
                <Pressable style={styles.heartCont} onPress={handleFavorite}>
                    { isFavorite ? <AntDesign name="heart" size={24} color="#5F2CAF" style={styles.heart}/> : <AntDesign name="hearto" size={24} color="gray" style={styles.heart}/> }
                </Pressable>
            }
            <Image style={styles.image} src={imgSrc} ></Image>
            <View style={styles.dataContainer}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(price)}</Text>
                <ButtonCard text="Ver detalles" color={colors.color2} height={55} width={"50%"} onPressFunction={() => navigation.navigate("ProductDetail", {productId: id})}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 400,
        marginTop: 30,
        borderWidth: 1,
        borderColor: colors.borderColorGray,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.lightColor,
    },
    dataContainer: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
    },
    image: {
        width: "100%",
        height: "50%",
        objectFit: "contain",
        
    },
    description: {
        textAlign: "center",
        marginBottom: 5,
        fontFamily: generalStyles.primaryFont,
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
    },
    heartCont: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 10,
        right: 10,
        zIndex: 100,
    },
})

export default CardHardware;
