import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base";
import { useFocusEffect, MaterialTopTabBar} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.actions";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserReviews from "./UserReviews";
import UserProducts from "./UserProducts";

const Tab = createMaterialTopTabNavigator();

const MyUserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userId, setUserId] = useState();
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        setUserId(context.stateUser.user.userId);
        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))
        
            return () => {
                setUserProfile();
        }

    }, [context.stateUser.isAuthenticated])
    return (
        <Container contentContainerStyle={ styles.container }>
            <View style={{ height: 180 }}>
                <ScrollView contentContainerStyle={ styles.subContainer }>
                    <Text style={{ fontSize: 30 }}>
                        {userProfile ? userProfile.name : ""}
                    </Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ margin: 5 }}>
                            El. paštas: {userProfile ? userProfile.email : ""}
                        </Text>
                        <Text style={{ margin: 5 }}>
                            Tel. numeris: {userProfile ? userProfile.phone : ""}
                        </Text>
                    </View>     
                    <View style={{ marginTop: 10 }}>
                        <Button title={"Atsijungti"} onPress={() => [
                            AsyncStorage.removeItem("jwt"),
                            logoutUser(context.dispatch)
                        ]}/>
                    </View>
                </ScrollView>
            </View>
            {userId &&
            <Tab.Navigator 
                initialRouteName="Iverciai"
                tabBarOptions={{ buttonContainer: {
                    margin: 20,
                    alignSelf: 'center',
                    flexDirection: 'row'
                },
                    style: { backgroundColor: '#3f51b5' },
                    activeTintColor: '#fff',
                    inactiveTintColor: '#b3e5fc',
                    indicatorStyle: { backgroundColor: '#fff' }}}
                >
                <Tab.Screen name="Atsiliepimai" children={()=><UserReviews userId={userId} parentProps={props}/>} />
                <Tab.Screen name="Produktai"  children={()=><UserProducts userId={userId}/>}/>
            </Tab.Navigator>}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    subContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
})

export default MyUserProfile;