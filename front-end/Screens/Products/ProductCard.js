import React, { useState } from "react";
import { 
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from 'react-native';

import MainauButton from "../../Shared/StyledComponents/MainauButton";
import * as SMS from 'expo-sms';

var { width } = Dimensions.get("window");


const ProductCard = (props) => {
    const { name, brand, image, user } = props;
    const { item } = props;
    const [bodySMS] = useState('Sveiki, noriu mainytis: "' + name + '".');

    const sendSms = async () => {
        const {result} = await SMS.sendSMSAsync(user.phone, bodySMS);
      }

    return (
        <View style={styles.container}>
            <Image 
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ?
                image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAACWCAMAAADjXzT7AAAAMFBMVEX39/fW1tb4+Pj09PTg4ODa2trn5+fj4+Pv7+/m5ubw8PDr6+ve3t7X19fT09Pf39+oDq+sAAAE7klEQVR4nOVdi5KbMAwEGcLDwP3/39YP7oINwRD8kNSd6fSaKRMta0trRUeqaaigYg6ohqYah25kzhRENwjFVjYvzqJC9WokaIIgOIsKo5JzZQfQcxVVy9nDmxoI999MYBQU4L80CGZM1Z48kM8XmTw+b8jttqWPsxSrK43kkZRCVFRp7TiIGubBQtRrJOiLepUBAGlR76xJyp7wXukg6wnvmwGSnvDA8V27iJh9OHZ8F66j5QmfbDdKnvBZAiVjH54HSsM+xIiSgKixQsQuarz4UIsaNzi8njB2YUDqCVOU+m9tR0IkMm/oPGG6W4/KE6bdTHg8Yer0iKTS5AgDg33IE0NxUfMFUFbUnO9eUNTcb13KE+ZP+0U8YZlCnt0TFrNmmd+4pNnOuJRKH59yJYfyB+Is6b64R7FRJC/gGFyniSPt/cYhp0XKW45FTotkdx2TnBZp0iKeg/4bCQodqtbNBpGtC7pm3BtRQ8P9kXu0xVba8YURJ32Ud3xhRCgI+GrKMZ6WeFwW4QyfFQEPty7GiA+igJwcdJevRAuli80mrnTt4kLC7jJCclqAEFYfAyMSyKV2MXnXIHR8YRhq/Spdb8JvPZ61Iylui3AORdTwMUT3grqSkpRzhVG0btdJxJ2gjqSiF0TlrDRRRXK0BI4E1ZKGKw4JCBO8/jOugi6zrixtvdIeegd0F68lKZt2ZdlIoV6qxPj6Je5goEnUkuymeVn1a8S6OvVfcr9plxdFoh7Jup7XX+Nc9yKIhgfRrt2Q1DxNkdHLtrcJCqqOAVEQrZtmLU/xmmb1c9v1Jkk1LIjuOah6s7Jf6k5nqqP/RAw+B22CQG5JTaqWeNWVAVHtgaB35Ws0q4kZ0ValH09jS/61sCK6dLtlapczjDMvolq8qfahE/H2VfpEFaXdyrW8gBnREdxF+l7QzcKJ6Py/ENWKij1RdViBH1ZETSthl4x2rzIgqhfp4JcXXVyZlRdTMv21a1au5GUYTMl0XVC9tMJfzxyIGlPfOefTEVybz4Oo8UbV8NsUU3qOPI9p5uAN0P/Mi2n26m41y4O3yrGjaaWM8jVI061m00rxWKzNsb9ONZPm2AHRuu4YtjsPiS5z0/82sPeHNkZEzQJ2PpJgTPQM9IjCvq/LkagqlyOIqb2NWdpmPhHoD+mVHRDfQF0uiXx2+PewHX+q6Ar09ZLGKMPzaVa886sbRBnLxDqRvIEeLIoxlgkj6gGyiINfqGfI4s7xoZ0KjK4BUlFT7KpYOz4iEuVJbKP1Kp5Uc3x6uh5NpUk6lvnVQw2TIHkkSMZbM6ythDvjTgw5skVxT5gv/xf1hFkresnHlmT2aIU8YYE7XETUMnsmuycslgXzesKidS2jJyzsVHJ5QgTeM8udRnGaSL930JwPE2dDTCf+hPUNWQ8n3WNL0HXlkkSETE6LBEFh7ZxHzhrFz72fEbMOIH46i0a0Z9Eg6U19RhyvhsDxhRFBCxSOL4ynnhCN4wvjUb7E5PjC+LoCorQIZ/gyYHyOL4wvYiYnp8XtsLE6vjBu5RXEji+M65UCYMTs+MK46AnRO74wrrg5Eo4vjKBaCL+95jucn7gIOb4wTjKqyswNHccXxocaSdQinOGQEkXHF8aOFUM5LTxidB1fGBtPqPOT5FBTjqG/xNrUEuqOLwztDpSoJJpCz6BbSvIfkvkyiMu7eXQAAAAASUVORK5CYII='}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.lenght > 15 ? name.substring(0, 15 - 3)
                    + '...' : name
                }
            </Text>
            <View style={{ marginBottom: 60}}>
                        <MainauButton primary medium
                            onPress={() => sendSms(user.phone)}
                        >
                    <Text style={{ color: "white" }}>Susisiekti</Text>
                </MainauButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7 + 25 ,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 15,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 50,
        height: width / 1.7 - 50,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -25
    },
    card: {
        marginBottom: 5,
        height: width / 2 - 45,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center',
    }
})

export default ProductCard;