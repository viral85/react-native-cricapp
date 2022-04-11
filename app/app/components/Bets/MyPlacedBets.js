import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from '../../common';
// import moment from 'moment';

const renderResult = bet => {
  if (bet.match.winner_team_id === null) {
    return (
      <View style={styles.pendingBg}>
        <Text style={styles.resultText}>Pending</Text>
      </View>
    );
  } else if (bet.match.winner_team_id === bet.beton) {
    return (
      <View style={styles.wonBg}>
        <Text style={styles.resultText}>Won</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.lostBg}>
        <Text style={styles.resultText}>Lost</Text>
      </View>
    );
  }
};
const MyPlacedBets = ({bet}) => {
  return (
    <View style={styles.container}>
      <View style={styles.betWrapper}>
        <View>
          <Text style={styles.teamName}>
            {bet.match.localteam.name} vs {bet.match.visitorteam.name}
          </Text>
          <Text style={styles.matchResult}>{bet.match.note}</Text>
        </View>
      </View>
      <View style={styles.transactionWrapper}>
        {/* <View style={styles.betInfo}>
          <Text style={styles.betId}>BET ID</Text>
          <Text>#{bet._id}</Text>
        </View>
        <View style={styles.betInfo}>
          <Text style={styles.betId}>Bet Date</Text>
          <Text>{moment(bet.createdAt).format('DD/MM/YYYY hh:m A')}</Text>
        </View> */}
        <View style={styles.betInfo}>
          <Text style={styles.betId}>Placed On</Text>
          <Text>
            {bet.beton === bet.match.localteam.id
              ? bet.match.localteam.name
              : bet.match.visitorteam.name}
          </Text>
        </View>
        <View style={styles.betInfo}>
          <Text style={styles.betId}>Amount</Text>
          <Text>{bet.amount}</Text>
        </View>
        <View style={styles.betInfo}>
          <Text style={styles.betId}>Bet Result</Text>
          <View>{renderResult(bet)}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    marginVertical: 10,
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
  },
  betWrapper: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  teamName: {
    textAlign: 'center',
    fontSize: 18,
    color: Config.primaryColor,
  },
  matchResult: {textAlign: 'center', marginBottom: 10},
  betInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  betId: {
    color: Config.highlightColor,
    fontWeight: 'bold',
  },
  transactionWrapper: {
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 10,
  },
  pendingBg: {
    backgroundColor: Config.highlightColor,
    padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  wonBg: {
    backgroundColor: Config.successColor,
    padding: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  lostBg: {
    backgroundColor: Config.errorColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  resultText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyPlacedBets;
