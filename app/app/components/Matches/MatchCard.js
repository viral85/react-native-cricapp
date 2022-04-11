import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Config} from '../../common';
import moment from 'moment';

class MatchCard extends Component {
  render() {
    const {navigation, match} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('LiveScore', match)}>
        <View style={styles.matchContainer}>
          <Image
            source={{uri: match.localteam.image_path}}
            style={styles.teamImage}
            resizeMode="contain"
          />
          <View style={styles.matchInfo}>
            <Text style={styles.matchName}>{match.league.name}</Text>
            <Text style={styles.matchName}>
              {`${match.localteam.code} vs ${match.visitorteam.code}`}
            </Text>
            <Text style={styles.time}>
              {moment
                .utc(match.starting_at)
                .startOf('hour')
                .fromNow()}
            </Text>
          </View>
          <Image
            source={{uri: match.visitorteam.image_path}}
            style={styles.teamImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  matchContainer: {
    // flex: 0,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchInfo: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamImage: {width: 80, height: 80},
  time: {
    fontWeight: 'bold',
    color: Config.highlightColor,
    // flex: 1,
    textAlign: 'center',
  },
  matchName: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MatchCard;
