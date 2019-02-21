import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

class TodosScreen extends Component {
  render() {
    return (
      <View>
        <Text> PROFILE SCREEN {this.props.email} </Text>
        <Button
          onPress={() => console.log('logout')}
          title="Logout"
          color="#841584"
        />
      </View>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  email: user.email,
  id: user.id
});

export default connect(mapStateToProps)(TodosScreen);
