import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Http from './httpService';
import { TOKEN_TYPE, TOKEN_NAME } from './constants';

const http = Http();

/* Auth */
const createToken = ({ username, password }) => http.post('/auth/login', { username: username.toLowerCase(), password });

/* User */

/* Create user, store returned auth token, and save username/password in secure store */
const registerUser = async (credentials) => {
  const username = credentials.username.toLowerCase();
  const { email, password } = credentials;
  const userResponse = await http.post('/users', { username, email, password });
  const { accessToken } = userResponse.data;
  if (accessToken) {
    /* Store auth token in async storage */
    await AsyncStorage.setItem(TOKEN_NAME, accessToken);
    /* Store credentials in secure store */
    await SecureStore.setItemAsync('username', username);
    await SecureStore.setItemAsync('password', password);
  }
  return accessToken;
};

const getCurrentUser = () => http.get('/users/current');
const updatePassword = (password) => http.patch('/users/current/password', { password });

/* Event */
const getEvents = async (query) => {
  const eventsResponse = await http.get('/events', query);
  return eventsResponse.data;
};

/* Set the auth token before all requests */
http.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_NAME);
  config.headers.Authorization = token ? `${TOKEN_TYPE} ${token}` : '';
  return config;
});

/**
 * Attempt to reauthenticate user on 401 response: https://github.com/axios/axios/issues/934
 * On 401: Get username/password from secure store, get and store new auth token, retry request
 */
http.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    const username = await SecureStore.getItemAsync('username');
    const password = await SecureStore.getItemAsync('password');
    const authResponse = await createToken({ username, password });
    const { accessToken } = authResponse.data;
    await AsyncStorage.setItem(TOKEN_NAME, accessToken);
    return http.request(error.config);
  }
  return Promise.reject(error);
});

export {
  createToken,
  registerUser,
  getCurrentUser,
  updatePassword,
  getEvents,
};
