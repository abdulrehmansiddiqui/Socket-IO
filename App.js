import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }


  componentDidMount() {
    this.socket = io('http://192.168.0.101:3000/', {
      transports: ['websocket'],
      autoConnect: true,
    })

    // this.socket.on('lastname', (data) => { // this is listening to server message if 'lastname' must be same
    //   console.log(data, "aaaaaaaaaaaaaaaaaaaa");
    //   this.socket.emit('My Name', { my: 'abdul Rehman' }); // this is sending the to server if 'My Name' must be same
    // });

    this.socket.on("chat msg", msg => {
      console.log(msg, "listing from server")
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      })
    })

  }


  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({ chatMessage: '' });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{ borderWidth: 2, }}>{chatMessage}</Text>
    ));
    return (
      <View style={styles.container}>
        {chatMessages}

        <View style={{ position: 'absolute', bottom: 90, width: '100%' }}>
          <TextInput
            style={{ height: 40, borderWidth: 2, width: '100%' }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.submitChatMessage()}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});