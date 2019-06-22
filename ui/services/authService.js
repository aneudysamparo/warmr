import { AsyncStorage } from "react-native";

export const signIn = async () => {
  await AsyncStorage.setItem("jwt", "John");
};

export const signOut = async () => {
  await AsyncStorage.removeItem("jwt");
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem("jwt");
  console.log("isAuthenticated: " + token);
  return token;
};
