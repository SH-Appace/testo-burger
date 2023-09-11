import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import {GlobalStyle, Font, Color, Window} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import Data from './ProfileDetails';
import {useDispatch, useSelector} from 'react-redux';
import {ManuIcon} from '../../../assets/svgs/SocialIconsSvgs';
import {useBackButton} from '../../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAccount} from '../../../apis/auth';
import Button from '../../../components/Button';
import {SkypeIndicator} from 'react-native-indicators';
import {WarningSvg, WarningSvgBig} from '../../../assets/svgs/ProfileSvgs';

const ProfileData = ({item, logoutHandler, setLoading, setModalVisible}) => {
  let navigation = useNavigation();
  const {auth} = useSelector(state => ({...state}));

  return (
    <TouchableOpacity
      onPress={async () => {
        if (item.name === 'Logout') {
          logoutHandler();
        } else if (item.name === 'Delete Account') {
          setModalVisible(true);
        } else {
          navigation.navigate(item.link, {
            fromOTPcode: item.id === 3 && false,
            fromProfile: item.id === 4 && false,
          });
        }
      }}
      style={{
        flexDirection: 'row',
        paddingBottom: 23,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.icon}

        <Text
          style={[
            {
              fontSize: 18,
              fontFamily: Font.Urbanist_SemiBold,
              lineHeight: 25.2,
              color: Color.tertiary,
              marginLeft: 15,
              marginRight: item.name === 'Profile' ? 10 : 0,
            },
            item.name === 'Delete Account' && {color: Color.primary},
          ]}>
          {item.name}
        </Text>
        {item.name === 'Profile' && auth.user.name === null && (
          <WarningSvgBig />
        )}
      </View>
      <View>
        <Icon
          iconFamily={'Feather'}
          name={item.chevron}
          size={20}
          color={Color.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const {auth} = useSelector(state => ({...state}));
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('credentials');
    await AsyncStorage.removeItem('auth');
    navigation.replace('SignIn');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        left={
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <ManuIcon />
          </TouchableOpacity>
        }
        center={<Text style={GlobalStyle.AppCenterTextStyle}>Profile</Text>}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={{width: 80, height: 80, borderRadius: 80}}
                resizeMode="cover"
                source={{
                  uri: auth.user.image
                    ? auth.user.image
                    : 'https://demoappprojects.com/food-ordering/storage/profile/avatar.png',
                }}
              />
            </View>
            <View style={{flexDirection: 'column', marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 24,
                  fontFamily: Font.Urbanist_Bold,
                  color: Color.tertiary,
                  marginBottom: 12,
                }}>
                {auth.user.name}
              </Text>
              <Text
                style={{
                  color: Color.darkGray,
                  fontSize: 16,
                  fontFamily: Font.Urbanist_Medium,
                }}>
                {auth.user.phone}
              </Text>
            </View>
          </View>
        </View>
        <View style={GlobalStyle.TopBorderStyle}></View>
        <View style={{flexDirection: 'column'}}>
          {Data.map((item, index) => (
            <ProfileData
              item={item}
              key={index}
              setModalVisible={setModalVisible}
              logoutHandler={logoutHandler}
            />
          ))}
        </View>
      </ScrollView>
      <ModalPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        logoutHandler={logoutHandler}
        token={auth.token}
      />
    </SafeAreaView>
  );
};

export default Profile;
const ModalPopup = ({
  token,
  modalVisible,
  setModalVisible,
  logoutHandler,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'center',
        }}>
        <View style={style.modalView}>
          {loading ? (
            <SkypeIndicator size={50} color={Color.secondary} />
          ) : (
            <>
              <Text style={style.modalTextHeading}>
                WARNING!{' '}
                <Icon
                  iconFamily={'Ionicons'}
                  color={Color.primary}
                  name="warning"
                  size={20}
                />
              </Text>
              <Text style={style.modalText}>
                Are you sure you want to delete your account?
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1, margin: 5}}>
                  <Button
                    text={'Cancel'}
                    theme="alternate"
                    onPressFunc={() => {
                      setModalVisible(false);
                    }}
                  />
                </View>
                <View style={{flex: 1, margin: 5}}>
                  <Button
                    text={'Delete'}
                    theme="primary"
                    onPressFunc={() => {
                      deleteAccount(
                        setLoading,
                        () => {
                          setModalVisible(false);
                          logoutHandler();
                        },
                        token,
                        setModalVisible,
                      );
                    }}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalView: {
    margin: 25,
    backgroundColor: Color.light,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 25,
    height: Window.height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalTextHeading: {
    marginBottom: 25,
    textAlign: 'center',
    color: Color.primary,
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Color.textColor,
    fontSize: 14,
    fontFamily: Font.Urbanist_Regular,
  },
});
