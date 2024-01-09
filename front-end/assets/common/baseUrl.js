import { Platform } from "react-native";

let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://34.90.16.7:3000/api/v1/'
: baseURL = 'http://34.90.16.7:3000/api/v1/'
}

export default baseURL;