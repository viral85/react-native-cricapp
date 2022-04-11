import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {fetchHistory} from './WalletActions';
import TransactionCard from './TransactionCard';

class WalletHistory extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Transaction History',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  componentDidMount() {
    this.fetchHistory();
  }

  fetchHistory = async () => {
    await this.props.fetchHistory();
  };

  render() {
    const {state} = this.props;
    return (
      <ScrollView
        style={styles.historyWrapper}
        refreshControl={
          <RefreshControl
            refreshing={state.walletHistory.loading}
            onRefresh={async () => await this.fetchHistory()}
          />
        }>
        <>
          {state.walletHistory.history &&
            state.walletHistory.history !== null &&
            state.walletHistory.history.map(transaction => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            ))}
        </>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  historyWrapper: {
    backgroundColor: Config.backgroundColor,
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {state: state.WalletReducers};
};

export default connect(
  mapStateToProps,
  {fetchHistory},
)(WalletHistory);
