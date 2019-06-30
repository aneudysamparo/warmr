import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Http from './httpService';
import { TOKEN_NAME } from './constants';

const http = Http();
/* Token Handlers */
const createToken = async ({ username, password }) => http.post('/auth/login', { username, password });
const getToken = async () => AsyncStorage.getItem(TOKEN_NAME);
const setToken = async (accessToken) => AsyncStorage.setItem(TOKEN_NAME, accessToken);
const removeToken = async () => AsyncStorage.removeItem(TOKEN_NAME);

const logIn = async ({ username, password }) => {
  await Keychain.setGenericPassword(username, password);
  const authResponse = await createToken({ username, password });
  const { accessToken } = authResponse.data;
  await setToken(accessToken);
  return accessToken;
};

const logOut = async () => {
  await removeToken();
  return true;
};

const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};

export {
  getToken,
  setToken,
  logIn,
  logOut,
  isAuthenticated,
};
