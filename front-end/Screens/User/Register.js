import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainauButton from "../../Shared/StyledComponents/MainauButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl"


const Register = (props) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const register = () => {
        if (email === "" || name === "" || password === "" || phone === "") {
            setError("Įveskite teisingus duomenis")
        }

        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false
        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Sėkmingai užsiregistravote!",
                        text2: "Galite prisijungti!"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Kažkas negerai...",
                    text2: "Bandykite dar kartą",
                });
            });
        }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Registracija"}>
                <Input 
                    placeholder={"El.paštas"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input 
                    placeholder={"Vartotojo vardas"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text.toLowerCase())}
                />
                <Input
                    placeholder={"Tel.numeris"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input 
                    placeholder={"Slaptažodis"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <MainauButton
                        large
                        primary
                        onPress={() => register()}
                    >
                        <Text style={{ color: 'white'}}>Sukurti paskyrą</Text>
                    </MainauButton>
                </View>
                <View style={{ marginTop: 5 }}>
                    <MainauButton
                        large
                        secondary
                        onPress={
                            () => props.navigation.navigate("Login")}
                    >
                        <Text style={{ color: 'white'}}>Prisijungti</Text>
                    </MainauButton>
                </View>
            </FormContainer>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        margin: 10,
        alignItems: 'center'
    }
})

export default Register;