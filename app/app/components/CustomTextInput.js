/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput} from 'react-native';
import {Config} from '../common';

const CustomTextInput = ({error, ...props}) => {
  return (
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: error !== undefined ? Config.errorColor : '#ebebeb',
        borderRadius: 50,
        paddingHorizontal: 20,
        marginTop: 20,
      }}
      {...props}
    />
  );
};

export default CustomTextInput;
