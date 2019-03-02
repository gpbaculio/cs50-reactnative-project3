import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  CheckBox,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../Header';
import Todo from '../Todo';
import Filter from '../Filter';

import { todos } from '../../redux/actions';

class TodosScreen extends Component {
  state = {
    page: 1,
    refetching: false
  };

  componentDidMount = async () => {
    await this.props.fetchTodos(this.state.page);
    this.setState({ page: this.state.page + 1 });
  };

  renderTodos = () => {
    const { ids, todos, filter } = this.props;
    const data = [...ids.map(id => todos[id])];
    if (filter === 'All') {
      return data;
    } else if (filter === 'Active') {
      return data.filter(({ complete }) => !complete);
    } else if (filter === 'Completed') {
      return data.filter(({ complete }) => complete);
    }
  };

  render() {
    const { loading } = this.props;
    const { refetching } = this.state;
    return (
      <View style={styles.container}>
        <Header todos={this.renderTodos()} />
        <FlatList
          style={styles.todosContainer}
          data={this.renderTodos()}
          renderItem={({ item }) => <Todo {...item} />}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={this.handleLoadMore}
        />
        <Filter count={this.renderTodos().length} />
        {((loading.fetchTodos && !refetching) || loading.toggleAll) && (
          <View style={styles.loading}>
            <ActivityIndicator animating size="large" />
          </View>
        )}
      </View>
    );
  }
  handleLoadMore = async () => {
    if (!this.props.endReached) {
      this.setState({ page: this.state.page + 1, refetching: true });
      await this.props.fetchTodos(this.state.page);
      this.setState({ refetching: false });
    }
  };
  renderSeparator = () => <View style={styles.separator} />;
  renderFooter = () => (
    <View>{this.state.refetching && <ActivityIndicator />}</View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)'
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  todosContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  }
});

export default connect(
  ({ user, todos }) => ({
    email: user.email,
    id: user.id,
    todos: todos.todos,
    loading: todos.loading,
    ids: todos.todoIds,
    endReached: todos.endReached,
    filter: todos.filter
  }),
  {
    fetchTodos: todos.fetchTodos,
    toggleCompleteAll: todos.toggleCompleteAll,
    addTodo: todos.addTodo
  }
)(TodosScreen);
