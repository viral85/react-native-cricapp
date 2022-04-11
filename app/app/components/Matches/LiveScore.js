import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {getLiveScore} from './MatchActions';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import ScoreBoard from './ScoreBoard';
import Batting from './Batting';
import Bowling from './Bowling';
import Accordion from '../Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CountDown from 'react-native-countdown-component';
class LiveScore extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.localteam.code} vs ${
      navigation.state.params.visitorteam.code
    }`,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  componentDidMount() {
    this.getLiveScore();
  }

  getLiveScore = async () => {
    const {navigation} = this.props;
    const match_id = navigation.state.params.id;
    const status = navigation.state.params.status;
    // console.warn(status);
    await this.props.getLiveScore(match_id, status);
  };

  render() {
    const {state, navigation} = this.props;
    const dateDiff = moment.duration(
      moment(navigation.state.params.starting_at).diff(moment(new Date())),
    );
    const seconds =
      dateDiff.asHours() * 60 * 60 +
      dateDiff.minutes() * 60 +
      dateDiff.seconds();
    // console.warn(seconds);
    return (
      <View style={styles.scoreboard}>
        <ScrollView>
          <View>
            {state.livescore.loading === true ? (
              <ActivityIndicator size="large" color={Config.primaryColor} />
            ) : (
              <>
                {state.livescore.error ? (
                  <>
                    <Text style={styles.matchNotLive}>
                      {`Starts on ${moment(
                        navigation.state.params.starting_at,
                      ).format('ddd, MMM DD hh:mm A')}`}
                    </Text>
                    <CountDown
                      digitStyle={styles.countDownBG}
                      digitTxtStyle={styles.countDownText}
                      until={seconds}
                      size={20}
                    />
                  </>
                ) : (
                  <>
                    {state.livescore.score === null ? (
                      <>
                        <Text>No Live Data Found.</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.matchNote}>
                          {state.livescore.score.note
                            ? state.livescore.score.note
                            : state.livescore.score.status}
                        </Text>

                        {state.livescore.score.scoreboards.map(
                          scoreboard =>
                            scoreboard.type === 'total' && (
                              <View key={scoreboard.scoreboard}>
                                <Accordion
                                  title={() => (
                                    <ScoreBoard
                                      score={scoreboard}
                                      key={scoreboard.scoreboard}
                                      team={
                                        scoreboard.team_id ===
                                        state.livescore.score.localteam.id
                                          ? state.livescore.score.localteam.name
                                          : state.livescore.score.visitorteam
                                              .name
                                      }
                                    />
                                  )}
                                  content={() => (
                                    <>
                                      <Batting
                                        batting={state.livescore.score.batting}
                                        battingTeam={scoreboard.scoreboard}
                                      />
                                      <Bowling
                                        bowling={state.livescore.score.bowling}
                                        bowlingTeam={scoreboard.scoreboard}
                                      />
                                    </>
                                  )}
                                />
                              </View>
                            ),
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.placeBets}
          onPress={() =>
            navigation.navigate('BetOnWin', navigation.state.params)
          }>
          <Icon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreboard: {flex: 1, position: 'relative'},
  matchNotLive: {
    padding: 20,
    textAlign: 'center',
  },
  matchNote: {
    color: Config.errorColor,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  placeBets: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Config.primaryColor,
    padding: 20,
    borderRadius: 50,
    elevation: 5,
  },
  countDownBG: {
    backgroundColor: Config.successColor,
  },
  countDownText: {color: '#fff'},
});
const mapStateToProps = state => {
  return {
    state: state.MatchReducers,
  };
};

export default connect(
  mapStateToProps,
  {getLiveScore},
)(LiveScore);
