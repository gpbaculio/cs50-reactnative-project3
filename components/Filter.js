import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { todos } from '../redux/actions';

class Filter extends Component {
  render() {
    const showClear =
      !!this.props.todos.length &&
      this.props.todos.some(({ complete }) => complete);
    return (
      <View style={styles.container}>
        <Text>{this.props.todos.length} count</Text>
        <View
          style={[styles.filters, !showClear && { alignItems: 'flex-start' }]}>
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
        <TouchableOpacity
          style={!showClear && { opacity: 0 }}
          disabled={!showClear}
          onPress={() => this.props.clearCompleted()}>
          <Text style={{ color: '#cc9a9a' }}>Clear Completed</Text>
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
    borderTopWidth: 1,
    width: '100%'
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
    setFilter: todos.setFilter,
    clearCompleted: todos.clearCompleted
  }
)(Filter);
