import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainauButton from "../../Shared/StyledComponents/MainauButton";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
    return(
        <View
            elavation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Prekės ženklas</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Pavadinimas</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Kategorija</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Vartotojas</Text>
            </View>
        </View>
    )
}

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const [empty, setEmpty] = useState(true);
    
    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))
            
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setLoading(false);
                        if (res.data.length == 0) {
                            setProductList();
                            setProductFilter();
                            setEmpty(true);
                        }
                        else {
                            setProductList(res.data);
                            setProductFilter(res.data);
                            setLoading(false);
                            setEmpty(false);
                        }
                    })
            
                    return () => {
                        setProductList();
                        setProductFilter();
                        setLoading(true);
                    }
            },
            [],
        )
    )
    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList);
        } else {
            setProductFilter(
                productList.filter((i) => 
                    i.name.toLowerCase().includes(text.toLowerCase())
                )
            )
        }
    }

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: { Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .catch((error) => console.log(error))
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <MainauButton 
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Pridėti</Text>
                </MainauButton>
                <MainauButton 
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Kategorijos</Text>
                </MainauButton>
            </View>
            <View>
                <Header searchBar rounded>
                    <Item style={{ padding: 5 }}>
                        <Icon nmae="search" />
                        <Input 
                            placeholder="Paieška"
                            onChangeText={(text) => searchProduct(text)}
                        />
                    </Item>
                </Header>
            </View>

            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ): empty ? (
                <View style={styles.spinner}>
                    <Text>, jūs skelbimų neturite...</Text>
                </View>
            ) : (
                <FlatList 
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    style={{marginBottom: 20}}
                    renderItem={({ item, index }) => (
                        <ListItem 
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete={deleteProduct}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default Products;
