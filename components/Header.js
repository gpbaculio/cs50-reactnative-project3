import React, { Component } from 'react';
import {
  View,
  Text,
  CheckBox,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { todos } from '../redux/actions';

class Header extends Component {
  state = {
    text: '',
    completeAll: false
  };

  handleInputChange = (key, val) => {
    this.setState({ [key]: val });
  };

  addTodo = async () => {
    await this.props.addTodo(this.state.text);
    this.setState({ text: '' });
  };

  toggleCompleteAll = async () => {
    const completeAll = !this.state.completeAll;
    await this.props.toggleCompleteAll(completeAll);
    this.setState({ completeAll });
  };

  render() {
    const { loading } = this.props;
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity
          disabled={loading.toggleAll}
          onPress={this.toggleCompleteAll}>
          <Text
            style={[
              styles.completeAll,
              this.props.todos.length &&
                this.props.todos.every(({ complete }) => complete) && {
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
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1
  },
  completeAll: {
    fontSize: 30,
    color: '#CCC',
    marginLeft: 5
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 5,
    fontSize: 24
  }
});

export default connect(
  ({ todos }) => ({
    loading: todos.loading
  }),
  {
    toggleCompleteAll: todos.toggleCompleteAll,
    addTodo: todos.addTodo
  }
)(Header);
