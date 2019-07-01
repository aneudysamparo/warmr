import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import AuthLoadingScreen from './screens/auth-screens/authLoadingScreen';
import WelcomeScreen from './screens/auth-screens/welcomeScreen';
import SignInScreen from './screens/auth-screens/signInScreen';
import SignUpScreen from './screens/auth-screens/signUpScreen';
import HomeScreen from './screens/app-screens/homeScreen';
import profileScreen from './screens/app-screens/profileScreen';

const AppTabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Profile: profileScreen,
});

const AppStack = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
  },
});

const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  }),
);
