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
import ReservationCard from '../../../components/ReservationCard';
import EmptyDataComp from '../../../components/EmptyDataComp';

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
          {data?.length > 0 ? (
            data.map((x, i) => <ReservationCard x={x} />)
          ) : (
            <EmptyDataComp text="You do not have a reservation at this time" />
          )}
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
