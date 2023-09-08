import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, Font} from '../globalStyle/Theme';

const HomeSectionRow = ({title, onPress, altTitle}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.heading}>{title}</Text>
      <Text onPress={onPress} style={styles.altHeading}>
        {altTitle}
      </Text>
    </View>
  );
};

export default HomeSectionRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    color: Color.tertiary,
    lineHeight: 24,
    fontFamily: Font.Urbanist_Bold,
  },
  altHeading: {
    fontSize: 16,
    color: Color.primary,
    fontFamily: Font.Urbanist_Bold,
  },
});
