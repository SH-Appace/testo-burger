import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {Color, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {color: Color.light},
        }}
        wrapperStyle={{
          right: {
            backgroundColor: Color.primary,
            padding: 10,
            borderTopRightRadius: 0,
          },
          left: {
            backgroundColor: Color.grayishBlue,
            padding: 10,
            borderTopLeftRadius: 0,
          },
        }}
      />
    );
  };
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello customer! Good to see you hear 😁',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://demo.tangyapps.com/storage/profile/avatar.png',
        },
      },
      {
        _id: 2,
        text: 'I have order double beef burger for December 23 at 10 AM 🔥🔥🔥',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://demo.tangyapps.com/storage/profile/avatar.png',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>Chat</Text> */}
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Chat Support</Text>
        }
      />
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: Window.fixPadding,
  },
});
