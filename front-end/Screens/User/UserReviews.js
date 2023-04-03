
import { fontSize } from "@mui/system";
import React, { useState, useCallback, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback, Dimensions} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StarRating from './StarRating';
import baseURL from "../../assets/common/baseUrl";
import MainauButton from "../../Shared/StyledComponents/MainauButton";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import axios from "axios";
import AuthGlobal from "../../Context/store/AuthGlobal";

var { height } = Dimensions.get("window");

const teest = [
  {
    starRating: 4,
    reviewerName: "Item 1",
    body: "This client was very rude. don't recommend",
    date: "2022-01-01"
  },
  {
    starRating: 3,
    reviewerName: "Ana Frankssssss",
    body: "Hello, how are you doing? I cannot do anything to do because I have stuff to do. It makes hard to do",
    date: "2022-02-01"
  },
  {
    starRating: 5,
    reviewerName: "Arturas Jomantas",
    body: "No comment",
    date: "2022-03-01"
  },
  {
    starRating: 4,
    reviewerName: "Item 1",
    body: "This client was very rude. don't recommend",
    date: "2022-01-01"
  },
  {
    starRating: 3,
    reviewerName: "Ana Frank",
    body: "This client was very kind. absolutely recommend",
    date: "2022-02-01"
  },
  {
    starRating: 5,
    reviewerName: "Arturas Jomantas",
    body: "No comment",
    date: "2022-03-01"
  }
];

const Item = ({ rating, nameWhoAdded, date, comment, isFirst }) => (
  <View   style={{ marginLeft: 5, marginRight: 5, marginTop: isFirst ? 0 : 20, fontSize: 30}}> 
    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18 }} name={styles.item}>{nameWhoAdded}</Text>
      </View>
    </View>
    <View style={{ marginTop: 2, flexDirection: "row", alignItems: "center"}}>
      <View>
      <StarRating rating={rating} />
      </View>
      <View style={{position: 'absolute', right: 10}}>
        <Text style={{ color: "gray" }}>{date}</Text>
      </View>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4}}>
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.default]} name={styles.item}>{comment}</Text>
      </View>
    </View>
  </View>
);

const ItemList = ({ items }) => (
  
    <View>
    {items.map((item, index) => (
      <Item style={{marginTop: (index===0) ? 0 : 30 }} key={item.reviewerName} {...item} isFirst={index === 0} />
    ))}
    </View>

);

function UserReviews(props) {
    const [reviewList, setReviewList] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    const [empty, setEmpty] = useState(true);
    const context = useContext(AuthGlobal)
    useFocusEffect(
        useCallback(
            () => {

                  // Get Token
                  AsyncStorage.getItem("jwt")
                  .then((res) => {
                      setToken(res)
                  })
                  .catch((error) => console.log(error))
                  axios
                    .get(`${baseURL}users/reviews/${props.userId}`)
                    .then((res) => {
                      if (res.data.reviews.length == 0) {
                        setEmpty(true);
                        setReviewList();
                      }
                      else
                        setEmpty(false);
                      setReviewList(res.data.reviews);
                      setLoading(false);
                    })
            
                    return () => {
                        setReviewList();
                        setLoading(true);
                        setEmpty(true);
                    }
            },
            [],
        )
    )
  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text style={{ color: "#006600", fontSize: 40 }}>Profiler Screen!</Text>
    // </View>
    <View>
    <ScrollView>
    { props.allowNewRating && context.stateUser.isAuthenticated &&
      <View  style={styles.buttonContainer}>
      <MainauButton
                    medium
                    primary
                    style={{height: 40, backgroundColor: '#3f51b5' }}
                    onPress={() => [props.parentProps.navigation.navigate("NewRating", {userId: props.userId})]}
                >
                    <Icon name="plus" size={18} color="white"/>
                </MainauButton> 
      </View>
    }
    { !loading && !empty &&
    <ItemList items={reviewList}></ItemList>
    }
    { !loading && empty &&
      <View style={styles.spinner}>
        <Text style={{fontSize: 20}}>
          Deja, atsiliepimų nėra...
        </Text>  
      </View>
      
    }
    </ScrollView>

    </View>
   
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 14,
    color: '#AAD700',
  },
  defaultFont: {
    fontFamily: 'Arial',
  },
  defaultTextSize: {
    fontSize: 14
  },
  container: {
    marginTop: 20,
    flex: 1,
        justifyContent: "center",
    alignItems: "center"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center"
},

  /* Here style the text of your button */
    customBtnText: {
        fontSize: 40
    },

  /* Here style the background of your button */
    customBtnBG: {
    backgroundColor: "#007aff",
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 30
    },
    buttonText: {
      fontSize: 30,
    },
    spinner: {
      height: height / 2,
      alignItems: 'center',
      justifyContent: 'center'
  },
});
  
export default UserReviews;