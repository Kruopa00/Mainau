import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

import AuthGlobal from "../Context/store/AuthGlobal";
import UserProductsNavigator from "./UserProductsNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {

    const context = useContext(AuthGlobal)

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                "tabBarHideOnKeyboard": true,
                "tabBarActiveTintColor": "#e91e63",
                "tabBarShowLabel": false,
                "tabBarStyle": [
                    {
                    "display": "flex"
                    },
                    null
                ]
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={30} />
                ),
                }}
            />
            
            {context.stateUser.user.isAdmin == true ? (
                <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="cog"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            ) : null}
            {context.stateUser.user.isAdmin == false ? (
                <Tab.Screen
                name="UserProducts"
                component={UserProductsNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="cog"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            ) : null}
            
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="user"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
};

export default Main;