import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper';
import { BorderRadius, Color, Font, Window } from '../globalStyle/Theme';
import Button from './Button';

const NotLoginPopup = ({ visible, setVisible, message = 'Please login to place your order' }) => {

    const hideModal = () => {
      setVisible(false);
    };
  
    const containerStyle = {
      marginHorizontal: 20,
      borderRadius: BorderRadius,
      backgroundColor: Color.light,
    };
  
    return (
      <Modal
        theme={{
          colors: {
            backdrop: '#000000AA',
          },
        }}
        animationType="fade"
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <View style={{
          backgroundColor: Color.light,
          padding: 20,
          marginTop: 20,
          borderRadius: 24,
        }}>
  
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <Image
              style={{ alignSelf: 'center', width: 80, height: 80 }}
              source={require('../assets/images/pics/Emoji.png')}
            />
            <Text
              style={{
                color: Color.tertiary,
                fontFamily: Font.Urbanist_Bold,
                fontSize: 24,
                marginVertical:Window.fixPadding
              }}>
              You're not login
            </Text>
            <Text
              style={{
                color: Color.tertiary,
                fontFamily: Font.Urbanist_Regular,
                fontSize: 16,
                marginRight: 15,
                textAlign: 'center',
                marginBottom:Window.fixPadding*1.5
  
              }}>
                {message}
            </Text>
          </View>
          <Button
            text={'Go to login'}
            icon="mail"
            isIcon={false}
            theme="primary"
            navLink="SignIn"
          />
        </View>
      </Modal>
  
    );
  }

export default NotLoginPopup;

const styles = StyleSheet.create({})