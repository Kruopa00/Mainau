import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "../Screens/Admin/Categories";
import Products from "../Screens/Admin/Products";
import ProductForm from "../Screens/Admin/ProductForm";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}
                options={{
                    title: "Skelbimai"
                }}
            />
            <Stack.Screen name="Categories" component={Categories} options={{ title: "Kategorijos" }}/>
            <Stack.Screen name="ProductForm" component={ProductForm} options={{ title: "Naujas skelbimas" }} />
        </Stack.Navigator>
    )
}

export default function AdminNavigator() {
    return <MyStack />
}