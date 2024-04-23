import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsList from '../components/ProductsList';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            {/* <Header/> */}
            <Stack.Navigator
                initialRouteName='ProductsList'
                screenOptions={{                        
                    header: ({navigation, route}) => {
                        return <Header navigation={navigation} route={route}/>
                    }
                }}
            >

                <Stack.Screen
                    component={ProductsList}
                    name='ProductsList'
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

const styles = StyleSheet.create({})