import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '../core/Icon';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../globalStyle/Theme';
import {useSelector} from 'react-redux';
import {RadioButton} from 'react-native-paper';

const CheckOutSelectBranch = ({branchId, setBranchId, setSelectedBranch}) => {
  const {branch} = useSelector(state => ({...state}));

  return (
    <View style={styles.container}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Text style={styles.headingBox}>Select Branch</Text>
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
  );
};

export default CheckOutSelectBranch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.light,
    padding: 15,
    marginTop: 20,
    borderRadius: BorderRadius,
    marginHorizontal: Window.fixPadding * 2,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 1,
    marginVertical: 10,
  },
  headingBox: {
    fontSize: 20,
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
  iconCircle: {height: 30, width: 30, borderRadius: 30},
  headingRow: {
    lineHeight: 19.6,
    color: Color.tertiary,
    fontSize: 16,
    fontFamily: Font.Urbanist_Medium,
  },
  subHeadingRow: {
    lineHeight: 19.6,
    color: Color.lightGray,
    fontSize: 14,
    fontFamily: Font.Urbanist_Medium,
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
      style={styles.rowItem}>
      {
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => openGoogleMaps(item.address)}>
            <Icon
              iconFamily={'Entypo'}
              name={'location-pin'}
              size={25}
              color={Color.primary}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headingRow}> {item.name} </Text>
            <Text style={styles.subHeadingRow}>
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
