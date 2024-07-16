import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {Color, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';
import {chatHistory, readMessage, sendMessage} from '../../../apis/chat';
import {useSelector} from 'react-redux';
import {Pusher} from '@pusher/pusher-websocket-react-native';
import DeviceInfo from 'react-native-device-info';

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
  let hasNotch = DeviceInfo.hasNotch();

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
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: 'chat-channel.' + orderId,
      onEvent: event => {
        console.log(`Event received: ${event}`);
        event.data = JSON.parse(event.data);
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
      },
    });
  }

  useEffect(() => {
    iniPusher();
    chatHistory(orderId, setMessages, setLoading, auth.token);
    readMessage(orderId, auth.token);
  }, []);

  const onSend = useCallback((messages = []) => {
    sendMessage({order_id: orderId, message: messages[0].text}, auth.token);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <SafeAreaView
      style={{backgroundColor: '#fff', flex: 1}}
      edges={{
        top: 'maximum',
        right: 'maximum',
        left: 'maximum',
        bottom: hasNotch && Platform.OS === 'ios' ? '' : 'maximum',
      }}>
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
    </SafeAreaView>
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
