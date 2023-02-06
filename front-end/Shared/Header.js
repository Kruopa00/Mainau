import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";

const Header = () => {
    return(
        <View style={styles.header}>
            <Image 
                source={require("../assets/Untitled.png")}
                resizeMode="contain"
                style={{ height: 50 }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row', 
        alignContent: "center",
        justifyContent: "center",
        padding: 10
    }
})

export default Header;