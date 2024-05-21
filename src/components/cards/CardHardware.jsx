import { StyleSheet, Image, Text, View, Pressable } from 'react-native';
import { colors } from '../../constants/coolors';
import { generalStyles } from '../../styles/generalStyles';
import ButtonCard from '../buttons/ButtonCard';
import { insertDotsInPrice } from '../../functions/utils';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorites } from '../../features/favoritesSlice';
import { useUpdateUserDataMutation } from '../../services/firebaseDB';

const CardHardware = ({price, description, imgSrc, id, navigation}) => {
   
    const [isFavoriteError, setIsFavoriteError] = useState(false);
    const favorites = useSelector((state) => state.favorites.value);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch(); 
    const [triggerUpdateUserData, resultUserUpdate] = useUpdateUserDataMutation();
    const {localId, registered} = useSelector((state) => state.user.value);

    const handleFavorite = async() => {
        const favoritesAux = [...favorites];
        const favoriteIndex = favorites.indexOf(id);
        if (favoriteIndex !== -1) {
            favoritesAux.splice(favoriteIndex, 1);
        } else {
            favoritesAux.push(id);
        }
        dispatch(setFavorites(favoritesAux));
        triggerUpdateUserData({userId: localId, field: "favorites", data: favoritesAux}); 
    }

    useEffect(() => {
        setIsFavorite(favorites.find((favorite) => favorite === id));
    }, [favorites])
    
    return (
        <View style={styles.container}>
            {
                !isFavoriteError && registered &&
                <Pressable style={styles.heartCont} onPress={handleFavorite}>
                    { isFavorite ? <AntDesign name="heart" size={24} color="#5F2CAF" style={styles.heart}/> : <AntDesign name="hearto" size={24} color="gray" style={styles.heart}/> }
                </Pressable>
            }
            <Image style={styles.image} src={imgSrc} ></Image>
            <View style={styles.dataContainer}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(price)}</Text>
                <ButtonCard 
                    text="Ver detalles" 
                    color={colors.color3} 
                    height={40} 
                    width={"65%"} 
                    textStyle={{fontSize: 15}} 
                    buttonStyle={{paddingHorizontal: 5, marginBottom: 0}} 
                    onPressFunction={() => navigation.navigate("ProductDetail", {productId: id})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        minHeight: 175,
        borderBottomWidth: 0.75,
        borderBottomColor: colors.borderColorGray,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: colors.lightColor,
    },
    image: {
        width: "30%",
        height: "100%",
        objectFit: "contain",
    },
    dataContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "flex-start",
        width: "70%",
        paddingLeft: 15,
        paddingRight: 35,
    },
    description: {
        textAlign: "left",
        fontFamily: generalStyles.primaryFont,
        width: "100%",
    },
    price: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10,
        width: "100%",
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
