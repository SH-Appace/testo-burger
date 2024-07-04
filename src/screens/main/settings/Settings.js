import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {
  DeleteAccountSvg,
  NotificationIcon,
  WarningSvgBig,
} from '../../../assets/svgs/ProfileSvgs';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SkypeIndicator} from 'react-native-indicators';
import {deleteAccount} from '../../../apis/auth';
import {Switch} from 'react-native-paper';

const Settings = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem('credentials');
    await AsyncStorage.removeItem('auth');
    navigation.replace('SignIn');
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <SafeAreaView
      style={[
        {...GlobalStyle.Container},
        {
          backgroundColor: Color.light,
        },
      ]}>
      <AppBar
        center={<Text style={GlobalStyle.AppCenterTextStyle}>Settings</Text>}
      />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingTop: 25}}
        showsVerticalScrollIndicator={false}>
        {Data.map((item, index) => (
          <ProfileData
            item={item}
            key={index}
            setModalVisible={setModalVisible}
            isSwitchOn={isSwitchOn}
            onToggleSwitch={onToggleSwitch}
          />
        ))}
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

export default Settings;

const styles = StyleSheet.create({
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

const ProfileData = ({item, isSwitchOn, onToggleSwitch, setModalVisible}) => {
  let navigation = useNavigation();
  const auth = useSelector(state => state.auth);

  return (
    <TouchableOpacity
      onPress={async () => {
        if (item.name === 'Delete Account') {
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
      {item.name === 'Notifications' ? (
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color={Color.primary}
        />
      ) : (
        <Icon
          iconFamily={'Feather'}
          name={item.chevron}
          size={20}
          color={Color.primary}
        />
      )}
    </TouchableOpacity>
  );
};

const Data = [
  {
    id: 4,
    icon: <NotificationIcon />,
    name: 'Notifications',
    chevron: 'chevron-right',
    link: 'Notification',
  },

  {
    id: 10,
    icon: <DeleteAccountSvg />,
    name: 'Delete Account',
  },
];

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
        <View style={styles.modalView}>
          {loading ? (
            <SkypeIndicator size={50} color={Color.secondary} />
          ) : (
            <>
              <Text style={styles.modalTextHeading}>
                WARNING!{' '}
                <Icon
                  iconFamily={'Ionicons'}
                  color={Color.primary}
                  name="warning"
                  size={20}
                />
              </Text>
              <Text style={styles.modalText}>
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
