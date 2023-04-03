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
    
const Posts = () => (
    <View style={{ backgroundColor: '#ff4081' }}><Text>asdasd</Text></View>
  );
const Reviews = () => (
    <View style={{ backgroundColor: '#fd408a' }}><Text>qqqqq</Text></View>
);


const UserProfile = (props) => {
    const [userId, setUserId] = useState(props.route.params.userId);
    const [userProfile, setUserProfile] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading) {
            AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => [setUserProfile(user.data), setLoading(false)])
            })
            .catch((error) => console.log(error))
        
            return () => {
                setUserProfile();
                setLoading(false);
            }
        }
    })
    return (
        <Container contentContainerStyle={ styles.container }>
            <View style={{ height: 180 }}>
                <ScrollView contentContainerStyle={ styles.subContainer }>
                    <Text style={{ fontSize: 30 }}>
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
                </ScrollView>
            </View>
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
                <Tab.Screen name="Atsiliepimai" children={()=><UserReviews allowNewRating={true} userId={userId} parentProps={props}/>} />
                <Tab.Screen name="Produktai" children={()=><UserProducts userId={userId} navigation={props.navigation}/>}/>
            </Tab.Navigator>
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

export default UserProfile;