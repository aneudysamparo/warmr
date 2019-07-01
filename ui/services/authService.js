import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Http from './httpService';
import { TOKEN_NAME } from './constants';

const http = Http();

/* Token Handlers */
const createToken = async ({ username, password }) => http.post('/auth/login', { username, password });
const getToken = async () => AsyncStorage.getItem(TOKEN_NAME);
const setToken = async (accessToken) => AsyncStorage.setItem(TOKEN_NAME, accessToken);
const removeToken = async () => AsyncStorage.removeItem(TOKEN_NAME);

/* Get and store auth token from server. Save username/password in secure store */
const logIn = async (credentials) => {
  const username = credentials.username.toLowerCase();
  const { password } = credentials;
  const authResponse = await createToken({ username, password });
  const { accessToken } = authResponse.data;
  await setToken(accessToken);
  await SecureStore.setItemAsync('username', username);
  await SecureStore.setItemAsync('password', password);
  return accessToken;
};

/* Remove stored auth token and remove securely stored username/password */
const logOut = async () => {
  await removeToken();
  await SecureStore.deleteItemAsync('username');
  await SecureStore.deleteItemAsync('password');
  return true;
};

/* Check if auth token exists in AsyncStorage (could be expired) */
const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};

export {
  getToken,
  setToken,
  removeToken,
  logIn,
  logOut,
  isAuthenticated,
};
