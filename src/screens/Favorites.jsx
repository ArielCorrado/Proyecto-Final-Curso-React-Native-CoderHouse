import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import CardFavorites from "../components/cards/CardFavorites";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/firebaseDB";
import { generalStyles } from "../styles/generalStyles";
import { useDispatch } from "react-redux";
import { spinner } from "../features/spinner";

const Favorites = ({navigation}) => {

    const dispatch = useDispatch();
    const [result, setResult] = useState(null);
    const searchText = useSelector(state => state.search.value);
    const {data: products, error, isLoading} = useGetProductsQuery();

    useEffect(() => {
        if (products) {
            let productsToFilter = [...products];
            const productsFiltered = !searchText || searchText.length < 3 ? productsToFilter.sort((producta, productb) => producta - productb) : productsToFilter.filter(product => product.description.toLowerCase().includes(searchText.toLowerCase()))
            productsFiltered.length > 0 ? setResult(productsFiltered) : setResult([]);
        } 
    }, [products, searchText])

    useEffect(() => {
        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));
    }, [isLoading])
     
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener datos de productos</Text>
            </View>
        )
    } else if (result && result.length) {
        return (
            <View style={[generalStyles.screensContainer, styles.favoritesContainer]}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={result}
                    renderItem={({ item }) => 
                        <CardFavorites 
                            price={item.price} 
                            description={item.description} 
                            imgSrc={item.imgSrc} 
                            id={item.id}
                            navigation={navigation}
                        />
                    }
                />
            </View>
        )
    } else if (result && !result.length) {
        return (
            <View style={styles.noResultsTextCont}>
                <Text>No hay resultados</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
    },
    favoritesContainer: {
        padding: 0,
    }
})


export default Favorites;