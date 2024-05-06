import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsList from '../screens/ProductsList';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import SignIn from '../screens/SignIn';
import Header from '../components/Header';
import SignUp from '../screens/SignUp';
import MainModal from '../components/modals/MainModal';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
                <MainModal/>
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
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({})