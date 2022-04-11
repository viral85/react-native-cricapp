import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Config} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {fetchBalance, fetchTotalWinnings} from './WalletActions';
import {withNavigationFocus} from 'react-navigation';

class Wallet extends Component {
  static navigationOptions = () => ({
    title: 'Wallet',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  componentDidMount() {
    this.fetchBalance();
    this.fetchTotalWinnings();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.fetchBalance();
      this.fetchTotalWinnings();
    }
  }

  fetchBalance = async () => {
    await this.props.fetchBalance();
  };

  fetchTotalWinnings = async () => {
    await this.props.fetchTotalWinnings();
  };

  render() {
    const {state, navigation} = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.isLoading}
            onRefresh={async () => {
              await this.fetchBalance();
              await this.fetchTotalWinnings();
            }}
          />
        }
        style={styles.walletWrapper}>
        <>
          <View style={styles.currencyIcon}>
            <Icon name="currency-inr" size={64} color={Config.primaryColor} />
            <Text style={styles.balance}>{state.balance}</Text>
          </View>
          <Text style={styles.balanceText}>YOUR WALLET BALANCE</Text>
          <View style={styles.winningsWrapper}>
            <View style={styles.iconBg}>
              <Icon name="seal" size={32} color="#fff" />
            </View>
            <View style={styles.winningsContent}>
              <Text style={styles.title}>Your Winnings</Text>
              <Text>The Money You Won</Text>
            </View>
            <View style={styles.moneyWrapper}>
              <Icon name="currency-inr" size={24} color={Config.primaryColor} />
              <Text style={styles.winningsMoney}>
                {state.fetchWinnings.amount}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('WalletHistory')}
            style={styles.winningsWrapper}>
            <View style={styles.iconBg}>
              <Icon name="history" size={32} color="#fff" />
            </View>
            <View style={styles.winningsContent}>
              <Text style={styles.title}>Transaction History</Text>
              <Text>Where & How much you Spent? Know all</Text>
            </View>
          </TouchableOpacity>
        </>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  walletWrapper: {
    backgroundColor: Config.backgroundColor,
    flex: 1,
  },
  currencyIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
  },
  balance: {fontSize: 64, color: Config.primaryColor},
  balanceText: {textAlign: 'center', fontSize: 20, paddingBottom: 20},
  winningsWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowOffset: {width: 5, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  iconBg: {
    backgroundColor: Config.primaryColor,
    borderRadius: 50,
    flex: 0,
    padding: 15,
  },
  winningsContent: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  moneyWrapper: {flexDirection: 'row', alignItems: 'center'},
  winningsMoney: {
    fontSize: 24,
    color: Config.primaryColor,
    paddingRight: 10,
  },
});

const mapStateToProps = state => {
  return {state: state.WalletReducers};
};

export default withNavigationFocus(
  connect(
    mapStateToProps,
    {fetchBalance, fetchTotalWinnings},
  )(Wallet),
);
