import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {Color, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';
import {chatHistory, readMessage, sendMessage} from '../../../apis/chat';
import {useSelector} from 'react-redux';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

const Chat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector(state => state.auth);
  const orderId = route.params.orderId;
  const fromNotification = route.params?.from_notification
    ? route.params?.from_notification
    : false;
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

  function generateUUID() {
    const chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case 'x':
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case 'y':
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    return chars.join('');
  }

  const formatEventData = event => {
    const userId = event.userId ? event.userId : 1;
    console.log(event.data.message);
    const formattedMessage = {
      _id: generateUUID(),
      createdAt: new Date().toISOString(),
      text: event.data.message,
      user: {
        _id: userId,
      },
    };

    return [formattedMessage];
  };

  async function iniPusher() {
    const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: 'd980932ee394770d0950',
      cluster: 'ap2',
      // authEndpoint: `https://demo.tangyapps.com/api/v1/pusher/user-auth/${auth.user.id}`,
    });

    await pusher.connect();
    // console.log(pusher);
    await pusher.subscribe({
      // channelName: 'private-chat.' + auth.user.id,
      channelName: 'chat-channel.' + orderId,
      onEvent: event => {
        console.log(`Event received: ${event}`);

        event.data = JSON.parse(event.data);
        console.log(event.data.receiverId);

        if (
          event.data.receiverId == auth.user.id &&
          event.data.orderId == orderId
        ) {
          const formattedData = formatEventData(event);
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, formattedData),
          );
        }
      },
      onConnectionStateChange(currentState) {
        console.log(`Connection: ${currentState}`);
      },
      onError(message, code, e) {
        console.log(`onError: ${message} code: ${code} exception: ${e}`);
      },
      onSubscriptionSucceeded(channelName, data) {
        console.log(`onSubscriptionSucceeded: ${channelName} data: ${data}`);
      },
      onSubscriptionError(channelName, message, e) {
        console.log(
          `onSubscriptionError: ${message} channelName: ${channelName} Exception: ${e}`,
        );
      },
      onAuthorizer(channelName, socketId) {
        console.log(
          `calling onAuthorizer. channelName=${channelName}, socketId=${socketId},`,
        );
        // var obj = {
        // socket_id: socketId,
        // channel_name: channelName,
        // };
        // const response = await Api.post(urls.CHAT_AUTH, obj, (isChatify = true));
        // console.log( onAuthorizerresponse:, response);
        // if (!isAuthenticated) {
        // // Your authentication logic here
        // isAuthenticated = true;
        // return {auth:response.auth,id:'3'};
        // }
        // If already authenticated, return null or undefined
        // return null;
        // return response;
      },
    });
  }

  useEffect(() => {
    iniPusher();
    chatHistory(orderId, setMessages, setLoading, auth.token);
    readMessage(orderId, auth.token);
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello customer! Good to see you hear 😁',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://demo.tangyapps.com/storage/profile/avatar.png',
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'I have order double beef burger for December 23 at 10 AM 🔥🔥🔥',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://demo.tangyapps.com/storage/profile/avatar.png',
    //     },
    //   },
    // ]);
    // return async () => {
    //   await pusher.reset();
    // };
  }, []);

  const onSend = useCallback((messages = []) => {
    // console.log(messages);
    sendMessage({order_id: orderId, message: messages[0].text}, auth.token);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>Chat</Text> */}
      <AppBar
        onPressBackBtn={() =>
          fromNotification
            ? navigation.navigate('DrawerNavigator', {
                screen: 'BottomTabScreen',
                params: {
                  screen: 'OrderStack',
                  params: {
                    screen: 'Order',
                  },
                },
              })
            : navigation.goBack()
        }
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Order# {orderId}</Text>
        }
      />
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth.user.id,
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
