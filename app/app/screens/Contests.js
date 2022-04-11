import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {CustomHeader} from '../components';
import {Config} from '../common';

class Contests extends Component {
  static navigationOptions = () => ({
    title: 'Contests',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <CustomHeader title="Match View" /> */}
        <View style={styles.contests}>
          <>
            <Text style={styles.contestType}>On Winning</Text>
            <Text style={styles.contestTypeInfo}>
              Place your bet on the match result.
            </Text>
          </>
          <View style={styles.contestWrapper}>
            <Text>Contest Details</Text>
          </View>
          <>
            <Text style={styles.contestType}>Fantasy Play</Text>
            <Text style={styles.contestTypeInfo}>
              Create your own team and be a champion.
            </Text>
          </>
          <View style={styles.contestWrapper}>
            <Text>Contest Details</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Config.backgroundColor},
  contests: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  contestType: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 0,
    color: Config.highlightColor,
  },
  contestTypeInfo: {
    marginBottom: 10,
  },
  contestWrapper: {
    backgroundColor: '#ffffff',
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default Contests;
