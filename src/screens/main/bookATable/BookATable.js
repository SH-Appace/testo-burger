import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';
import Icon from '../../../core/Icon';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RadioButton} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';
import {DatePickerModal} from 'react-native-paper-dates';
import Button from '../../../components/Button';
import {Image} from 'react-native';

const BookATable = ({navigation}) => {
  const [quantity, setQuantity] = useState(1);
  const [branchId, setBranchId] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryTimeObject, setDeliveryTimeObject] = useState(null);
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const {cart, auth, branch} = useSelector(state => ({...state}));
  console.log(selectedBranch);
  const decrementValue = name => {
    if (quantity === 1) return;
    setQuantity(prevVal => prevVal - 1);
  };
  const incrementValue = name => {
    if (quantity === 10) return;
    setQuantity(prevVal => prevVal + 1);
  };
  //DATE PICKER
  const onDismissSingle = () => {
    setOpen(false);
    setDeliveryTime('');
    setDeliveryTimeObject(null);
  };

  const onConfirmSingle = params => {
    if (params.date === undefined) {
      return;
    }
    setOpen(false);
    setOpenTime(true);
  };

  // TIME PICKER
  const onDismiss = () => {
    setOpenTime(false);
    setDeliveryTime('');
    setDeliveryTimeObject(null);
  };

  const onConfirm = params => {
    setOpenTime(false);
    const hours = params.hours < 10 ? '0' + params.hours : params.hours;
    const minutes = params.minutes < 10 ? '0' + params.minutes : params.minutes;

    const [year, month, day] = deliveryTime.split('-');
    const dateObject = new Date(year, month - 1, day, hours, minutes, '00');

    setDeliveryTimeObject(dateObject);
    setDeliveryTime(prev => `${prev} ${hours}:${minutes}:00`);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Book A Table</Text>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}>
        <Image
          source={require('../../../assets/images/pics/tableImage.png')}
          style={{alignSelf: 'center', marginVertical: 25}}
          resizeMode="contain"
        />
        <View style={styles.box}>
          <View style={[styles.boxRow, {justifyContent: 'space-between'}]}>
            <Text style={styles.boxHeading}>Select Branch</Text>
            {branchId === '' && (
              <Icon
                iconFamily={'Ionicons'}
                color={Color.primary}
                name="warning"
                size={22}
              />
            )}
          </View>
          <View style={GlobalStyle.TopBorderStyle} />
          {branch[0].map((item, index) => (
            <DeliveryDetails
              branchId={branchId}
              setBranchId={setBranchId}
              setSelectedBranch={setSelectedBranch}
              item={item}
              key={index}
            />
          ))}
        </View>
        {selectedBranch !== null && (
          <View style={styles.box}>
            <Text style={styles.boxHeading}>Reservation Date/Time</Text>
            <View style={GlobalStyle.TopBorderStyle}></View>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[styles.boxRow, {justifyContent: 'space-between'}]}>
              <View style={styles.boxRow}>
                <Icon
                  iconFamily={'MaterialCommunityIcons'}
                  name={'clock'}
                  size={35}
                  color={Color.primary}
                />
                <Text style={[styles.boxText, {marginLeft: 15}]}>
                  {deliveryTimeObject !== null
                    ? deliveryTimeObject.toDateString() +
                      ', ' +
                      deliveryTimeObject.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : 'Select'}
                </Text>
              </View>

              <Icon
                iconFamily={'Entypo'}
                name={'chevron-right'}
                size={20}
                color={Color.primary}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.box}>
          <Text style={styles.boxHeading}>How Many Persons?</Text>
          <View style={GlobalStyle.TopBorderStyle}></View>
          <View style={[styles.boxRow, {justifyContent: 'space-between'}]}>
            <View style={styles.boxRow}>
              <View style={styles.circle}>
                <Icon
                  iconFamily={'Ionicons'}
                  color={Color.light}
                  name="person-add"
                  size={15}
                />
              </View>
              <Text style={styles.boxText}>
                {quantity} Adult{quantity > 1 ? 's' : ''}
              </Text>
            </View>

            <View style={styles.boxRow}>
              <TouchableOpacity
                style={styles.incrementDecrementBtn}
                onPress={() => decrementValue('adult')}>
                <Icon
                  iconFamily={'AntDesign'}
                  name={'minus'}
                  style={styles.minusStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.incrementDecrementBtn,
                  {backgroundColor: Color.primary, marginLeft: 15},
                ]}
                onPress={() => incrementValue('adult')}>
                <Icon
                  iconFamily={'Ionicons'}
                  name={'md-add'}
                  color={Color.light}
                  style={styles.addStyle}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 15}} />
        <Button theme="primary" text="Confirm Now" onPressFunc={() => {}} />
      </ScrollView>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={undefined}
        onConfirm={onConfirmSingle}
        // onConfirm={() => console.log(deliveryTime)}
        onChange={params => {
          const res = new Date(params.date);
          const year = res.getUTCFullYear();
          const month = res.getUTCMonth() + 1; // months are zero-based
          const day = res.getUTCDate();
          setDeliveryTime(
            `${year}-${month < 10 ? '0' : ''}${month}-${
              day < 10 ? '0' : ''
            }${day}`,
          );
        }}
        saveLabel={deliveryTime !== '' ? 'Next' : 'Select date to continue'}
        label={' '}
        editIcon={' '}
        validRange={{startDate: new Date()}}
      />
      <TimePickerModal
        visible={openTime}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={0}
        confirmLabel={'Save'}
      />
    </SafeAreaView>
  );
};

export default BookATable;

const styles = StyleSheet.create({
  boxHeading: {
    fontSize: 20,
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
  box: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: BorderRadius,
  },
  boxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: Color.primary,
    padding: 7.5,
    borderRadius: 50,
    marginRight: 15,
  },
  boxText: {
    lineHeight: 19.6,
    fontSize: 14,
    color: Color.darkGray,
    fontFamily: Font.Urbanist_Medium,
  },
  incrementDecrementBtn: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.primary,
  },

  minusStyle: {
    color: Color.headingSm,
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
  addStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: Font.Urbanist_Black,
  },
});
const DeliveryDetails = ({item, setBranchId, branchId, setSelectedBranch}) => {
  function convertToAMPM(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert 0 to 12 for AM time
    return `${hours12}:${(minutes < 10 ? '0' : '') + minutes} ${ampm}`;
  }
  const openGoogleMaps = address => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    Linking.openURL(mapUrl);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedBranch(item);
        setBranchId(item.id);
      }}
      style={{
        justifyContent: 'space-between',
        margin: 1,
        marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      {
        <View style={styles.boxRow}>
          <TouchableOpacity
            style={{height: 30, width: 30, borderRadius: 30}}
            onPress={() => openGoogleMaps(item.address)}>
            <Icon
              iconFamily={'Entypo'}
              name={'location-pin'}
              size={25}
              color={Color.primary}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.boxText}> {item.name} </Text>
            <Text
              style={{
                ...styles.boxText,
                color: Color.lightGray,
              }}>
              {' '}
              {convertToAMPM(item.opening_time)}
              {' - '}
              {convertToAMPM(item.closeing_time)}
            </Text>
          </View>
        </View>
      }
      <RadioButton.Android
        uncheckedColor={Color.primary}
        color={Color.primary}
        value="first"
        status={branchId === item.id ? 'checked' : 'unchecked'}
        onPress={() => {
          setSelectedBranch(item);
          setBranchId(item.id);
        }}
      />
    </TouchableOpacity>
  );
};
