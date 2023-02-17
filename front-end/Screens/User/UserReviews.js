
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import StarRating from './StarRating';

const teest = [
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

const Item = ({ starRating, reviewerName, date, body, isFirst }) => (
  <View   style={{ marginLeft: 5, marginRight: 5, marginTop: isFirst ? 0 : 15, fontSize: 30}}> 
    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 18 }} name={styles.item}>{reviewerName}</Text>
      </View>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <View>
      <StarRating rating={starRating} />
      </View>
      <View style={{position: 'absolute', right: 10}}>
        <Text style={{ color: "gray" }}>{date}</Text>
      </View>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center"}}>
      <Text numberOfLines={3} style={{ flex: 1, flexWrap: 'wrap', fontSize: 13, color: "gray" }}>{body}</Text>
    </View>
  </View>
);

const ItemList = ({ items }) => (
  <View>
    {items.map((item, index) => (
      <Item style={{marginTop: (index===0) ? 0 : 20 }} key={item.reviewerName} {...item} isFirst={index === 0} />
    ))}
  </View>
);

const UserReviews = () => {
  return (
    // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    //   <Text style={{ color: "#006600", fontSize: 40 }}>Profiler Screen!</Text>
    // </View>
    <ItemList items={teest}></ItemList>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 40,
    color: '#AAD700',
  },
});
  
export default UserReviews;