import { StyleSheet, Text, View, Pressable, Image, FlatList } from 'react-native'
import { SCREEN_AVAILABLE_HEIGHT, SCREEN_WIDTH, SCREEN_BORDER_WIDTH } from '../constants/dimensions'
import { generalStyles } from '../styles/generalStyles'
import React, { useState } from 'react'
import { colors } from '../constants/coolors'
import { useGetCategoriesQuery } from '../services/firebaseDB'
import { spinner } from '../features/spinner'
import { useDispatch } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { setTitle } from '../features/titleSlice'
import { useFocusEffect } from '@react-navigation/native'

const Categories = ({navigation}) => {

    const { data: categoriesFromDB, isLoading, isError } = useGetCategoriesQuery();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState(null);

    useFocusEffect (                                                                                        //Setemos título de screen en el header
        useCallback(() => {
           dispatch(setTitle("Categorías"))
        })
    )

    useEffect(() => {
        if (categoriesFromDB && categoriesFromDB.length) setCategories(categoriesFromDB);
        isLoading ? dispatch(spinner({show: true})) : dispatch(spinner({show: false}));
    }, [categoriesFromDB, isLoading])
                       
    if (isError) 
        return (
            <View style={[generalStyles.screensContainer, styles.favoritesContainer]}>
                <Text>Error al cargar las categorias</Text>
            </View>
        )
    else if (categories)
        return (
            <View style={[generalStyles.screensContainer, styles.favoritesContainer]}>
                <FlatList
                    contentContainerStyle={styles.favoritesContainer}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={categoriesFromDB}
                    renderItem={({ item }) => 
                        <Pressable style={styles.categoryCard} onPress={() => navigation.navigate("ProductsList", {category: item.nameParsed})}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Image src={item.imgSrc} style={styles.image} />
                        </Pressable>
                    }   
                />
            </View>
        )
}

export default Categories

const styles = StyleSheet.create({
    favoritesContainer: {
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
    },
    categoryCard: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: ((SCREEN_WIDTH - (SCREEN_BORDER_WIDTH * 2)) / 2),
        height: ((SCREEN_AVAILABLE_HEIGHT - (SCREEN_BORDER_WIDTH * 2)) / 3),
        borderColor: colors.borderColorGray,
        borderWidth: 0.5,
    },
    image: {
        width: "100%",
        height: "60%",
        objectFit: "contain",
        maxWidth: "85%",
    },
    text: {
        fontSize: 17.5,
        marginBottom: 20,
    }
})