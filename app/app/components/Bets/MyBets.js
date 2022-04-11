import React, {Component} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {getBets} from './BetsActions';
import MyPlacedBets from './MyPlacedBets';
import {withNavigationFocus} from 'react-navigation';

class MyBets extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'My Bets',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  componentDidMount() {
    this.getBets();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getBets();
    }
  }

  getBets = async () => {
    await this.props.getBets();
  };

  render() {
    const {state} = this.props;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.isLoading}
            onRefresh={() => this.getBets()}
          />
        }
        style={styles.betsContainer}>
        <View style={styles.bets}>
          {state.bets &&
            state.bets.map(bet => <MyPlacedBets key={bet._id} bet={bet} />)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  betsContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  bets: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});

const mapStateToProps = state => {
  return {
    state: state.BetsReducers,
  };
};

export default withNavigationFocus(
  connect(
    mapStateToProps,
    {getBets},
  )(MyBets),
);
