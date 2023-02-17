import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfFilledStars = Math.ceil(rating - filledStars);
  const emptyStars = 5 - filledStars - halfFilledStars;

  const renderStars = (type, count) => {
    const stars = [];

    for (let i = 0; i < count; i++) {
      stars.push(<Icon key={i} name={type} style={styles.star} />);
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      {renderStars('star', filledStars)}
      {renderStars('star-half-full', halfFilledStars)}
      {renderStars('star-o', emptyStars)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
  },
});

export default StarRating;
