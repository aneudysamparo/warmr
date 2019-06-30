import { AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import Http from './httpService';
import { TOKEN_TYPE, TOKEN_NAME } from './constants';

const http = Http();

/* Auth */
const createToken = ({ username, password }) => http.post('/auth/login', { username, password });

/* User */
const createUser = async ({ username, password }) => {
  const userResponse = await http.post('/users', { username, password });
  const { accessToken } = userResponse.data;

  await Keychain.setGenericPassword(username, password);
  await AsyncStorage.setItem(TOKEN_NAME, accessToken);
  return accessToken;
};

const getCurrentUser = () => http.get('/users/current');
const updatePassword = (password) => http.patch('/users/current/password', { password });

/* Event */
const getEvents = (query) => http.get('/events', query);

/* Set the auth token before all requests */
http.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem(TOKEN_NAME);
  config.headers.Authorization = token ? `${TOKEN_TYPE} ${token}` : '';
  return config;
});
/* Attempt to reauthenticate user on 401 response: https://github.com/axios/axios/issues/934 */
http.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    const { username, password } = await Keychain.getGenericPassword();
    const authResponse = await createToken({ username, password });
    const { accessToken } = authResponse.data;
    await AsyncStorage.setItem(TOKEN_NAME, accessToken);
    return http.request(error.config);
  }
  return Promise.reject(error);
});

export {
  createToken,
  createUser,
  getCurrentUser,
  updatePassword,
  getEvents,
};
