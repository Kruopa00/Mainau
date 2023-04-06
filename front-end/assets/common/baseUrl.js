import { Platform } from "react-native";

let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://34.91.194.5:3000/api/v1/'
: baseURL = 'http://34.91.194.5:3000/api/v1/'
}

export default baseURL;