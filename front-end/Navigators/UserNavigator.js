import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import MyUserProfile from "../Screens/User/MyUserProfile";
import MyProductDetail from "../Screens/User/MyProductDetail";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="User Profile"
                component={MyUserProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name='Product Detail'
                component={MyProductDetail}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />
}