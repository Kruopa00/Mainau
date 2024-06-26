import React, { useState, useEffect, useContext, forwardRef } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert
} from "react-native";
import { Item, Picker } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import MainauButton from "../../Shared/StyledComponents/MainauButton";
import Error from "../../Shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AuthGlobal from "../../Context/store/AuthGlobal";
import mime from "mime";
import ModalSelector from 'react-native-modal-selector';

const ProductForm = (props) => {
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeature] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [user, setUser] = useState();
    const [item, setItem] = useState(null);
    const context = useContext(AuthGlobal);
    const [pickerValue, setPickerValue] = useState('Pasirinkite kategoriją');
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        
        if (!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setBrand(props.route.params.item.brand);
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());

        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        // Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => alert("Error to load categories"));
        
        // Image picker
        (async () => {
            let status;
            if (Platform.OS !== 'web') {
              status = await ImagePicker.requestCameraPermissionsAsync();
            }
            if (typeof status === 'undefined' || status.status !== 'granted') {
              Alert.alert('Atsiprašome, bet reikia Jūsų galerijos privilegijų!');
            }
          })();

        return () => {
            setCategories([]);
        }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setMainImage(result.uri);
            setImage(result.uri);
        }
    };

    const addProduct = () => {
        if (
            name == "" ||
            brand == "" ||
            description == "" ||
            category == "" ||
            countInStock == ""
        ) {
            setError("Užpildykite visus laukus!")
        }

        let formData = new FormData();


        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("user", context.stateUser.user.userId);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        } 
        if (item !== null) {
            axios
            .put(`${baseURL}products/${item.id}`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Skelbimas atnaujintas!",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Kažkas negerai su atnaujinimu...",
                    text2: "Bandykite dar kartą!"
                })
            })
        } else {
            const newImageUri = "file:///" + image.split("file:/").join("");
            formData.append("image", {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
            axios
            .post(`${baseURL}products`, formData, config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Skelbimas pridėtas!",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("Products");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Kažkas negerai...",
                    text2: "Bandykite dar kartą!"
                })
            })
        }
    };

    const handleValueChange = (option) => {
        setPickerValue(option.label);
        setCategory(option.key);
    };

    return (
        <FormContainer title="Naujas skelbimas">
            <View style={StyleSheet.flatten([styles.imageContainer])}>
                <Image style={styles.image} source={{uri: mainImage}}/>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon style={{ color: "white" }} name="camera"/>
                </TouchableOpacity> 
            </View>
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Prekės ženklas</Text>
            </View>
            <Input 
                placeholder="Prekės ženklas"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Pavadinimas</Text>
            </View>
            <Input 
                placeholder="Pavadinimas"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Kiekis</Text>
            </View>
            <Input 
                placeholder="Kiekis"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />
            
            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Aprašymas</Text>
            </View>
            <Input 
                placeholder="Aprašymas"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />

            <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Kategorija</Text>
            </View>
            <ModalSelector
                data={categories.map((c) => ({ key: c._id, label: c.name }))}
                initValue={pickerValue}
                onChange={handleValueChange}
                cancelText="Atšaukti"
                style={styles.inputStyle}
                >
                <View>
                    <Input
                    value={pickerValue}
                    editable={false}
                    />
                </View>
            </ModalSelector>
            {/* <Item picker>
                <Picker
                    dropdownMode="spinner"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Pasirinkite kategoriją"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => {
                        setPickerValue(e);
                        setCategory(e);
                    }}
                >
                    {categories.map((c) => (
                        <Picker.Item key={c._id} label={c.name} value={c._id} />
                    ))}
                </Picker>
            </Item> */}
           {err ? <Error message={err} /> : null}
           <View style={styles.buttonContainer}>
                <MainauButton
                    large
                    primary
                    onPress={() => addProduct()}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Pridėti</Text>
                </MainauButton>
           </View>
        </FormContainer>
    )
};

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    },
    inputStyle: {
        textAlign: 'center',
        width: '100%',
        marginLeft: 62
    },
})

export default ProductForm;