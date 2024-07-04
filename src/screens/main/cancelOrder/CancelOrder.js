import React, {useState} from 'react';
import {Text, TextInput, View, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {
  GlobalStyle,
  Font,
  Color,
  BorderRadius,
} from '../../../globalStyle/Theme';
import styles from './CancelOrderStyle';
import {RadioButton} from 'react-native-paper';
import CancelOrderData from './CancelOrderDetails';
import Button from '../../../components/Button';
import {Modal} from 'react-native-paper';
import {cancelAOrder} from '../../../apis/order';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import {useBackButton} from '../../../hooks';

const CancelOptions = ({
  item,
  setRadioState,
  radioState,
  setText,
  setRadioText,
}) => {
  const RadioClick = itemID => {
    setRadioState(itemID);
  };
  return (
    <View
      style={{flexDirection: 'row', paddingBottom: 24, alignItems: 'center'}}>
      <RadioButton
        style={{width: 20, height: 20}}
        uncheckedColor={Color.primary}
        color={Color.primary}
        value="first"
        status={radioState == item.id ? 'checked' : 'unchecked'}
        onPress={() => {
          setText('');
          setRadioText(item.options);
          RadioClick(item.id);
        }}
      />
      <Text
        onPress={() => {
          setText('');
          setRadioText(item.options);
          RadioClick(item.id);
        }}
        style={styles.BasicHeading}>
        {item.options}
      </Text>
    </View>
  );
};

const CancelOrder = ({route, navigation}) => {
  const [radioCheck, setRadioCheck] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [radioText, setRadioText] = useState('');
  const {orderId} = route.params;
  const auth = useSelector(state => state.auth);
  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const containerStyle = {
    backgroundColor: Color.light,
    alignSelf: 'center',
    alevation: 3,
    borderRadius: BorderRadius,
    alignItem: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Cancel Order</Text>
        }
      />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 25}}>
        <Text style={styles.Heading}>
          Please select the reason for cancellation:
        </Text>
        <View style={GlobalStyle.TopBorderStyle}></View>

        {CancelOrderData.map((item, i) => (
          <CancelOptions
            item={item}
            key={i}
            radioState={radioCheck}
            setRadioState={setRadioCheck}
            setRadioText={setRadioText}
            setText={setText}
          />
        ))}
        <Text
          style={{
            ...styles.Heading,
            fontFamily: Font.Urbanist_SemiBold,
            marginBottom: 20,
          }}>
          Others
        </Text>
        <TextInput
          style={{
            backgroundColor: Color.veryLightGray,
            height: 90,
            borderRadius: 16,
            paddingHorizontal: 10,
            color: Color.secondary,
            fontFamily: Font.Urbanist_Light,
          }}
          placeholder="Others reason..."
          placeholderTextColor={Color.lightGray}
          multiline
          value={text}
          onChange={() => {
            if (radioCheck !== '') {
              setRadioCheck(0);
              setRadioText('');
            }
          }}
          onChangeText={setText}
        />
      </ScrollView>

      <View style={GlobalStyle.BottomButtonContainer}>
        <Button
          text="Submit"
          icon="mail"
          isIcon={false}
          theme="primary"
          onPressFunc={() => {
            if (text === '' && radioText === '') {
              return showMessage({
                message: 'Please select a reason.',
                type: 'danger',
              });
            }
            cancelAOrder(
              {
                order_id: orderId,
                reason: radioCheck === 0 ? text : radioText,
              },
              auth.token,
              setLoading,
              showModal,
            );
          }}
        />
      </View>
      <Modal
        theme={{
          colors: {
            backdrop: '#000000AA',
          },
        }}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <View style={{marginHorizontal: 32, borderRadius: BorderRadius}}>
          <View style={{paddingVertical: 20}}>
            <View style={{alignItems: 'center', marginTop: 8}}>
              <Image
                source={require('../../../assets/images/pics/Emoji.png')}
              />
            </View>
            <View
              style={{
                width: 276,
                height: 140,
                alignSelf: 'center',
                marginTop: 32,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: Font.Urbanist_Bold,
                  lineHeight: 28.8,
                  textAlign: 'center',
                  color: Color.primary,
                }}>
                We’re so sad about your cancellation
              </Text>
              <View style={{alignSelf: 'center', marginTop: 16}}>
                <Text
                  style={{
                    ...GlobalStyle.BasicTextStyle,
                    fontSize: 16,
                    textAlign: 'center',
                  }}>
                  We will continue to improve our service & satisfy you on the
                  next order.
                </Text>
              </View>
            </View>
            <View style={{marginTop: 32}}>
              <Button
                theme="primary"
                text="OK"
                onPressFunc={() => navigation.goBack()}
              />
            </View>
          </View>
        </View>
      </Modal>
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
export default CancelOrder;
