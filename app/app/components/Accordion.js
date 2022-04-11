import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.toggleExpand()}>
          <View style={styles.accordionHeader}>
            <View style={styles.accordionTitle}>{this.props.title()}</View>
            <Icon
              name={this.state.expanded ? 'chevron-up' : 'chevron-down'}
              size={32}
              color="#333"
            />
          </View>
        </TouchableOpacity>
        {this.state.expanded && <View>{this.props.content()}</View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accordionTitle: {
    flex: 1,
  },
});

export default Accordion;
