import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {toggleOpenedFromNotification} from '../../../utils/NavigationService';
import {Color, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {StatusBar} from 'react-native';
import Icon from '../../../core/Icon';
import AppBar from '../../../components/AppBar';
const NotificationDetails = ({navigation, route}) => {
  console.log('route', route.params.notification);
  useEffect(() => {
    toggleOpenedFromNotification();
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Color.light,
        padding: Window.fixPadding * 2,
      }}>
      <StatusBar backgroundColor={Color.light} barStyle={'dark-content'} />
      <AppBar
        right={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DrawerNavigator', {
                screen: 'BottomTabScreen',
                params: {
                  screen: 'HomeStack',
                  params: {
                    screen: 'Home',
                  },
                },
              })
            }>
            <Icon
              iconFamily={'AntDesign'}
              name="close"
              size={20}
              color={Color.tertiary}
            />
          </TouchableOpacity>
        }
        left={<View></View>}
      />
      <Image
        style={styles.bannerImg}
        source={{uri: route.params.notification.android.imageUrl}}
      />
      <Text style={{...GlobalStyle.Heading, marginVertical: 10}}>
        {route.params.notification.title}
      </Text>
      <Text style={{...GlobalStyle.BasicTextStyle, fontSize: 20}}>
        {route.params.notification.body}
      </Text>
    </SafeAreaView>
  );
};

export default NotificationDetails;

const styles = StyleSheet.create({
  bannerImg: {
    height: 300,
    width: '100%',
    borderRadius: 15,
  },
});
