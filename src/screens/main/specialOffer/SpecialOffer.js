import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AppBar from '../../../components/AppBar';
import {
  GlobalStyle,
  Color,
  Window,
  Font,
  BorderRadius,
} from '../../../globalStyle/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {couponApply, couponGet} from '../../../apis/coupon';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import Button from '../../../components/Button';
import {Modal} from 'react-native-paper';
import {useBackButton} from '../../../hooks';

const DiscountsDetails = ({item, setLoading, auth, showModal}) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        couponApply(
          {code: item.code},
          auth.token,
          setLoading,
          dispatch,
          showModal,
        );
      }}>
      <ImageBackground
        source={require('../../../assets/images/pics/referBg.jpg')}
        imageStyle={{
          resizeMode: 'cover',
          borderRadius: BorderRadius,
        }}
        style={{
          height: 180,
          marginVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 20,
        }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View
            style={{
              width: Window.width / 2.4,
              // paddingHorizontal: 20,
              height: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomLeftRadius: 20,
            }}>
            <Text style={styles.discount} numberOfLines={1}>
              use to get {item.discount}% off
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const SpecialOffer = ({navigation}) => {
  const [couponData, setCouponData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visiblePlaced, setVisiblePlaced] = useState(false);

  const {auth} = useSelector(state => ({...state}));

  useEffect(() => {
    couponGet(auth.token, setLoading, setCouponData);
  }, []);
  const showModal = () => {
    setVisiblePlaced(true);
  };
  const hideModal = () => {
    setVisiblePlaced(false);
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
          <Text style={GlobalStyle.AppCenterTextStyle}>Special Offers</Text>
        }
      />
      <ScrollView>
        <View style={{marginVertical: 15}}>
          {couponData.map((item, index) => (
            <DiscountsDetails
              item={item}
              key={index}
              showModal={showModal}
              setLoading={setLoading}
              auth={auth}
            />
          ))}
        </View>
      </ScrollView>
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
      <CouponAppliedPopup
        visible={visiblePlaced}
        hideModal={hideModal}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default SpecialOffer;

const CouponAppliedPopup = ({visible, hideModal, navigation}) => {
  return (
    <Modal
      theme={{
        colors: {
          backdrop: '#000000AA',
        },
      }}
      animationType="fade"
      transparent={true}
      visible={visible}
      onDismiss={hideModal}
      // contentContainerStyle={containerStyle}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}>
        <View
          style={{
            height: 443,
            backgroundColor: Color.light,
            borderRadius: 20,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
          }}>
          <Image
            style={{alignSelf: 'center', width: 160, height: 160}}
            source={require('../../../assets/images/pics/SmileEmoji.png')}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: Font.Urbanist_Bold,
              lineHeight: 24,
              textAlign: 'center',
              color: Color.primary,
              marginTop: 20,
            }}>
            Coupon Code Applied
          </Text>
          <View
            style={{
              marginVertical: 25,
              width: 155,
              alignSelf: 'center',
            }}>
            <Text style={{...GlobalStyle.BasicTextStyle, textAlign: 'center'}}>
              Enjoy your discount in the next order :)
            </Text>
          </View>
          <Button
            theme="primary"
            text="OK"
            onPressFunc={() => {
              hideModal();
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  cardTitle: {
    color: Color.light,
    fontSize: 30,
    fontFamily: Font.Urbanist_Black,
    textTransform: 'capitalize',
    width: Window.width / 2.25,
    textAlignVertical: 'center',
  },
  discount: {
    color: Color.secondary,
    fontSize: 14,
    fontFamily: Font.Urbanist_SemiBold,
    textTransform: 'capitalize',
  },
});
