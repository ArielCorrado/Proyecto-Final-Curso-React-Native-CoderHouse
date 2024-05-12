import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsList from '../screens/ProductsList';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import SignIn from '../screens/SignIn';
import Header from '../components/Header';
import SignUp from '../screens/SignUp';
import MainModal from '../components/modals/MainModal';
import EditProfile from '../screens/EditProfile';
import MainSpinner from '../components/spinners/MainSpinner';
import { SQLite } from '../persistence';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import { getFirebaseDBUserData } from '../services/firebaseDBFetch';
import { updateCart } from '../features/cartSlice';
import { modal } from '../features/modal';
import { spinner } from '../features/spinner';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.value.localId);

    (async ()=> {
        try {
            await SQLite.createTableIfNotExits(); 
            const sessionData = await SQLite.getData();
            if (sessionData && sessionData.length) {
                dispatch(setUser(sessionData[0]));
            }

            dispatch(spinner({ show: true }))
            const response = await getFirebaseDBUserData(userId, "cart");
            dispatch(spinner({ show: false }))
            if (response.success) {
                const cartFromDB = response.data;
                if (cartFromDB && cartFromDB.length) dispatch(updateCart(cartFromDB));
            } else {
                dispatch(modal({ show: true, text: "Error al obtener el carrito de la base de datos", icon: "Error" }));
            }
        } catch (error) {
            
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
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

