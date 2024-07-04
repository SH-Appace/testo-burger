import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {
  BorderRadius,
  Color,
  Font,
  GlobalStyle,
  Window,
} from '../../../globalStyle/Theme';
import {getBookings} from '../../../apis/bookATable';
import {useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {PendingSvg} from '../../../assets/svgs/ReservationSvgs';

const Reservation = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    getBookings(setLoading, auth.token, setData);
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#F9F9F9', flex: 1}}>
      <View style={{marginHorizontal: Window.fixPadding * 2}}>
        <AppBar
          center={
            <Text style={GlobalStyle.AppCenterTextStyle}>Reservations</Text>
          }
        />
      </View>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={GlobalStyle.Container}>
          {data.map((x, i) => {
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
                              x.status === 'Pending'
                                ? '#EF7F01'
                                : Color.primary,
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
          })}
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
          <SkypeIndicator size={50} color={Color.secondary} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Reservation;

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
  buttonTextStlye: {
    fontSize: 14,
    fontFamily: Font.Urbanist_SemiBold,
    color: Color.primary,
    lineHeight: 19.6,
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
  BasicHeading: {
    fontSize: 20,
    color: Color.tertiary,
    fontFamily: Font.Urbanist_Bold,
  },
  lineStyle: {
    color: Color.greyscale,
  },
  priceStyle: {
    color: Color.primary,
    fontSize: 20,
    fontFamily: Font.Urbanist_Bold,
    lineHeight: 24,
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
});
