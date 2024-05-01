import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import CardHardware from "../components/cards/CardHardware";
import { SCREEN_AVAILABLE_HEIGHT } from "../constants/dimensions";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/firebaseDB";

const ProductsList = ({navigation}) => {

    const [result, setResult] = useState(null);
    const searchText = useSelector(state => state.search.value);
    const {data: products, error, isLoading} = useGetProductsQuery();

    useEffect(() => {
        if (products || error || isLoading) {
            if (products) {
                let productsToFilter = [...products];
                const productsFiltered = !searchText || searchText.length < 3 ? productsToFilter.sort((producta, productb) => producta - productb) : productsToFilter.filter(product => product.description.toLowerCase().includes(searchText.toLowerCase()))
                productsFiltered.length > 0 ? setResult(productsFiltered) : setResult([]);
            } 
        }
    }, [products, error, searchText, isLoading])
               
    return (
        !isLoading && result ? (
            result.length > 0 ?
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
            :
            <View style={styles.noResultsTextCont}>
                <Text>No hay resultados</Text>
            </View>
        ) 
        : 
        <View style={styles.noResultsTextCont}>
            <Text>Cargando...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    flatList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
    },
    noResultsTextCont: {
        height: SCREEN_AVAILABLE_HEIGHT - 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})


export default ProductsList;