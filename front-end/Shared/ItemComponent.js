import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Input from '../Shared/Form/Input';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

// ...

const ItemComponent = () => {
  const [pickerValue, setPickerValue] = useState('Pasirinkite kategoriją');
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Categories
    axios
    .get(`${baseURL}categories`)
    .then((res) => setCategories(res.data))
    .catch((error) => alert("Error to load categories"));

        return () => {
            setCategories([]);
        }
    }, [])

  const handleValueChange = (option) => {
    setPickerValue(option.label);
    setCategory(option.key);
  };

  return (
    <ModalSelector
      data={categories.map((c) => ({ key: c._id, label: c.name }))}
      initValue={pickerValue}
      onChange={handleValueChange}
      cancelText="Atšaukti"
      style={styles.inputStyle}
    >
      <View>
        <Input
          value={pickerValue}
          editable={false}
        />
      </View>
    </ModalSelector>
  );
};

const styles = {
  inputStyle: {
    textAlign: 'center',
    width: '100%',
    marginLeft: 62
    },
};

export default ItemComponent;
