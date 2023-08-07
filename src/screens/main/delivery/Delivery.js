import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import {
  GlobalStyle,
  Font,
  Window,
  Color,
  BorderRadius,
} from '../../../globalStyle/Theme';
import Icon from '../../../core/Icon';
import {RadioButton} from 'react-native-paper';
import styles from './DeliveryStyle';
import {useEffect} from 'react';
import {delAddress, getAddress} from '../../../apis/location';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {showMessage} from 'react-native-flash-message';
import {updateAddress} from '../../../apis/profile';
import Swipeable from 'react-native-swipeable';
import {useRef} from 'react';
import {useBackButton} from '../../../hooks';

const DeliverTo = ({
  item,
  setRadioState,
  radioState,
  deleteHandler,
  navigation,
}) => {
  const swipeRef = useRef(null);
  const RadioClick = itemID => {
    setRadioState(itemID);
  };
  const leftButtons = [
    <View style={{flexDirection: 'column', flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          swipeRef.current.recenter();
          navigation.navigate('SetLocation', {
            edit: true,
            item: item,
          });
        }}
        style={{
          backgroundColor: Color.primary,
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <View style={{width: 50, alignItems: 'center'}}>
          <Icon
            iconFamily={'MaterialCommunityIcons'}
            name="pencil-minus"
            size={20}
            color={Color.light}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          swipeRef.current.recenter();
          deleteHandler(item.id);
        }}
        style={{
          backgroundColor: '#F6F4F4',
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <View style={{width: 50, alignItems: 'center'}}>
          <Icon
            iconFamily={'MaterialCommunityIcons'}
            name="trash-can-outline"
            size={20}
            color={Color.brightRed}
          />
        </View>
      </TouchableOpacity>
    </View>,
  ];
  return (
    <View
      onPress={() => RadioClick(item.id)}
      style={{
        backgroundColor: Color.light,

        marginTop: 20,
        borderRadius: BorderRadius,

        overflow: 'hidden',
      }}>
      <Swipeable
        ref={swipeRef}
        leftButtons={leftButtons}
        leftButtonWidth={50}
        leftActionActivationDistance={50}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 20,
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '65%'}}>
            <View
              style={{
                backgroundColor: 'rgba(239, 127, 1, 0.08)',
                // padding: 10,
                borderRadius: 100,
                marginRight: 10,
                width: 60,
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: Color.primary,
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  // padding: 10,
                }}>
                <Icon
                  iconFamily={'Ionicons'}
                  name="ios-location-sharp"
                  size={16}
                  color={Color.light}
                />
              </View>
            </View>
            <View style={{}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...styles.Heading}}>{item.address_type}</Text>
                {item.default && (
                  <View
                    style={{
                      backgroundColor: Color.grey,
                      marginLeft: 15,
                      alignItems: 'center',
                      borderRadius: 10,
                      width: 70,
                    }}>
                    <Text
                      style={{
                        color: Color.primary,
                        fontSize: 10,
                        paddingVertical: 5,
                        fontFamily: Font.Urbanist_SemiBold,
                        lineHeight: 12,
                      }}>
                      {item.default}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={{...styles.TextStyle, marginTop: 5}}
                numberOfLines={2}>
                {item.address}
              </Text>
            </View>
          </View>
          <RadioButton
            value="first"
            uncheckedColor={Color.primary}
            color={Color.primary}
            status={radioState == item.id ? 'checked' : 'unchecked'}
            onPress={() => RadioClick(item.id)}
          />
        </View>
      </Swipeable>
    </View>
  );
};

const Delivery = ({route, navigation}) => {
  const [radioCheck, setRadioCheck] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const {auth} = useSelector(state => ({...state}));
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    getAddress(auth.token, setLoading, setDeliveryData);
    setRadioCheck(auth.user.address_id);
  }, [isFocused, refreshData]);

  const submitHandlerApply = () => {
    if (deliveryData.length === 0) {
      return showMessage({
        message: 'Please add a delivery address!',
        type: 'danger',
      });
    }
    if (radioCheck === 0) {
      return showMessage({
        message: 'Please select a delivery address!',
        type: 'danger',
      });
    }
    updateAddress(
      {
        address_id: radioCheck,
      },
      setLoading,
      auth.token,
      dispatch,
      () => navigation.goBack(),
    );
  };
  const deleteHandler = id => {
    delAddress(auth.token, setLoading, id, setRefreshData, refreshData);
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{backgroundColor: '#F9F9F9', flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={loading ? '#555555' : '#F9F9F9'}
        barStyle={loading ? 'light-content' : 'dark-content'}
        showHideTransition={'fade'}
      />
      <View style={{paddingHorizontal: Window.fixPadding * 2}}>
        <AppBar
          center={
            <Text style={GlobalStyle.AppCenterTextStyle}>Deliver to</Text>
          }
        />
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}>
        {deliveryData.map((item, i) => (
          <DeliverTo
            item={item}
            key={i}
            radioState={radioCheck}
            setRadioState={setRadioCheck}
            deleteHandler={deleteHandler}
            navigation={navigation}
          />
        ))}
        <View style={{marginVertical: 20}} />
        <Button
          text="Add New Address"
          isIcon={false}
          theme="secondary"
          onPressFunc={() =>
            navigation.navigate('SetLocation', {
              edit: false,
            })
          }
        />
      </ScrollView>

      <View
        style={[
          GlobalStyle.BottomButtonContainer,
          {paddingHorizontal: Window.fixPadding * 2},
        ]}>
        <Button text="Apply" theme="primary" onPressFunc={submitHandlerApply} />
      </View>

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

export default Delivery;

// const AddAddressPopUp = ({
//   openPopup,
//   setName,
//   name,
//   setLocation,
//   location,
//   floor,
//   setFloor,
//   setRoad,
//   road,
//   setHouse,
//   house,
//   onClosePopup,
//   locationPlace,
//   navigation,
//   address,
//   setAddress,
//   submitHandler,
// }) => {
//   const renderOutsideTouchable = onTouch => {
//     const view = <View style={{flex: 1, width: '100%'}} />;
//     if (!onTouch) {
//       return view;
//     }
//     return (
//       <TouchableWithoutFeedback
//         onPress={onTouch}
//         style={{flex: 1, width: '100%'}}>
//         {view}
//       </TouchableWithoutFeedback>
//     );
//   };

//   return (
//     <Modal
//       animationType="fade"
//       transparent={true}
//       visible={openPopup}
//       onRequestClose={onClosePopup}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: '#000000AA',
//           justifyContent: 'flex-end',
//         }}>
//         {renderOutsideTouchable(onClosePopup)}

//         <View
//           style={{
//             backgroundColor: '#fff',
//             width: '100%',
//             borderTopRightRadius: 44,
//             borderTopLeftRadius: 44,
//             paddingHorizontal: 25,
//             height: Window.height * 0.65,
//           }}>
//           <View style={{flex: 1}}>
//             <Text
//               style={{
//                 color: '#F75555',
//                 fontFamily: Font.Urbanist_Bold,
//                 fontSize: 24,
//                 textAlign: 'center',
//                 marginTop: 35,
//               }}>
//               Add New Address
//             </Text>
//             <View
//               style={{
//                 marginVertical: 24,
//                 height: 1,
//                 width: '100%',
//                 backgroundColor: '#EEEEEE',
//               }}
//             />

//             <TouchableOpacity
//               onPress={() => {
//                 onClosePopup();
//                 navigation.navigate('SetLocation');
//               }}
//               style={{
//                 height: 56,
//                 backgroundColor: 'rgba(250, 250, 250, 1)',
//                 borderRadius: 16,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingHorizontal: 15,
//               }}>
//               <Ionicons
//                 name="location-sharp"
//                 style={{color: Color.secondary, fontSize: 24}}
//               />
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#828282',
//                   letterSpacing: 0.2,
//                   fontFamily: Font.Urbanist_SemiBold,
//                   marginLeft: 5,
//                 }}>
//                 {locationPlace}
//               </Text>
//             </TouchableOpacity>
//             <TextField
//               placeholder="Label"
//               onChanged={setName}
//               icon="account"
//               value={name}
//               blurOnSubmit={true}
//             />
//             <View
//               style={{
//                 flexDirection: 'row',
//                 width: '100%',
//               }}>
//               <View style={{flex: 1, marginRight: 0}}>
//                 <TextField
//                   placeholder="Address"
//                   onChanged={setAddress}
//                   // icon="account"
//                   value={address}
//                 />
//               </View>
//               <View style={{flex: 1, marginLeft: 10}}>
//                 <TextField
//                   placeholder="Floor"
//                   onChanged={setFloor}
//                   // icon="account"
//                   value={floor}
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 width: '100%',
//               }}>
//               <View style={{flex: 1, marginRight: 0}}>
//                 <TextField
//                   placeholder="Road"
//                   onChanged={setRoad}
//                   // icon="account"
//                   value={road}
//                 />
//               </View>
//               <View style={{flex: 1, marginLeft: 10}}>
//                 <TextField
//                   placeholder="House"
//                   onChanged={setHouse}
//                   // icon="account"
//                   value={house}
//                 />
//               </View>
//             </View>

//             <View style={{flex: 1, marginTop: 35}}>
//               <Button
//                 text="Add Address"
//                 isIcon={false}
//                 theme="primary"
//                 onPressFunc={() => {
//                   submitHandler();
//                   onClosePopup();
//                 }}
//               />
//             </View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };
