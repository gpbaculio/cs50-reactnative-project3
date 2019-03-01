import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { todos } from '../redux/actions';

class Filter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.count} count</Text>
        <View style={styles.filters}>
          <TouchableOpacity
            onPress={() => this.props.setFilter('All')}
            style={[
              styles.filter,
              this.props.filter === 'All' && styles.selected
            ]}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setFilter('Active')}
            style={[
              styles.filter,
              this.props.filter === 'Active' && styles.selected
            ]}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setFilter('Completed')}
            style={[
              styles.filter,
              this.props.filter === 'Completed' && styles.selected
            ]}>
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopColor: '#F5F5F5',
    borderTopWidth: 1
  },
  filters: {
    flexDirection: 'row'
  },
  filter: {
    paddingHorizontal: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: 'rgba(175,47,47,.2)'
  }
});

export default connect(
  ({ todos }) => ({
    filter: todos.filter
  }),
  {
    setFilter: todos.setFilter
  }
)(Filter);
