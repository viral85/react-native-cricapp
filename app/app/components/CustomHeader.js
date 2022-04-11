import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Config} from '../common';

class CustomHeader extends Component {
  render() {
    const {title, children} = this.props;
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.screenTitle}>{title}</Text>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    backgroundColor: Config.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 5,
    borderBottomColor: Config.accentColor,
  },
  screenTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
