import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from '../../common';

const ScoreBoard = ({
  run,
  teamName,
  secondInning,
  totalOvers,
  firstInningInfo,
}) => {
  // console.log(firstInningInfo);
  const runRate = (run.score / run.overs).toFixed(2);
  const oversLeft = totalOvers - run.overs;
  const ballLeft = (oversLeft * 6).toFixed(0);
  const runsLeft = firstInningInfo.score + 1 - run.score;
  const reqRate = (runsLeft / oversLeft).toFixed(2);

  return (
    <View>
      <View style={styles.scoreBoard}>
        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{teamName}</Text>
          <View style={styles.runsovers}>
            <Text style={styles.runs}>{`${run.score}-${run.wickets}`}</Text>
            <Text style={styles.overs}>{`(${run.overs})`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.runRate}>RR</Text>
          <Text style={styles.runRate}>{runRate}</Text>
        </View>
        {secondInning && (
          <View>
            <Text style={styles.runRate}>REQ</Text>
            <Text style={styles.runRate}>{reqRate}</Text>
          </View>
        )}
      </View>
      {secondInning && (
        <View>
          <Text
            style={
              styles.inningInfo
            }>{`${teamName} need ${runsLeft} runs in ${ballLeft} balls`}</Text>
        </View>
      )}
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
