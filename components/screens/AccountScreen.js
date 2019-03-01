import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { user } from '../../redux/actions';

class AccountScreen extends Component {
  logout = async () => {
    await AsyncStorage.removeItem('token');
    await this.props.logout();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Text> User Info </Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}> {this.props.id} </Text>
            <Text style={styles.key}> id </Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.data}> {this.props.email} </Text>
            <Text style={styles.key}> email </Text>
          </View>
        </View>
        <Button onPress={this.logout} title="Logout" color="#841584" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    width: '50%',
    alignItems: 'center'
  },
  dataContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5
  },
  data: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center'
  },
  key: {}
});

const mapStateToProps = ({ user }) => ({
  email: user.email,
  id: user.id
});

export default connect(
  mapStateToProps,
  { logout: user.logout }
)(AccountScreen);
