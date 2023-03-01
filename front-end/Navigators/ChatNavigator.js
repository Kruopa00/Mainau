import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ChatContainer from '../Screens/Chat/ChatContainer'

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={ChatContainer}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
export default function ChatNavigator() {
    return <MyStack />;
}