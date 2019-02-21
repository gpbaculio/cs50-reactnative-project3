import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  Text,
  AsyncStorage,
  TextInput
} from 'react-native';
import isEmail from 'validator/lib/isEmail';
import { connect } from 'react-redux';
import { user } from '../../redux/actions';

class Login extends Component {
  static navigationOptions = {
    title: 'Login'
  };
  state = {
    password: '',
    email: '',
    errors: {
      email: '',
      password: ''
    }
  };
  handleInput = (key, text) => {
    this.setState({ [key]: text });
  };
  onSubmit = async () => {
    const { email, password } = this.state;
    const errors = this.validate({ email, password });
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      await this.props.login({ email, password });
    }
  };
  validate = ({ email, password }) => {
    const errors = {};
    if (!isEmail(email)) {
      errors.email = 'Invalid email';
    }
    if (!password) {
      errors.password = "Can't be blank";
    }
    return errors;
  };
  componentWillUnmount = () => {
    this.props.logout();
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: errors.email ? 'red' : 'gray'
            }
          ]}
          onChangeText={text => this.handleInput('email', text)}
          value={email}
          placeholder="Email"
        />
        {!!errors.email && (
          <Text style={{ color: 'red', marginBottom: 5 }}>{errors.email}</Text>
        )}
        <TextInput
          style={[
            styles.input,
            {
              borderColor: errors.password ? 'red' : 'gray'
            }
          ]}
          onChangeText={text => this.handleInput('password', text)}
          secureTextEntry={true}
          value={password}
          placeholder="Password"
        />
        {!!errors.password && (
          <Text style={{ color: 'red', marginBottom: 5 }}>
            {errors.password}
          </Text>
        )}
        <Button title="Login" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  }

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '70%',
    height: 40,
    borderWidth: 1,
    marginBottom: 5,
    padding: 5
  }
});

const mapStateToProps = ({ loginForm }) => ({
  loading: loginForm.loading,
  errors: loginForm.errors
});

export default connect(
  null,
  {
    login: user.login,
    logout: user.logout
  }
)(Login);
