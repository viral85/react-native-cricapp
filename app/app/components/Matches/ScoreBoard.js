import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from '../../common';

const ScoreBoard = ({score, team}) => {
  // console.log(score);
  const runRate = (score.total / score.overs).toFixed(2);
  return (
    <View style={styles.scoreBoard}>
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{team}</Text>
        <View style={styles.runsovers}>
          <Text style={styles.runs}>{`${score.total}-${score.wickets}`}</Text>
          <Text style={styles.overs}>{`(${score.overs})`}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.runRate}>RR</Text>
        <Text style={styles.runRate}>{runRate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  teamInfo: {
    flexDirection: 'column',
  },
  teamName: {fontSize: 20, fontWeight: 'bold'},
  runsovers: {flexDirection: 'row'},
  runs: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 5,
  },
  overs: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  runRate: {
    fontSize: 18,
    color: '#666666',
  },
  inningInfo: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    color: Config.errorColor,
  },
});

export default ScoreBoard;
