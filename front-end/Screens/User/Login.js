import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import MainauButton from "../../Shared/StyledComponents/MainauButton";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const Login = (props) => {
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
          props.navigation.navigate("User Profile");
        }
    }, [context.stateUser.isAuthenticated]);

    const handleSubmit = () => {
        const user = {
            email: email.toLowerCase(),
            password
        }

        if (email === "" || password === "") {
            setError("Įveskite prisijungimo duomenis")
        }
        else {
            loginUser(user, context.dispatch)
        }
    }

    return (
        <FormContainer title={"Prisijunkite"}>
            <Input 
                placeholder={"El.pašto adresas"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Input 
                placeholder={"Slaptažodis"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null }
                <MainauButton large primary onPress={() => handleSubmit()}>
                    <Text style={{ color: 'white' }}>Prisijungti</Text>
                </MainauButton>
            </View>
            <View style={[{ marginTop:40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>
                    Naujas vartotojas?
                </Text>
                <MainauButton large secondary onPress={() => props.navigation.navigate("Register")}>
                    <Text style={{ color: 'white' }}>Registruokitės</Text>
                </MainauButton>
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: 'center'
    }
})

export default Login;