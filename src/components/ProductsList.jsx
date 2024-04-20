import { useEffect, useState } from "react";
import { FlatList, StyleSheet} from "react-native";
import productsList from "../data/productosList.json"
import CardHardware from "./cards/CardHardware";
import ProductDetail from "./ProductDetail";

const ProductsList = ({searchText}) => {

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
        </>
    )
}

const styles = StyleSheet.create({
    flatList: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    }
})


export default ProductsList;