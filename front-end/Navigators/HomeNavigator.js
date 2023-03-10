import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from "../Screens/Products/ProductContainer";
import SingleProduct from "../Screens/Products/SingleProduct";
import Messages from '../Screens/User/Messages';
import UserProfile from '../Screens/User/UserProfile';
import NewRatingForm from '../Screens/User/NewRatingForm';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Product Detail'
                component={SingleProduct}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='UserProfile'
                component={UserProfile}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="NewRating"
                component={NewRatingForm}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Messages'
                component={Messages}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
export default function HomeNavigator() {
    return <MyStack />;
}