import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Image, Text, View } from 'react-native';
import { colors } from '../../constants/coolors';
import { generalStyles } from '../../styles/generalStyles';
import ButtonCard from '../buttons/ButtonCard';
import { insertDotsInPrice } from '../../functions/utils';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../../services/firebaseDB';
import { setFavorites } from '../../features/favoritesSlice';
import { spinner } from '../../features/spinner';
import { useEffect } from 'react';

const CardFavorites = ({price, description, imgSrc, id, navigation}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);
    const {data: favorites, error: favoritesErr, isLoading: favoritesIsLoading} = useGetUserDataQuery({userId: user.localId, field: "favorites"});
    const [triggerUpdateUserData, resultUserUpdate] = useUpdateUserDataMutation();

    const updateFavorites = () => {
        dispatch(spinner({show: true}));
        const newFavorites = favorites.filter(favorite => favorite !== id);
        triggerUpdateUserData({userId: user.localId, field: "favorites", data: newFavorites});
        dispatch(setFavorites(newFavorites));
    };

    useEffect(() => {
        dispatch(spinner({show: false}));
    }, [favorites])
         
    return (
        <View style={styles.container}>
            <Image style={styles.image} src={imgSrc} ></Image>
            <View style={styles.dataContainer}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>$ {insertDotsInPrice(price)}</Text>
                <View style={styles.buttonsContainer}>
                    <ButtonCard 
                        text="Ver detalles" 
                        color={colors.color3} 
                        height={40} width={"55%"} 
                        textStyle={{fontSize: 15}} 
                        buttonStyle={{paddingHorizontal: 5, marginRight: 10}}
                        onPressFunction={() => navigation.navigate("ProductDetail", {productId: id})}
                    />
                    <ButtonCard 
                        text="Eliminar" 
                        color={colors.color2} 
                        height={40} width={"35%"} 
                        textStyle={{fontSize: 15}} 
                        buttonStyle={{paddingHorizontal: 5}}
                        onPressFunction={updateFavorites}
                    />
                </View>
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
        flexDirection: "row",
        width: "100%",
        minHeight: 175,
        height: 175,
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
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "70%",
        paddingLeft: 10,
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
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    }
})

export default CardFavorites;
