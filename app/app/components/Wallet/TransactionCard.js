import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {Config} from '../../common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionCard = ({transaction}) => {
  let type_text;
  let type;

  if (transaction.transaction_type === 'winning') {
    type_text = 'Won Bet';
    type = styles.credit;
  } else if (transaction.transaction_type === 'joined') {
    type_text = 'Joined Match';
    type = styles.debit;
  } else if (transaction.transaction_type === 'addcash') {
    type_text = 'Cash Added';
    type = styles.credit;
  }

  return (
    <View style={styles.transactionWrapper}>
      <View>
        <Text>{moment(transaction.createdAt).format('YYYY-MM-DD h:mm A')}</Text>
        <Text style={styles.transactionInfo}>{type_text}</Text>
        <View>
          <Text style={styles.transactionInfo}>Transaction ID:</Text>
          <Text>{transaction._id}</Text>
        </View>
      </View>
      <View style={styles.amount}>
        <Icon name="currency-inr" size={20} style={type} />
        <Text style={type}>{transaction.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
  },
  transactionInfo: {
    fontWeight: 'bold',
  },
  credit: {color: Config.successColor, fontSize: 20},
  debit: {color: Config.errorColor, fontSize: 20},
  amount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionCard;
