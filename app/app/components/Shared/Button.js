import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import {Config} from '../../common';

const Button = ({onPress, title, loading}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.buttonWrapper,
          loading === true && styles.loadingWrapper,
        ]}>
        {loading === true ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonWrapper: {
    backgroundColor: Config.primaryColor,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 50,
    flex: 1,
  },
  loadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    width: 90,
    height: 70,
    padding: 0,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 22,
  },
});

export default Button;
