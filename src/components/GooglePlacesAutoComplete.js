import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Color, Font} from '../globalStyle/Theme';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';
import {google_api_key} from '../utils/googleCloudApi';

const GooglePlacesInput = ({
  setInitialRegion,
  setLocationPlace,
  mapViewRef,
  bottomSheetRef,
  goToPrevSlide,
  setRoad,
  setAddress,
}) => {
  return (
    <GooglePlacesAutocomplete
      keyboardShouldPersistTaps="always"
      textInputProps={{
        placeholderTextColor: 'rgba(158, 158, 158, 1)',
        returnKeyType: 'search',
        onFocus: () => bottomSheetRef.current.snapToIndex(1),
      }}
      placeholder="Search"
      onPress={(data, details = null) => {
        bottomSheetRef.current.snapToIndex(0);
        mapViewRef.current.animateCamera({
          center: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        });
        setInitialRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
        Geocoder.from({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
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
        goToPrevSlide();
      }}
      query={{
        key: google_api_key,
        language: 'en',
      }}
      styles={styles}
      onFail={error => console.log(error)}
      onNotFound={() => console.log('no results')}
      fetchDetails={true}
      enablePoweredByContainer={false}
      returnKeyType={'search'}
      keepResultsAfterBlur={true}
      renderRightButton={() => (
        <Ionicons
          name="location-sharp"
          style={{color: Color.secondary, fontSize: 24}}
        />
      )}
      listEmptyComponent={() => (
        <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 25}}>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: Font.Urbanist_Medium,
            }}>
            No results were found
          </Text>
        </View>
      )}
    />
  );
};

export default GooglePlacesInput;

const styles = {
  container: {
    flex: 1,
  },
  textInputContainer: {
    backgroundColor: '#F5F5F5',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textInput: {
    color: 'black',
    fontSize: 14,
    backgroundColor: '#F5F5F5',
  },
  listView: {
    marginTop: 10,

    borderRadius: 20,
  },
  row: {
    padding: 13,
    height: 44,
    color: '#000',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {
    color: '#000',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
};
