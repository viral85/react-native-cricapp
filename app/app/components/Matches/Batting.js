import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Config} from '../../common';

const {width} = Dimensions.get('window');

const Batting = ({batting, battingTeam}) => {
  // console.log(battingTeam);
  return (
    <View style={styles.battingContainer}>
      <View style={styles.tableHeading}>
        <View style={styles.playerInfo}>
          <Text style={styles.headingText}>Batsman</Text>
        </View>
        <View style={styles.scoreInfo}>
          <Text style={styles.headingScore}>R</Text>
          <Text style={styles.headingScore}>B</Text>
          <Text style={styles.headingScore}>4s</Text>
          <Text style={styles.headingScore}>6s</Text>
          <Text style={styles.headingScore}>SR</Text>
        </View>
      </View>
      <>
        {batting.map(player => {
          // console.log(player);
          return (
            <View key={player.id}>
              {player.scoreboard === battingTeam && (
                <View style={styles.tableRow}>
                  <View style={styles.playerScore}>
                    <View style={styles.playerInfo}>
                      <Text style={styles.playerName}>
                        {`${player.batsman.fullname}${
                          player.active === true ? ' *' : ''
                        }`}
                      </Text>
                    </View>
                    <View style={styles.scoreInfo}>
                      <Text style={styles.score}>{player.score}</Text>
                      <Text style={styles.score}>{player.ball}</Text>
                      <Text style={styles.score}>{player.four_x}</Text>
                      <Text style={styles.score}>{player.six_x}</Text>
                      <Text style={styles.score}>{player.rate}</Text>
                    </View>
                  </View>
                  <Text>
                    {player.fow_balls === 0 && 'batting'}
                    {player.catchstump != null &&
                      `c ${player.catchstump.fullname}`}
                    {player.bowler != null && ` b ${player.bowler.fullname}`}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  battingContainer: {
    // padding: 20,
    flexDirection: 'column',
  },
  tableHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingVertical: 8,
    // marginBottom: 10,
    backgroundColor: Config.primaryColor,
    paddingHorizontal: 20,
  },
  tableRow: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  playerScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerInfo: {
    flex: 0,
    flexWrap: 'wrap',
    width: width / 2,
  },
  scoreInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  score: {minWidth: 30, maxWidth: 30, textAlign: 'right'},
  headingText: {color: '#fff'},
  headingScore: {minWidth: 30, maxWidth: 30, textAlign: 'right', color: '#fff'},
  playerName: {color: Config.primaryColor},
});

export default Batting;
