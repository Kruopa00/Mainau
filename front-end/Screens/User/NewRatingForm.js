import React, { useState, useEffect, useContext } from "react";
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
import * as ImagePicker from "expo-image-picker";
import AuthGlobal from "../../Context/store/AuthGlobal";
import mime from "mime";
import ClickableStarRating from "./ClickableStarRating";

const NewRatingForm = (props) => {
    const [description, setDescription] = useState();
    const [rating, setRating] = useState();
    const submit = () => {
        if(rating && description) {
            alert(description+rating);
            props.navigation.goBack();
        } else {
            alert("Užpildykite laukus!");
        }
    }

    return (
        <FormContainer title="Naujas įvertis">
            <ClickableStarRating selectionCallback={(rating) => {setRating(rating)}}></ClickableStarRating>
            <TextInput style={styles.input} 
                multiline={true}                 
                placeholder="Prekės ženklas"
                name="description"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}/>
            <MainauButton style={{marginTop: 20}} medium secondary onPress={() => [submit()] }>
            <Text style={styles.textStyle}>Priduoti</Text>
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