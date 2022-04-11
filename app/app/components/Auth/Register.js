import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Config} from '../../common';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {registerUser} from './AuthActions';
import CustomTextInput from '../CustomTextInput';
import Button from '../Shared/Button';

const {height} = Dimensions.get('window');

class Register extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.registerSchema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .required('Full Name is required.'),
      username: Yup.string()
        .min(3)
        .required('Username is required.'),
      email: Yup.string()
        .email('Email')
        .required('Email is required.'),
      password: Yup.string()
        .min(4)
        .required('Password is Required'),
    });
  }

  render() {
    const {navigation, state} = this.props;

    return (
      <View style={styles.registerContainer}>
        <ScrollView>
          <View style={styles.headerTitleBG}>
            <Text style={styles.headerTitle}>Register New Account.</Text>
          </View>
          <Formik
            initialValues={{name: '', username: '', email: '', password: ''}}
            validationSchema={this.registerSchema}
            onSubmit={async values => {
              const user = {
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password,
              };
              await this.props.registerUser(user, navigation);
            }}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <View style={styles.registerForm}>
                <CustomTextInput
                  placeholder="Full Name"
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  error={errors.name}
                />
                <CustomTextInput
                  placeholder="Username"
                  onBlur={handleBlur('username')}
                  onChangeText={handleChange('username')}
                  value={values.username}
                  error={errors.username}
                />
                <CustomTextInput
                  placeholder="Email"
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                />
                <CustomTextInput
                  placeholder="Password"
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.forgotPassword}>
                    Already have an account? Login!
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Register"
                  onPress={handleSubmit}
                  loading={state.registerUser.loading}
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
  registerContainer: {
    flex: 1,
    backgroundColor: Config.backgroundColor,
  },
  headerTitleBG: {
    backgroundColor: Config.primaryColor,
    height: height / 3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '30%',
  },
  registerForm: {
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
  registerButton: {
    backgroundColor: Config.primaryColor,
    color: '#ffffff',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 5,
  },
  registerButtonText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    state: state.AuthReducers,
  };
};

export default connect(mapStateToProps, {registerUser})(Register);
