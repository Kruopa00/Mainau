
// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// import SMS API
import * as SMS from 'expo-sms';

const Messages = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [mobileNumber, setMobileNumber] = useState(item.user.phone);
    const [bodySMS, setBodySMS] = useState('Sveiki, noriu mainytis Jūsų preke: "' + item.name + '".');

  const sendSms = async () => {
    const {result} = await SMS.sendSMSAsync(
      mobileNumber, bodySMS
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
            Susisiekite dėl prekės, kurią norite mainytis.
        </Text>
        <Text style={styles.titleTextsmall}>
          Įveskite žinutę:
        </Text>
        <TextInput
          value={bodySMS}
          onChangeText={(bodySMS) => setBodySMS(bodySMS)}
          placeholder={'Įveskite žinutę'}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={sendSms}>
          <Text style={styles.buttonTextStyle}>
            Siųsti žinutę
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});