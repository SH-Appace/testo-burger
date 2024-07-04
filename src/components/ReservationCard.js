import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../globalStyle/Theme';
import {PendingSvg} from '../assets/svgs/ReservationSvgs';

export default function ReservationCard({x}) {
  const timeString = x.time;
  // Split the time string into hours, minutes, and seconds
  var timeParts = timeString.split(':');

  // Create a new Date object with the current date and the parsed time
  var currentDate = new Date();
  currentDate.setHours(parseInt(timeParts[0], 10));
  currentDate.setMinutes(parseInt(timeParts[1], 10));
  currentDate.setSeconds(parseInt(timeParts[2], 10));
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const [time, amOrPm] = formattedTime.split(' ');
  return (
    <View style={styles.orderBox}>
      <TouchableOpacity
        // onPress={() => {
        //   setPopupData(item.details);
        //   setVisible(true);
        // }}
        style={styles.row}>
        <View
          style={[
            styles.svgBox,
            {
              backgroundColor:
                x.status === 'Pending' ? '#EF7F01' : Color.primary,
            },
          ]}>
          <PendingSvg width={Window.width / 7.5} />
        </View>
        <View>
          <Text style={styles.BasicHeading}>#{x.id}</Text>

          <Text
            style={[
              styles.BottomMoreText,
              {
                marginTop: 5,
                marginBottom: 0,
                width: Window.width / 1.5,
              },
            ]}>
            {x.branch.name}
          </Text>
          <Text
            style={[
              styles.BottomMoreText,
              {
                marginTop: 0,
                marginBottom: 5,
                width: Window.width / 2,
              },
            ]}>
            {new Date(x.date).toDateString()}, {formattedTime}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                styles.statusBox,
                {
                  backgroundColor:
                    x.status === 'Pending' ? '#EF7F01' : Color.primary,
                },
              ]}>
              <Text
                style={[
                  styles.conditionstyle,
                  {color: Color.light, textTransform: 'capitalize'},
                ]}>
                {x.status}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={GlobalStyle.TopBorderStyle} />

      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          //   onPress={() =>
          //     navigation.navigate('CancelOrder', {orderId: item.id})
          //   }
          style={{...styles.selectButtomStyle}}>
          <Text
            style={{
              ...styles.buttonTextStlye,
              color: Color.secondary,
            }}>
            Cancel Reservation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderBox: {
    borderRadius: BorderRadius,
    backgroundColor: Color.light,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 14,
    margin: 1,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  svgBox: {
    height: Window.width / 4.5,
    width: Window.width / 4.5,
    borderRadius: BorderRadius,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomMoreText: {
    fontSize: 14,
    lineHeight: 19.6,
    color: Color.greyscale,
    fontFamily: Font.Urbanist_Medium,
  },
  BasicHeading: {
    fontSize: 20,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_Bold,
  },
  conditionstyle: {
    color: Color.pink,
    fontSize: 10,
    lineHeight: 12,
    fontFamily: Font.Urbanist_SemiBold,
  },
  statusBox: {
    borderRadius: 6,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  TopBorderStyle: {
    with: Window.width,
    height: 1,
    marginVertical: 20,
    backgroundColor: Color.grey,
  },
  selectButtomStyle: {
    borderColor: Color.secondary,
    borderWidth: 2,
    borderRadius: BorderRadius,
    flex: 1,
    alignItems: 'center',
    height: 37,
    marginHorizontal: 12,
    justifyContent: 'center',
  },
  buttonTextStlye: {
    fontSize: 14,
    fontFamily: Font.Urbanist_SemiBold,
    color: Color.primary,
    lineHeight: 19.6,
  },
});
