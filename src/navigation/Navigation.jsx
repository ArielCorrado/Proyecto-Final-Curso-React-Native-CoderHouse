import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsList from '../screens/ProductsList';
import ProductDetail from '../screens/ProductDetail';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import SignIn from '../screens/SignIn';
import Header from '../components/Header';
import SignUp from '../screens/SignUp';
import MainModal from '../components/modals/MainModal';
import EditProfile from '../screens/EditProfile';
import MainSpinner from '../components/spinners/MainSpinner';
import Categories from '../screens/Categories';
import { SQLite } from '../persistence';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import { getFirebaseDBUserData } from '../services/firebaseDBFetch';
import { updateCart } from '../features/cartSlice';
import { modal } from '../features/modal';
import { spinner } from '../features/spinner';
import { setFavorites } from '../features/favoritesSlice';
import FinalizePurchase from '../screens/FinalizePurchase';
import Orders from '../screens/Orders';
import Order from '../screens/Order';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.value.localId);

    (async ()=> {
        try {
            await SQLite.createTableIfNotExits();                                                                                            //Se guardan datos de sesión en base de datos local
            const sessionData = await SQLite.getData();
            if (sessionData && sessionData.length) {
                dispatch(setUser(sessionData[0]));
            }

            dispatch(spinner({ show: true }))
            const userResponse = await getFirebaseDBUserData(userId, "cart");                                                               //Obtenemos carrito de firebase
            const favoritesResponse = await getFirebaseDBUserData(userId, "favorites");                                                     //Obtenemos favoritos de firebase
            dispatch(spinner({ show: false }))

            if (userResponse.success) {
                const cartFromDB = userResponse.data;
                if (cartFromDB && cartFromDB.length) dispatch(updateCart(cartFromDB));
            } else {
                dispatch(modal({ show: true, text: "Error al obtener el carrito de la base de datos", icon: "Error" }));
            }

            if (favoritesResponse.success) {
                const favoritesFromDB = favoritesResponse.data;
                if (favoritesFromDB && favoritesFromDB.length) {
                    dispatch(setFavorites(favoritesFromDB)) 
                } 
            } else {
                dispatch(modal({ show: true, text: "Error al obtener el favoritos de la base de datos", icon: "Error" }));
            }
        } catch (error) {
            dispatch(modal({ show: true, text: "Error al obtener datos de sesión", icon: "Error" }));
        }
    })()

    return (
        <NavigationContainer>
                <MainModal/>
                <MainSpinner/>
            <Stack.Navigator
                initialRouteName='ProductsList'
                screenOptions={{
                    header: ({navigation, route}) => <Header navigation={navigation} route={route}/>,
                    headerTransparent: true,
                }}
                
            >
                <Stack.Screen
                    component={ProductsList}
                    name='ProductsList'
                />
                <Stack.Screen
                    component={ProductDetail}
                    name='ProductDetail'
                />
                <Stack.Screen
                    component={Cart}
                    name='Cart'
                />
                 <Stack.Screen
                    component={SignIn}
                    name='SignIn'
                />
                <Stack.Screen
                    component={SignUp}
                    name='SignUp'
                />
                <Stack.Screen
                    component={EditProfile}
                    name='EditProfile'
                />
                <Stack.Screen
                    component={Favorites}
                    name='Favorites'
                />
                <Stack.Screen
                    component={Categories}
                    name='Categories'
                />
                <Stack.Screen
                    component={FinalizePurchase}
                    name='FinalizePurchase'
                />
                <Stack.Screen
                    component={Orders}
                    name='Orders'
                />
                <Stack.Screen
                    component={Order}
                    name='Order'
                />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

