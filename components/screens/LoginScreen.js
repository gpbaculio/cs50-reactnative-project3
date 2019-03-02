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
      this.props.navigation.navigate('App');
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

  render() {
    const { email, password, errors } = this.state;
    const { loading } = this.props;
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
        <Button
          color="#f4511e"
          title={loading ? 'Logging in' : 'Login'}
          disabled={loading}
          onPress={this.onSubmit}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5'
  },
  input: {
    width: '70%',
    height: 40,
    backgroundColor: '#FFF',
    marginBottom: 8,
    padding: 5
  }
});

const mapStateToProps = ({ user, todos }) => {
  return { loading: user.loading };
};

export default connect(
  mapStateToProps,
  {
    login: user.login
  }
)(Login);
