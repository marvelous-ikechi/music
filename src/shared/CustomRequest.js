import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const customRequest = () => {
  const defaultOptions = {
    baseURL: 'https://monkey-music.herokuapp.com/v1/',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');
    console.log('tokean', token);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });

  // instance.interceptors.response.use(function (response) {
  //   if (response.status === 200 || response.status == 201) {
  //     alert('succesfull');
  //   } else {
  //     alert('Unusual behaviour');
  //   }
  //   // console.log(response);
  //   return response;
  // });

  return instance;
};

export default customRequest();
