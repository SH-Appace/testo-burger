import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import TextField from '../../../components/TextFeild';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../apis/profile';
import PhoneInput from '../../../components/PhoneInput';
import {SkypeIndicator} from 'react-native-indicators';
import {showMessage} from 'react-native-flash-message';
import {Avatar, FAB} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from '../../../core/Icon';
import {useBackButton} from '../../../hooks';

const EditProfile = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState({
    code: '',
    phone: '',
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState(
    'https://demoappprojects.com/food-ordering/storage/profile/avatar.png',
  );
  const [loading, setLoading] = useState(true);
  let formData = new FormData();
  const {auth} = useSelector(state => ({...state}));

  const {fromOTPcode} = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth) {
      setName(auth.user.name);
      setImage(auth.user.image);
      setEmail(auth.user.email);
      // setPhone({code: '', phone: auth.user.phone});
    }
    setLoading(false);
  }, []);
  const submitHandler = () => {
    if (name === '') {
      showMessage({
        message: 'Please enter a name',
        type: 'danger',
      });
      return;
    }
    if (email === '') {
      showMessage({
        message: 'Please enter an email address',
        type: 'danger',
      });
      return;
    }
    // if (phone === '') {
    //   showMessage({
    //     message: 'Please enter a phone number',
    //     type: 'danger',
    //   });
    //   return;
    // }
    if (imageUpload !== null) {
      formData.append('image', imageUpload);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone.code + phone.phone);
      updateProfile(
        formData,
        navigation,
        setLoading,
        fromOTPcode,
        auth.token,
        dispatch,
      );
    } else {
      updateProfile(
        {name, email, phone: phone.code + phone.phone},
        navigation,
        setLoading,
        fromOTPcode,
        auth.token,
        dispatch,
      );
    }
  };
  const pickImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
        setImageUpload({
          uri: response.assets[0].uri,
          name: `${Date.now().toString()}-${response.assets[0].fileName}`,
          type: response.assets[0].type,
        });
      }
    });
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{justifyContent: 'flex-end', flex: 1}}>
      <View style={{...GlobalStyle.Container}}>
        <AppBar
          left={
            fromOTPcode ? (
              <></>
            ) : (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  iconFamily={'Octicons'}
                  name="arrow-left"
                  size={25}
                  color={Color.secondary}
                />
              </TouchableOpacity>
            )
          }
          center={
            <Text style={GlobalStyle.AppCenterTextStyle}>
              Fill Your Profile
            </Text>
          }
          right={<Text style={{color: Color.black}}></Text>}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingTop: 25}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flexDirection: 'row',
              width: Window.width / 2.5,
              alignSelf: 'center',
              marginBottom: 25,
            }}>
            <Avatar.Image
              size={Window.width / 2.5}
              style={{backgroundColor: '#F0F0F0'}}
              source={{uri: image}}
            />
            <FAB icon="pencil-outline" style={styles.fab} onPress={pickImage} />
          </View>
          <View
            style={{
              marginTop: 20,
              flex: 1,
            }}>
            <TextField
              placeholder="Your Name"
              onChanged={setName}
              icon="account"
              value={name}
            />
            <View style={{marginVertical: 10}} />
            <TextField
              value={email}
              placeholder="Email addresse"
              onChanged={setEmail}
              icon="email"
              keyboardType="email-address"
            />
            <View style={{marginVertical: 10}} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Color.primary,
                  fontFamily: Font.Urbanist_Bold,
                  fontSize: 12,
                  marginRight: 5,
                }}>
                Verified
              </Text>
              <Icon
                iconFamily={'MaterialCommunityIcons'}
                name="check-circle-outline"
                size={16}
                color={Color.primary}
              />
            </View>
            <PhoneInput
              disabled={true}
              setLoading={setLoading}
              placeholder="XXXXXXXXXX"
              onChanged={setPhone}
              value={phone}
            />
          </View>
          {/* </View> */}
          <View style={GlobalStyle.BottomButtonContainer}>
            <Button
              text={fromOTPcode ? 'Continue' : 'Save'}
              icon="mail"
              isIcon={false}
              theme="primary"
              // navLink="CreatePin"
              onPressFunc={submitHandler}
            />
          </View>
        </ScrollView>
      </View>
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

export default EditProfile;
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Color.primary,
    right: 0,
    bottom: 10,
  },
});
