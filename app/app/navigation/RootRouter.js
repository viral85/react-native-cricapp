import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Config} from '../common';

// Explore
import ExploreMatches from '../components/Matches/ExploreMatches';

// Auth
import AuthLoading from '../components/Auth/AuthLoading';
import Login from '../components/Auth/Login';
import ForgotPassword from '../components/Auth/ForgotPassword';
import Register from '../components/Auth/Register';

// Bets
import MyBets from '../components/Bets/MyBets';
import Contests from '../screens/Contests';
import BetOnWin from '../components/Bets/BetOnWin';

// Matches
import LiveScore from '../components/Matches/LiveScore';

// Wallet
import Wallet from '../components/Wallet/Wallet';
import WalletHistory from '../components/Wallet/WalletHistory';

// Profile
import Profile from '../components/Profile/Profile';

const HomeStack = createStackNavigator(
  {Home: ExploreMatches, Contests, BetOnWin, LiveScore},
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: 'HOME',
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" size={24} color={tintColor} />
      ),
    }),
  },
);

const ContestsStack = createStackNavigator(
  {MyBets},
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: 'MY BETS',
      tabBarIcon: ({tintColor}) => (
        <Icon name="ticket" size={24} color={tintColor} />
      ),
    }),
  },
);

const WalletStack = createStackNavigator(
  {Wallet, WalletHistory},
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: 'WALLET',
      tabBarIcon: ({tintColor}) => (
        <Icon name="wallet" size={24} color={tintColor} />
      ),
    }),
  },
);

const MoreStack = createStackNavigator(
  {Profile, Contests, LiveScore},
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
      tabBarLabel: 'MORE',
      tabBarIcon: ({tintColor}) => (
        <Icon name="dots-vertical" size={24} color={tintColor} />
      ),
    }),
  },
);

const AppStack = createBottomTabNavigator(
  {HomeStack, ContestsStack, WalletStack, MoreStack},
  {
    tabBarOptions: {
      activeTintColor: Config.primaryColor,
      inactiveTintColor: '#666666',
      showLabel: true,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: {width: 5, height: 3},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

const AuthStack = createStackNavigator({
  Login,
  Register,
  ForgotPassword,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
      AuthLoading: AuthLoading,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
