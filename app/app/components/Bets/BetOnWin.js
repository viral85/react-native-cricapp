import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PlacedBets from './PlacedBets';
import CustomTextInput from '../CustomTextInput';
import {Config} from '../../common';
import {connect} from 'react-redux';
import {getBetsByMatch, placeBet} from './BetsActions';
import {Formik} from 'formik';
import * as Yup from 'yup';

class BetOnWin extends Component {
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

  constructor(props) {
    super(props);
    this.betSchema = Yup.object().shape({
      amount: Yup.string().required(),
      beton: Yup.string().required(),
    });
  }

  componentDidMount() {
    this.getBetsByMatch();
  }

  getBetsByMatch = async () => {
    const {navigation} = this.props;
    await this.props.getBetsByMatch(navigation.state.params.id);
  };

  render() {
    const {navigation, state} = this.props;

    // console.log(navigation.state.params, state);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.betWrapper}>
            <Formik
              initialValues={{beton: '', amount: '10'}}
              validationSchema={this.betSchema}
              onSubmit={async values => {
                const bet = {
                  team1: navigation.state.params.localteam.id,
                  team2: navigation.state.params.visitorteam.id,
                  match_id: navigation.state.params.id,
                  beton: values.beton,
                  amount: values.amount,
                  date: navigation.state.params.starting_at,
                };
                // console.warn(bet);
                await this.props.placeBet(bet);
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
              }) => (
                <>
                  <Text style={styles.sectionTitle}>Select Team</Text>
                  <RNPickerSelect
                    onValueChange={
                      value => setFieldValue('beton', value)
                      // this.setState({selectedTeam: value})
                    }
                    items={[
                      {
                        label: navigation.state.params.localteam.name,
                        value: navigation.state.params.localteam.id,
                      },
                      {
                        label: navigation.state.params.visitorteam.name,
                        value: navigation.state.params.visitorteam.id,
                      },
                    ]}
                    useNativeAndroidPickerStyle={true}
                    style={pickerSelectStyles}
                  />
                  <Text style={styles.sectionTitle}>Bet on Win</Text>
                  <CustomTextInput
                    placeholder="Bet Amount"
                    style={styles.betInput}
                    keyboardType="number-pad"
                    onBlur={handleBlur('amount')}
                    onChangeText={handleChange('amount')}
                    value={values.amount}
                    error={errors.amount}
                  />
                  <View style={styles.increase}>
                    <TouchableOpacity
                      style={styles.increaseBtn}
                      onPress={() => setFieldValue('amount', '50')}>
                      <Text style={styles.increaseBtnText}>+50</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.increaseBtn}
                      onPress={() => setFieldValue('amount', '100')}>
                      <Text style={styles.increaseBtnText}>+100</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.increaseBtn}
                      onPress={() => setFieldValue('amount', '200')}>
                      <Text style={styles.increaseBtnText}>+200</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.increaseBtn}
                      onPress={() => setFieldValue('amount', '500')}>
                      <Text style={styles.increaseBtnText}>+500</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.placeBtn}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.placeBtnText}>Place Bet</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <Text style={styles.sectionTitle}>My Bets</Text>
            {state.getBetsByMatch.loading ? (
              <ActivityIndicator size="large" color={Config.primaryColor} />
            ) : (
              <>
                {state.getBetsByMatch.bets &&
                  state.getBetsByMatch.bets.length > 0 &&
                  state.getBetsByMatch.bets.map(bet => (
                    <PlacedBets
                      bet={bet}
                      key={bet._id}
                      placedOn={
                        bet.beton === navigation.state.params.localteam.id
                          ? navigation.state.params.localteam.name
                          : navigation.state.params.visitorteam.name
                      }
                    />
                  ))}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  betWrapper: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Config.highlightColor,
    marginBottom: 8,
  },
  betInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20,
  },
  increase: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  increaseBtn: {
    marginVertical: 15,
    marginHorizontal: 5,
    backgroundColor: Config.primaryColor,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  increaseBtnText: {
    color: '#fff',
  },
  placeBtn: {
    backgroundColor: Config.primaryColor,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    elevation: 5,
  },
  placeBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#ffffff',
    color: '#000',
    marginBottom: 10,
  },
  inputAndroid: {
    backgroundColor: '#ffffff',
    elevation: 5,
    color: '#000',
    marginBottom: 10,
  },
});

const mapStateToProps = state => {
  return {
    state: state.BetsReducers,
  };
};

export default connect(
  mapStateToProps,
  {getBetsByMatch, placeBet},
)(BetOnWin);
