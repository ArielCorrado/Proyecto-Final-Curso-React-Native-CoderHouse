import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export const menuOptionsList = [                                                                    //Lista de opciones que aparecen en el menu
    {
        text: "Inicio",
        icon: <AntDesign name="home" size={24} color="black" />,
        toScreen: "ProductsList"
    },
    {
        text: "Favoritos",
        icon: <AntDesign name="hearto" size={24} color="black" />,
        toScreen: "Favorites"
    },
    {
        text: "Categorías",
        icon: <Feather name="list" size={24} color="black" />,
        toScreen: "Categories"
    },
    {
        text: "Mis compras",
        icon: <Feather name="shopping-bag" size={24} color="black" />,
        toScreen: "Buy"
    },
    {
        text: "Mis órdenes de compra",
        icon: <Ionicons name="receipt-outline" size={24} color="black" />,
        toScreen: "Orders"
    },
]