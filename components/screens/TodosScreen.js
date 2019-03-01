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

import Todo from '../Todo';
import Filter from '../Filter';

import { todos } from '../../redux/actions';

class TodosScreen extends Component {
  state = {
    text: '',
    completeAll: false,
    page: 1,
    refetching: false
  };

  handleInputChange = (key, val) => {
    this.setState({ [key]: val });
  };

  componentDidMount = async () => {
    await this.props.fetchTodos(this.state.page);
    this.setState({ page: this.state.page + 1 });
  };

  toggleCompleteAll = async () => {
    const completeAll = !this.state.completeAll;
    await this.props.toggleCompleteAll(completeAll);
    this.setState({ completeAll });
  };

  addTodo = async () => {
    await this.props.addTodo(this.state.text);
    this.setState({ text: '' });
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
        {!!loading.fetchTodos && !refetching ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                disabled={loading.toggleAll}
                onPress={this.toggleCompleteAll}>
                <Text
                  style={[
                    styles.completeAll,
                    this.renderTodos().every(({ complete }) => complete) && {
                      color: 'green'
                    }
                  ]}>
                  {String.fromCharCode(10003)}
                </Text>
              </TouchableOpacity>
              <TextInput
                disabled={loading.addTodo}
                returnKeyType="done"
                blurOnSubmit={false}
                onSubmitEditing={this.addTodo}
                placeholder="What needs to be done?"
                style={styles.input}
                onChangeText={text => this.handleInputChange('text', text)}
                value={this.state.text}
              />
            </View>
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
          </View>
        )}
      </View>
    );
  }
  handleLoadMore = async () => {
    if (!this.props.endReached) {
      console.log('reach if', this.props.endReached);
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
  completeAll: {
    fontSize: 30,
    color: '#CCC',
    marginLeft: 5
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 5,
    fontSize: 24
  },
  todosContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CCCCCC'
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
