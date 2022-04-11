import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Config} from '../../common';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {loginUser} from './AuthActions';
import CustomTextInput from '../CustomTextInput';
import Button from '../Shared/Button';

const {width, height} = Dimensions.get('window');

class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.loginSchema = Yup.object().shape({
      username: Yup.string()
        .min(3)
        .required('Username is required.'),
      password: Yup.string()
        .min(4)
        .required('Password is Required'),
    });
  }

  render() {
    const {navigation, state} = this.props;

    return (
      <View style={styles.loginContainer}>
        <ScrollView>
          <View style={styles.headerTitleBG}>
          <Image style={styles.logo} source={require('../../images/logo.png')} />
            {/* <Text style={styles.headerTitle}>Hello! Welcome back</Text> */}
          </View>
          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={this.loginSchema}
            onSubmit={async values => {
              const user = {
                username: values.username,
                password: values.password,
              };
              await this.props.loginUser(user, navigation);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View style={styles.loginForm}>
                <CustomTextInput
                  placeholder="Username"
                  onBlur={handleBlur('username')}
                  onChangeText={handleChange('username')}
                  value={values.username}
                  error={errors.username}
                />
                <CustomTextInput
                  placeholder="Password"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.forgotPassword}>
                    Don't have an account? Register!
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Login"
                  onPress={handleSubmit}
                  loading={state.isInprogress}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  headerTitleBG: {
    backgroundColor: Config.primaryColor,
    height: height / 2.5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flex:1,
    // justifyContent:'center',
    alignItems:"center"
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '30%',
  },
  loginForm: {
    backgroundColor: '#ffffff',
    marginTop: -50,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30,
    elevation: 5,
  },
  forgotPassword: {
    textAlign: 'center',
    color: Config.primaryColor,
    fontSize: 18,
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: Config.primaryColor,
    color: '#ffffff',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    width: width / 2,
    height: width / 2,
  },
});

const mapStateToProps = state => {
  return {
    state: state.AuthReducers,
  };
};

export default connect(mapStateToProps, {loginUser})(Login);
