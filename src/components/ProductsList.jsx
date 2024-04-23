import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View} from "react-native";
import productsList from "../data/productosList.json"
import CardHardware from "./cards/CardHardware";
import ProductDetail from "./ProductDetail";
import { SCREEN_AVAILABLE_HEIGHT } from "../constants/dimensions";

const ProductsList = ({route}) => {

    const {searchText} = route.params || "";
    const [result, setResult] = useState([]);
    const [productDetail, setProductDetail] = useState(<></>);

    const showProductDetail = (id) => {
        setProductDetail (<ProductDetail productId={id} closeProductDetail={closeProductDetail}/>)
    }
    
    const closeProductDetail = () => {
        setProductDetail (<></>)
    }

    useEffect(() => {
        const results = !searchText || searchText.length < 3 ? productsList.sort((producta, productb) => producta - productb) : productsList.filter(product => product.description.toLowerCase().includes(searchText.toLowerCase()))
        results.length > 0 ? setResult(results) : setResult([]);
    }, [searchText])
    
    return (
        <>
            {
                result.length > 0 ?
                <>
                    <FlatList
                        contentContainerStyle={styles.flatList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        data={result}
                        renderItem={({ item }) => 
                            <CardHardware  
                                price={item.price} 
                                description={item.description} 
                                imgSrc={item.imgScr} 
                                showProductDetail={() => showProductDetail(item.id)}
                            />
                        }
                    />
                    {productDetail}  
                </> :
                <View style={styles.noResultsTextCont}>
                    <Text>No hay resultados</Text>
                </View>
            }
        </>
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