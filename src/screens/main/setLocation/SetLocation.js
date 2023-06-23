import {
  FlatList,
  Keyboard,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../../components/AppBar';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Button from '../../../components/Button';
import Geolocation from 'react-native-geolocation-service';
import GooglePlacesInput from '../../../components/GooglePlacesAutoComplete';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import {useMemo} from 'react';
import TextField from '../../../components/TextFeild';
import {AddressSvg, PencilSvg} from '../../../assets/svgs/DrawerSvgs';
import Geocoder from 'react-native-geocoding';
import Icon from '../../../core/Icon';
import {addNewAddress, editAddress} from '../../../apis/location';
import {SkypeIndicator} from 'react-native-indicators';
import {showMessage} from 'react-native-flash-message';
import {useBackButton} from '../../../hooks';

const SetLocation = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [locationPlace, setLocationPlace] = useState(null);
  const [floor, setFloor] = useState('');
  const [road, setRoad] = useState('');
  const [house, setHouse] = useState('');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [label, setLabel] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  const ref = useRef();
  const dispatch = useDispatch();
  const mapViewRef = useRef(null);
  const {auth} = useSelector(state => ({...state}));

  useEffect(() => {}, []);
  const requestLocationPermission = async () => {
    try {
      if (route.params.edit) {
        const item = route.params.item;
        setAddress(item.address);
        setLabel(item.address_type);
        setRoad(item.road);
        setFloor(item.floor);
        setHouse(item.house);
        const timer = setTimeout(async () => {
          mapViewRef.current.animateCamera({
            center: {
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            },
          });
          setInitialRegion({
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          });
          setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              mapViewRef.current.animateCamera({
                center: {
                  latitude: position.coords.latitude,

                  longitude: position.coords.longitude,
                },
              });
              setInitialRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              Geocoder.from({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
                .then(json => {
                  setLocationPlace(json.results[0]);
                  setAddress(json.results[0].formatted_address);
                  setRoad(
                    json.results[0].address_components[0].long_name +
                      ' ' +
                      json.results[0].address_components[1].long_name,
                  );
                  setLoading(false);
                })
                .catch(error => console.warn(error));
            },
            error => {
              console.log(error.message.toString());
            },
            {
              showLocationDialog: true,
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 0,
            },
          );
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //BottomSheet
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['40%', '80%'], []);

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / Window.width);
    setCurrentSlideIndex(currentIndex);
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (currentSlideIndex === 1) {
      return;
    }
    if (nextSlideIndex != 2) {
      const offset = nextSlideIndex * Window.width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  const goToPrevSlide = () => {
    const nextSlideIndex = currentSlideIndex - 1;
    if (currentSlideIndex === 0) {
      return;
    }
    if (nextSlideIndex != 2) {
      const offset = nextSlideIndex * Window.width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const submitHandler = () => {
    if (label === '') {
      return showMessage({
        message: 'Please enter a label!',
        type: 'danger',
      });
    }
    if (address === '') {
      return showMessage({
        message: 'Please enter an address!',
        type: 'danger',
      });
    }
    if (road === '') {
      return showMessage({
        message: 'Please enter a road!',
        type: 'danger',
      });
    }
    if (route.params.edit) {
      editAddress(
        {
          contact_person_name: auth.user.name,
          contact_person_number: auth.user.phone,
          address_type: label,
          address: address,
          floor: floor,
          road: road,
          house: house,
          longitude: initialRegion.longitude,
          latitude: initialRegion.latitude,
          address_note: instructions,
        },
        auth.token,
        route.params.item.id,
        setLoading,
        () => navigation.goBack(),
      );
    } else {
      addNewAddress(
        {
          contact_person_name: auth.user.name,
          contact_person_number: auth.user.phone,
          address_type: label,
          address: address,
          floor: floor,
          road: road,
          house: house,
          longitude: initialRegion.longitude,
          latitude: initialRegion.latitude,
          address_note: instructions,
        },
        auth.token,
        setLoading,
        () =>
          route.params.fromProfile
            ? navigation.replace('DrawerNavigator')
            : navigation.goBack(),
        dispatch,
      );
    }
  };
  const onBackPress = () => {
    navigation.goBack();
    return true;
  };
  useBackButton(navigation, onBackPress);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={loading ? '#555555' : Color.light}
        barStyle={loading ? 'light-content' : 'dark-content'}
        showHideTransition={'fade'}
      />
      <View
        style={{
          paddingHorizontal: Window.fixPadding * 2,
          backgroundColor: Color.light,
        }}>
        <AppBar
          center={
            <Text style={GlobalStyle.AppCenterTextStyle}>
              Set Your Location
            </Text>
          }
          right={
            <Text
              onPress={() => navigation.replace('DrawerNavigator')}
              style={{color: Color.primary, fontFamily: Font.Urbanist_Medium}}>
              {route.params.fromProfile && 'Skip'}
            </Text>
          }
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 0.6}}
        ref={mapViewRef}
        showsCompass={false}
        onLayout={() => {
          mapViewRef.current.animateCamera({
            pitch: 90,
          });
        }}
        initialRegion={{
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          onP
          onDragEnd={e => {
            setInitialRegion({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            Geocoder.from({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
              .then(json => {
                setLocationPlace(json.results[0]);
                setAddress(json.results[0].formatted_address);
                setRoad(
                  json.results[0].address_components[0].long_name +
                    ' ' +
                    json.results[0].address_components[1].long_name,
                );
              })
              .catch(error => console.warn(error));
          }}
          coordinate={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          }}
        />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}>
        <FlatList
          keyboardShouldPersistTaps="always"
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          data={[1, 2]}
          horizontal
          snapToAlignment="start"
          decelerationRate={'fast'}
          scrollEnabled={false}
          snapToInterval={Window.width}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          renderItem={({item}) => (
            <Slide
              item={item}
              locationPlace={locationPlace}
              setLocationPlace={setLocationPlace}
              address={address}
              setAddress={setAddress}
              floor={floor}
              road={road}
              house={house}
              instructions={instructions}
              label={label}
              setFloor={setFloor}
              setRoad={setRoad}
              setHouse={setHouse}
              setInstructions={setInstructions}
              setLabel={setLabel}
              goToNextSlide={goToNextSlide}
              goToPrevSlide={goToPrevSlide}
              mapViewRef={mapViewRef}
              setInitialRegion={setInitialRegion}
              bottomSheetRef={bottomSheetRef}
              route={route}
            />
          )}
        />
      </BottomSheet>
      {isKeyboardVisible !== true && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 20,
            right: 20,
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
            paddingTop: 25,
            paddingBottom: 25,
            backgroundColor: Color.light,
          }}>
          <Button
            text="Continue"
            isIcon={false}
            theme="primary"
            onPressFunc={() => {
              submitHandler();
            }}
          />
        </View>
      )}
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

export default SetLocation;

const styles = StyleSheet.create({});

const Slide = ({
  item,
  locationPlace,
  setLocationPlace,
  setAddress,
  address,
  setLabel,
  label,
  setFloor,
  floor,
  road,
  house,
  instructions,
  setRoad,
  setHouse,
  setInstructions,
  goToNextSlide,
  goToPrevSlide,
  mapViewRef,
  setInitialRegion,
  bottomSheetRef,
  route,
}) => {
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        width: Window.width,
        paddingHorizontal: 20,
      }}>
      {item === 1 ? (
        <View style={{height: '100%'}}>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Bold,
              fontSize: 20,
              textAlign: 'center',
              marginTop: 15,
              marginBottom: 25,
            }}>
            {route.params.edit ? 'Edit Address' : 'Add New Address'}
          </Text>
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                height: 56,
                borderRadius: 16,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View
                style={{
                  height: 56,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AddressSvg color={Color.primary} />
                <Text
                  style={{
                    color: Color.secondary,
                    fontSize: 16,
                    fontFamily: Font.Urbanist_Regular,
                    marginLeft: 10,
                  }}>
                  {route.params.edit
                    ? road
                    : locationPlace !== null &&
                      locationPlace.address_components[0].long_name +
                        ' ' +
                        locationPlace.address_components[1].long_name}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 56,
                  width: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  goToNextSlide();
                }}>
                <PencilSvg color={Color.primary} />
              </TouchableOpacity>
            </View>
            <TextField
              multiline={true}
              placeholder="Address"
              blurOnSubmit={true}
              onChanged={setAddress}
              value={address}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <View style={{flex: 1, marginRight: 0}}>
                <TextField
                  placeholder="Label"
                  onChanged={setLabel}
                  // icon="account"
                  value={label}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <TextField
                  placeholder="Floor"
                  onChanged={setFloor}
                  // icon="account"
                  value={floor}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <View style={{flex: 1, marginRight: 0}}>
                <TextField
                  placeholder="Road"
                  onChanged={setRoad}
                  // icon="account"
                  value={road}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <TextField
                  placeholder="House / Building"
                  onChanged={setHouse}
                  // icon="account"
                  value={house}
                />
              </View>
            </View>
            <TextField
              multiline={true}
              placeholder="(Optional) Delivery instructions to the rider"
              blurOnSubmit={true}
              onChanged={setInstructions}
              // icon="account"
              value={instructions}
            />
          </ScrollView>
        </View>
      ) : (
        <View style={{height: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              marginBottom: 25,
            }}>
            <TouchableOpacity
              onPress={() => goToPrevSlide()}
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                iconFamily={'AntDesign'}
                name="close"
                size={20}
                color={Color.secondary}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: Color.secondary,
                fontFamily: Font.Urbanist_Bold,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Search an Address
            </Text>
            <View style={{height: 40, width: 40}} />
          </View>
          <GooglePlacesInput
            ref={target => (popupRef = target)}
            setInitialRegion={setInitialRegion}
            mapViewRef={mapViewRef}
            bottomSheetRef={bottomSheetRef}
            goToPrevSlide={goToPrevSlide}
            setRoad={setRoad}
            setAddress={setAddress}
            setLocationPlace={setLocationPlace}
          />
        </View>
      )}
    </View>
  );
};
