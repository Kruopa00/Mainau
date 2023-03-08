import React, { useState, useEffect, useContext } from "react";
import { 
    View,
    Text,
    Image,
    StyleSheet,
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

const NewRatingForm = () => {
    
    return (
        <FormContainer title="Naujas skelbimas">
            <Text>ssss</Text>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
  
})

export default NewRatingForm;