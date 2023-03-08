import React, { useState, useEffect, Component } from "react";
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import MainauButton from "../../Shared/StyledComponents/MainauButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("");
    console.log(item.user.phone);

    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image 
                        source={{uri: item.image ? item.image
                            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACWCAMAAADjXzT7AAAAMFBMVEX39/fW1tb4+Pj09PTg4ODa2trn5+fj4+Pv7+/m5ubw8PDr6+ve3t7X19fT09Pf39+oDq+sAAAE7klEQVR4nOVdi5KbMAwEGcLDwP3/39YP7oINwRD8kNSd6fSaKRMta0trRUeqaaigYg6ohqYah25kzhRENwjFVjYvzqJC9WokaIIgOIsKo5JzZQfQcxVVy9nDmxoI999MYBQU4L80CGZM1Z48kM8XmTw+b8jttqWPsxSrK43kkZRCVFRp7TiIGubBQtRrJOiLepUBAGlR76xJyp7wXukg6wnvmwGSnvDA8V27iJh9OHZ8F66j5QmfbDdKnvBZAiVjH54HSsM+xIiSgKixQsQuarz4UIsaNzi8njB2YUDqCVOU+m9tR0IkMm/oPGG6W4/KE6bdTHg8Yer0iKTS5AgDg33IE0NxUfMFUFbUnO9eUNTcb13KE+ZP+0U8YZlCnt0TFrNmmd+4pNnOuJRKH59yJYfyB+Is6b64R7FRJC/gGFyniSPt/cYhp0XKW45FTotkdx2TnBZp0iKeg/4bCQodqtbNBpGtC7pm3BtRQ8P9kXu0xVba8YURJ32Ud3xhRCgI+GrKMZ6WeFwW4QyfFQEPty7GiA+igJwcdJevRAuli80mrnTt4kLC7jJCclqAEFYfAyMSyKV2MXnXIHR8YRhq/Spdb8JvPZ61Iylui3AORdTwMUT3grqSkpRzhVG0btdJxJ2gjqSiF0TlrDRRRXK0BI4E1ZKGKw4JCBO8/jOugi6zrixtvdIeegd0F68lKZt2ZdlIoV6qxPj6Je5goEnUkuymeVn1a8S6OvVfcr9plxdFoh7Jup7XX+Nc9yKIhgfRrt2Q1DxNkdHLtrcJCqqOAVEQrZtmLU/xmmb1c9v1Jkk1LIjuOah6s7Jf6k5nqqP/RAw+B22CQG5JTaqWeNWVAVHtgaB35Ws0q4kZ0ValH09jS/61sCK6dLtlapczjDMvolq8qfahE/H2VfpEFaXdyrW8gBnREdxF+l7QzcKJ6Py/ENWKij1RdViBH1ZETSthl4x2rzIgqhfp4JcXXVyZlRdTMv21a1au5GUYTMl0XVC9tMJfzxyIGlPfOefTEVybz4Oo8UbV8NsUU3qOPI9p5uAN0P/Mi2n26m41y4O3yrGjaaWM8jVI061m00rxWKzNsb9ONZPm2AHRuu4YtjsPiS5z0/82sPeHNkZEzQJ2PpJgTPQM9IjCvq/LkagqlyOIqb2NWdpmPhHoD+mVHRDfQF0uiXx2+PewHX+q6Ar09ZLGKMPzaVa886sbRBnLxDqRvIEeLIoxlgkj6gGyiINfqGfI4s7xoZ0KjK4BUlFT7KpYOz4iEuVJbKP1Kp5Uc3x6uh5NpUk6lvnVQw2TIHkkSMZbM6ythDvjTgw5skVxT5gv/xf1hFkresnHlmT2aIU8YYE7XETUMnsmuycslgXzesKidS2jJyzsVHJ5QgTeM8udRnGaSL930JwPE2dDTCf+hPUNWQ8n3WNL0HXlkkSETE6LBEFh7ZxHzhrFz72fEbMOIH46i0a0Z9Eg6U19RhyvhsDxhRFBCxSOL4ynnhCN4wvjUb7E5PjC+LoCorQIZ/gyYHyOL4wvYiYnp8XtsLE6vjBu5RXEji+M65UCYMTs+MK46AnRO74wrrg5Eo4vjKBaCL+95jucn7gIOb4wTjKqyswNHccXxocaSdQinOGQEkXHF8aOFUM5LTxidB1fGBtPqPOT5FBTjqG/xNrUEuqOLwztDpSoJJpCz6BbSvIfkvkyiMu7eXQAAAAASUVORK5CYII='}}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contenText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <Text>{item.description}</Text>
                </View>
            </ScrollView>
                <View style={styles.bottomContainer}>
                    <Left>
                        <Text style={styles.review}>{item.user.ratings} <Icon 
                            name="star"
                            color={'#ffbb09'}
                            size={20}
                        /></Text>
                        <Text style={styles.review}>{item.user.name}</Text>
                    </Left>
                    <Right style={{marginRight: 15}}>
                        <MainauButton primary medium
                            onPress={() => 
                                props.navigation.navigate("Messages", { item: item })
                            }
                        >
                            <Text style={{ color: 'white' }}>Susiekti</Text>
                        </MainauButton>
                    </Right>
                </View>

        </Container>
    )

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contenText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    review: {
        fontSize: 20,
        color: '#111111',
        marginLeft: 15
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
})

export default SingleProduct;