import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import HomeNavigator from "./HomeNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import ChatNavigator from "./ChatNavigator";

import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {

    const context = useContext(AuthGlobal)

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
            keyboardHidesTabBar: true,
            showLabel: false,
            activeTintColor: "#e91e63",
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
            <Tab.Screen
                name="Chat"
                component={ChatNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            name="comments"
                            color={color}
                            size={30}
                        />
                    )
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