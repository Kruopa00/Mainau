import React, { useState, useEffect, useContext, useCallback } from "react"; 
import { 
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform
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
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AuthGlobal from "../../Context/store/AuthGlobal";
import mime from "mime";
import ClickableStarRating from "./ClickableStarRating";

const NewRatingForm = (props) => {
    const [description, setDescription] = useState();
    const [rating, setRating] = useState();
    const [userId, setUserId] = useState(props.route.params.userId);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const context = useContext(AuthGlobal)
    const submit = () => {
        if(rating && description) {
            AsyncStorage.getItem("jwt")
            .then((res) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${res}`
                }
            } 

            axios
            .put(`${baseURL}users/review`,  
                {
                    rating: rating,
                    comment: description,
                    userId: userId, 
                    userAddedId: context.stateUser.user.userId 
                }
            , config)
            .then((res) => {
                if(res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Įvertinimas atnaujintas!",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate("UserProfile", {userId: userId});
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
            
            //alert(description+rating);
            //props.navigation.goBack();
            })
            .catch((error) => console.log(error))
            
        } else {
            alert("Užpildykite laukus!");
        }
    }

    useFocusEffect(
        useCallback(
            () => {
                if (
                    context.stateUser.isAuthenticated === true
                ) {
                    
                    axios
                    .get(`${baseURL}users/reviews/${userId}/${context.stateUser.user.userId}`)
                    .then((res) => {
                      setRating(res.data.review.rating)
                      setDescription(res.data.review.comment)
                      setLoading(false); 
                    })
            
                    return () => {
                        setLoading(true);
                    }
                }
                  
            },
            [],
        )
    )

    return (
        <FormContainer title="Naujas atsiliepimas">
            <ClickableStarRating rating={rating} selectionCallback={(rating) => {setRating(rating)}}></ClickableStarRating>
            <TextInput style={styles.input} 
                multiline={true}                 
                placeholder="Prekės ženklas"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}/>
            
            
            <MainauButton style={{marginTop: 20}} medium secondary onPress={() => [submit()] }>
            <Text style={styles.textStyle}>Pridėti</Text>
            </MainauButton>
            
            
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        width: "80%",
        height: 80
        },
})

export default NewRatingForm;