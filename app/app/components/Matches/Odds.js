import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from '../../common';

const Odds = ({team1, team2}) => {
  const totalBets = team1 + team2;
  const team1Odds = team1 / totalBets;
  const team2Odds = team2 / totalBets;
  return (
    <View style={styles.oddsWrapper}>
      <Text style={styles.team1}>{team1}</Text>
      <View style={styles.oddsPercent}>
        <Text>{team1Odds}</Text>
        <Text>{team2Odds}</Text>
      </View>
      <Text style={styles.team2}>{team2}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  oddsWrapper: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 50,
  },
  team1: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  team2: {
    flex: 1,
    textAlign: 'right',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  oddsPercent: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: Config.accentColor,
  },
});

export default Odds;
