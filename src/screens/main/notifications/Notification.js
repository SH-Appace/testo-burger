import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Appbar from '../../../components/AppBar';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import Data from './NotificationData';
import {create} from 'react-test-renderer';
import Icon from '../../../core/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getNotifications} from '../../../apis/notifications';
import {useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {Image} from 'react-native';
import {EmptySvg} from '../../../assets/svgs/NotificationSvg';
import {useBackButton} from '../../../hooks';

const NotificationDataDetails = ({item}) => {
  return (
    <>
      <View style={{marginVertical: 12}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Color.veryLightGray,
                width: 60,
                height: 60,
                borderRadius: 100,
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
            </View>
            <View style={{flexDirection: 'column', marginLeft: 16}}>
              <Text
                style={{
                  fontSize: 20,
                  color: Color.secondary,
                  lineHeight: 24,
                  fontFamily: Font.Urbanist_Bold,
                }}>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 0,
                }}>
                <Text style={styles.textStyle}>
                  {new Date(item.updated_at).toDateString()}
                </Text>
              </View>
              <Text
                style={{
                  color: Color.darkGray,
                  marginTop: 5,
                  fontSize: 16,
                  fontFamily: Font.Urbanist_Regular,
                }}>
                {item.description}
              </Text>
            </View>
          </View>
          {item.new && (
            <View
              style={{
                backgroundColor: Color.primary,
                borderRadius: 6,
                width: 41,
                height: 34,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.light,
                  lineHeight: 12,
                  fontSize: 10,
                  fontFamily: Font.Urbanist_SemiBold,
                }}>
                {item.new}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const Notification = ({navigation}) => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  const {wishlist, auth} = useSelector(state => ({...state}));

  useEffect(() => {
    getNotifications(auth.token, setData, setLoading);
  }, []);
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar
        translucent
        backgroundColor={Color.light}
        barStyle={'dark-content'}
      />
      <Appbar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Notifications</Text>
        }
      />

      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => <NotificationDataDetails item={item} />}
          horizontal={false}
          showsHorizontalScrollIndicator
          pagingEnabled
          ItemSeparatorComponent={() => (
            <View style={{width: '100%', height: 1, backgroundColor: '#eee'}} />
          )}
        />
      ) : (
        <View style={{alignItems: 'center'}}>
          <EmptySvg width={Window.width / 1.3} height={Window.height / 1.35} />
        </View>
      )}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000000AA',
          }}>
          <SkypeIndicator size={50} color={Color.grey} />
        </View>
      )}
    </SafeAreaView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  textStyle: {
    color: Color.greyscale,
    // lineHeight: 19.6,
    fontSize: 12,
    fontFamily: Font.Urbanist_Medium,
  },
});
