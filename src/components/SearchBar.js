import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BorderRadius, Color, Font} from '../globalStyle/Theme';

const SearchBar = ({setOpenSearch}) => {
  return (
    <TouchableOpacity style={styles.bar} onPress={() => setOpenSearch(true)}>
      <MaterialCommunityIcons color={'#BDBDBD'} name={'magnify'} size={23} />
      <Text style={styles.text}>What are you craving?</Text>
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  bar: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.light,
    height: 56,
    borderRadius: BorderRadius,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    color: '#BDBDBD',
    fontFamily: Font.Urbanist_SemiBold,
    fontSize: 14,
    marginLeft: 10,
  },
});
