import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import CardHardware from "../components/cards/CardHardware";
import { useSelector } from "react-redux";
import { useGetProductsQuery, useGetProductsByCategoryQuery } from "../services/firebaseDB";
import { generalStyles } from "../styles/generalStyles";
import { useDispatch } from "react-redux";
import { spinner } from "../features/spinner";

const ProductsList = ({navigation, route}) => {

    const category = route.params ? route.params.category : "";
    const dispatch = useDispatch();
    const [result, setResult] = useState(null);
    const searchText = useSelector(state => state.search.value);
    const {data: products, error, isLoading} = category ? useGetProductsByCategoryQuery(category) : useGetProductsQuery();

    useEffect(() => {
        if (products) {
            let productsToFilter = [...products];

            const productsFiltered = 
            !searchText || searchText.length < 3 ? 
                productsToFilter.sort((producta, productb) => producta - productb) :                                                //Todos los productos ordenados alfabeticamente
                productsToFilter.filter(product => product.description.toLowerCase().includes(searchText.toLowerCase()));           //Productos filtrados por palabras de busqueda

            productsFiltered.length > 0 ? setResult(productsFiltered) : setResult([]);
        } 
        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));
    }, [products, searchText, isLoading])
     
    if (error) {
        return (
            <View style={generalStyles.screensContainer}>
                <Text>Error al obtener datos de productos</Text>
            </View>
        )
    } else if (result && result.length) {
        return (
            <View style={[generalStyles.screensContainer, styles.productsListContainer]}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    data={result}
                    renderItem={({ item }) => 
                        <CardHardware  
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
    productsListContainer: {
        padding: 0,
    }
})


export default ProductsList;