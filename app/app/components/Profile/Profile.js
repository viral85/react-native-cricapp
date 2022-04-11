import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {logoutUser} from '../Auth/AuthActions';
import {fetchProfile} from './ProfileActions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Shared/Button';

class Profile extends Component {
  static navigationOptions = () => ({
    title: 'Profile',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Config.primaryColor,
      borderBottomWidth: 5,
      borderBottomColor: Config.accentColor,
      color: '#ffffff',
    },
  });

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = () => {
    this.props.fetchProfile();
  };

  render() {
    const {navigation, profile} = this.props;
    // console.warn(profile.user);
    return (
      <>
        <View>
          <Text style={styles.sectionTitle}>Playing Experience</Text>
          {profile.info !== null && (
            <View style={styles.expContainer}>
              <View style={styles.expWrapper}>
                <View style={styles.iconBg}>
                  <Icon name="trophy" size={24} color="#fff" />
                </View>
                <View styles={styles.expInfo}>
                  <Text style={styles.expCount}>{profile.info.bets_won}</Text>
                  <Text>Bets Won</Text>
                </View>
              </View>
              <View style={styles.expWrapper}>
                <View style={styles.iconBg}>
                  <Icon name="ticket" size={24} color="#fff" />
                </View>
                <View styles={styles.expInfo}>
                  <Text style={styles.expCount}>{profile.info.total_bets}</Text>
                  <Text>Total Bets</Text>
                </View>
              </View>
            </View>
          )}
          {profile.user !== null && (
            <>
              <Text style={styles.sectionTitle}>Profile Info</Text>
              <View style={styles.profileInfo}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoHeading}>Name</Text>
                  <Text style={styles.info}>{profile.user.name}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoHeading}>Username</Text>
                  <Text style={styles.info}>{profile.user.username}</Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoHeading}>Email</Text>
                  <Text style={styles.info}>{profile.user.email}</Text>
                </View>
              </View>
            </>
          )}
        </View>
        <Button
          title="Logout"
          onPress={async () => await this.props.logoutUser(navigation)}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: Config.primaryColor,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  expContainer: {flexDirection: 'row'},
  expWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  iconBg: {
    backgroundColor: Config.primaryColor,
    padding: 15,
    borderRadius: 50,
    marginRight: 20,
  },
  expInfo: {},
  expCount: {fontSize: 20, color: Config.primaryColor},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ccc',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    padding: 20,
  },
  infoItem: {flex: 1},
  infoHeading: {color: '#ccc', fontSize: 14, fontWeight: 'bold'},
  info: {fontSize: 16},
});

const mapStateToProps = state => {
  return {state: state.AuthReducers, profile: state.ProfileReducers};
};

export default connect(mapStateToProps, {logoutUser, fetchProfile})(Profile);
