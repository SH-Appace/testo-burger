import React, {useRef, useState} from 'react';
import {View, Text, StatusBar, ScrollView} from 'react-native';
import Button from '../../../components/Button';
import {GlobalStyle, Color, Window, Font} from '../../../globalStyle/Theme';
import styles from '../AuthStyle';
import AppBar from '../../../components/AppBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetStartedSvg} from '../../../assets/svgs/GetStartedSvgs';

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={{...GlobalStyle.Container}}>
      <StatusBar
        translucent
        backgroundColor={Color.light}
        barStyle={'dark-content'}
      />
      <AppBar />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.ImgContainer}>
          <GetStartedSvg height={Window.width / 2} width={Window.width / 2} />
        </View>

        <View style={styles.HeadingContainer}>
          <Text
            style={[
              GlobalStyle.BasicHeading,
              {fontFamily: Font.Urbanist_Bold},
            ]}>
            Let’s you in
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={GlobalStyle.borderStyle}></View>
          <Text
            style={{
              fontFamily: Font.Urbanist_SemiBold,
              fontSize: 18,
              marginHorizontal: 8,
              color: Color.mostDarkGray,
            }}>
            or
          </Text>
          <View style={GlobalStyle.borderStyle}></View>
        </View>

        <View style={{marginBottom: 50}}>
          <Button
            text="Continue with Phone Number"
            icon="mail"
            isIcon={false}
            theme="primary"
            navLink="SignIn"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetStarted;
