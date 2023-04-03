import React, { useState, useCallback  } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect } from '@react-navigation/native'

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from './../Products/ProductList';
import SearchedProduct from './../Products/SearchedProducts';

var { height } = Dimensions.get('window');

const UserProducts = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Products        
                axios
                    .get(`${baseURL}products/user/${props.userId}`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })

                // Categories
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })
                return() => {
                    setProducts([])
                    setProductsFiltered([])
                    setFocus()
                    setCategories([])
                    setActive()
                    setInitialState()
                }
            },
            [],
        )
    ))   
        

    const searchProduct = (text) => {
        setProductsFiltered(
          products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    // Categories
    const changeCtg = (ctg) => {
        {
          ctg === "all"
            ? [setProductsCtg(initialState), setActive(true)]
            : [
                setProductsCtg(
                  products.filter((i) => i.category._id === ctg),
                  setActive(true)
                )
              ];
        }
      };

    return(
        <>
        {loading == false ? (
            <Container style={{ backgroundColor: 'gainsboro' }}>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search"/>
                        <Input 
                            placeholder="Paieška"
                            onFocus={openList}
                            onChangeText={(text) => searchProduct(text)}
                        />
                        {focus == true ? (
                            <Icon onPress={onBlur} name="ios-close" />
                        ) : null}
                    </Item>
                </Header>
                {focus == true ? (
                    <SearchedProduct 
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                ) : (
                    <ScrollView>
                        <View>
                            {productsCtg.length > 0 ? (
                                <View style={styles.listContainer}>
                                    {productsCtg.map((item) => {
                                        return(
                                            <ProductList
                                                navigation={props.navigation}
                                                key={item._id}
                                                item={item}
                                            />
                                        )
                                    })}
                                </View>
                            ): (
                                <View style={[styles.center, { height: height / 2 }]}>
                                    <Text>Deja, skelbimų nerasta...</Text>
                                </View>
                            )}
                            
                        </View>
                    </ScrollView>
                    
                )}
            </Container>
        ) : (
            // Loading
            <Container style={[styles.center, { backgroundColor: "#f2f2f2"}]}>
                <ActivityIndicator size="large" color="red" />
            </Container>
        )}  
        </>  
    );
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
        marginBottom: 57
    },
    listContainer: {
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserProducts;