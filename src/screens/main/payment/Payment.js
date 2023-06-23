import React, {useState} from 'react';
import {
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {GlobalStyle, Font, Window, Color} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {RadioButton} from 'react-native-paper';
import PaymentData from './PaymentDetails';
import styles from './PaymentStyle';
import {useBackButton} from '../../../hooks';

const PaymentDetails = ({item, setRadioState, radioState}) => {
  const RadioClick = itemID => {
    setRadioState(itemID);
  };

  return (
    <View
      style={{
        justifyContent: 'space-between',
        backgroundColor: Color.light,
        paddingVertical: 15,
        borderColor: Color.grey,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.icon}
        <Text style={{...styles.Heading}}>{item.text}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {item.wallet && (
          <Text
            style={{
              fontFamily: Font.Urbanist_Bold,
              fontSize: 16,
              color: Color.secondary,
              lineHeight: 22.4,
              paddingRight: 16,
            }}>
            {item.wallet}
          </Text>
        )}

        <RadioButton
          uncheckedColor={Color.primary}
          color={Color.primary}
          value="first"
          status={radioState == item.id ? 'checked' : 'unchecked'}
          onPress={() => RadioClick(item.id)}
        />
      </View>
    </View>
  );
};

const Payment = ({route, navigation}) => {
  const [radioCheck, setRadioCheck] = useState();
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
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Payment Methods</Text>
        }
      />
      <ScrollView>
        <View>
          {PaymentData.map((item, i) => (
            <PaymentDetails
              item={item}
              key={i}
              radioState={radioCheck}
              setRadioState={setRadioCheck}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Color.limeGreen,
            alignItems: 'center',
            padding: 20,
            marginTop: 25,
            borderRadius: 100,
          }}>
          <Text style={{color: Color.primary, fontSize: 16, fontWeight: '600'}}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={GlobalStyle.BottomButtonContainer}>
        <Button
          text="Apply"
          icon="mail"
          isIcon={false}
          theme="primary"
          navLink="BottomTabScreen"
        />
      </View>
    </SafeAreaView>
  );
};

export default Payment;
