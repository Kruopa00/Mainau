import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base";
import { useFocusEffect, MaterialTopTabBar} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser, loginUserWithToken } from "../../Context/actions/Auth.actions";
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
        AsyncStorage.getItem("jwt")
            .then((res) => {
                if (
                    context.stateUser.isAuthenticated === false || 
                    context.stateUser.isAuthenticated === null ||
                    !context.stateUser.user
                ) {
                    props.navigation.navigate("Login")
                    return
                }


                setUserId(context.stateUser.user.userId);
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => {
                        if(user.status == 401) {
                            props.navigation.navigate("Login")
                        }
                        setUserProfile(user.data);
                    })
            })
            .catch((error) => [console.log(error)])
        
            return () => {
                setUserProfile();
            }

    }, [context.stateUser.isAuthenticated])
    return (
        <Container contentContainerStyle={ styles.container }>
            <View style={{ height: 180 }}>
                <ScrollView contentContainerStyle={ styles.subContainer }>
                    <Text style={{ fontSize: 30, textTransform: 'capitalize' }}>
                        {userProfile ? userProfile.name : ""}
                    </Text>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ margin: 5, textAlign: 'center', fontSize: 20}}>
                            {userProfile ? "Aprašymas:" : ""}
                        </Text>
                        <Text style={{textAlign: "justify"}}>
                            {userProfile ? userProfile.description : ""}
                        </Text>
                    </View>     
                    <View style={{ marginTop: 10 }}>
                        <Button title={"Atsijungti"} onPress={() => [
                            logoutUser(context.dispatch),
                            props.navigation.navigate("Login")
                        ]}/>
                    </View>
                </ScrollView>
            </View>
            {userId &&
            <Tab.Navigator 
                initialRouteName="Iverciai"
                screenOptions={{
                    "tabBarActiveTintColor": "#fff",
                    "tabBarInactiveTintColor": "#b3e5fc",
                    "tabBarIndicatorStyle": {
                        "backgroundColor": "#fff"
                    },
                    "tabBarStyle": {
                        "backgroundColor": "#3f51b5"
                    }
                }}
                // tabBarOptions={{ buttonContainer: {
                //     margin: 20,
                //     alignSelf: 'center',
                //     flexDirection: 'row'
                // },
                //     style: { backgroundColor: '#3f51b5' },
                //     activeTintColor: '#fff',
                //     inactiveTintColor: '#b3e5fc',
                //     indicatorStyle: { backgroundColor: '#fff' }}}
                >
                <Tab.Screen name="Atsiliepimai" children={()=><UserReviews userId={userId} parentProps={props}/>} />
                <Tab.Screen name="Produktai"  children={()=><UserProducts userId={userId}  navigation={props.navigation}/>}/>
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