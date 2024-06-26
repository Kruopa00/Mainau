import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "../Screens/Admin/Categories";
import ProductForm from "../Screens/Admin/ProductForm";
import UserProducts from "../Screens/UserProducts/UserProducts";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={UserProducts}
                options={{
                    title: "Skelbimai"
                }}
            />
            <Stack.Screen name="Categories" component={Categories} options={{ title: "Kategorijos" }}/>
            <Stack.Screen name="ProductForm" component={ProductForm} options={{ title: "Naujas skelbimas" }} />
        </Stack.Navigator>
    )
}

export default function UserProductsNavigator() {
    return <MyStack />
}