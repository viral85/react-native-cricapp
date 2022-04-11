import Snackbar from 'react-native-snackbar';
import {Config} from '../../common';

const Alert = (message, error) =>
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: error === true ? Config.errorColor : Config.successColor,
    textColor: '#ffffff',
  });

export default Alert;
