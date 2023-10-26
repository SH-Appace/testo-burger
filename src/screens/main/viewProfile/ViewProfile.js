import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {Avatar} from 'react-native-paper';

const ViewProfile = ({navigation}) => {
  const {auth} = useSelector(state => ({...state}));

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(
    `https://demo.tangyapps.com/storage/profile/avatar.png`,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (auth) {
      setName(auth.user.name);
      setImage(auth.user.image);
      setEmail(auth.user.email);
      setPhone(auth.user.phone);
    }
    setLoading(false);
  }, []);
  return (
    <SafeAreaView
      style={[
        {...GlobalStyle.Container},
        {
          backgroundColor: Color.light,
        },
      ]}>
      <AppBar
        center={<Text style={GlobalStyle.AppCenterTextStyle}>Profile</Text>}
      />
      <ScrollView>
        {!loading && (
          <>
            <View
              style={{
                flexDirection: 'row',
                //   width: WIDTH / 2.5,
                alignItems: 'center',
                justifyContent: 'center',
                //   paddingHorizontal: CONTAINER_PADDING,
                marginTop: 25,
                marginBottom: 5,
              }}>
              <Avatar.Image
                size={Window.width / 3.5}
                style={{backgroundColor: '#F0F0F0'}}
                source={{uri: image}}
              />
            </View>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{name}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{email}</Text>

            <Text style={styles.label}>Phone Number:</Text>
            <Text style={[styles.text, {letterSpacing: 0.5}]}>{phone}</Text>

            <View style={{marginTop: 50}} />

            <Button
              text={'Edit Profile'}
              isIcon={false}
              theme="primary"
              onPressFunc={() =>
                navigation.navigate('EditProfile', {
                  fromOTPcode: false,
                })
              }
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: Color.primary,
    fontFamily: Font.Urbanist_Bold,
    alignSelf: 'flex-start',
    marginTop: 25,
    textTransform: 'capitalize',
  },
  text: {
    fontSize: 14,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_Regular,
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
});
