import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView
      style={[
        {...GlobalStyle.Container},
        {
          backgroundColor: Color.light,
        },
      ]}>
      <AppBar
        center={
          <Text style={GlobalStyle.AppCenterTextStyle}>Privacy Policy</Text>
        }
      />
      <Text style={styles.sectionSubHeading}>Last updated: 12 Oct, 2023</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Welcome to Testo Burger, a mobile application dedicated to providing a
          delightful dining experience. This Privacy Policy outlines how we
          collect, use, disclose, and protect your personal information when you
          use our mobile app.
        </Text>
        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Information We Collect
        </Text>
        <Text style={styles.label}>Personal Information:</Text>

        <Text style={styles.text}>
          <Text style={styles.label}>1 ) </Text> When you create an account, we
          may collect your name, email address, and phone number.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>2 ) </Text>If you make a reservation, we
          may collect details such as the number of guests and special requests.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Location Information:</Text> We may collect
          your device's precise location with your consent to provide
          location-based services like finding nearby Testo Burger locations.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Usage Information:</Text> We gather
          information about how you interact with our app, including pages
          visited, features used, and time spent on the app.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Device Information:</Text> We may collect
          information about your device, including the device type, operating
          system, and unique device identifiers.
        </Text>
        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          How We Use Your Information
        </Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Providing Services:</Text> We use your
          personal information to create and manage your Testo Burger account,
          process reservations, and enhance your overall dining experience.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Communication:</Text> We may send you
          emails or push notifications to provide updates, promotions, and
          information related to your account and dining preferences.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Improving our Services:</Text> Your usage
          information helps us analyze app performance, troubleshoot issues, and
          enhance the functionality of Testo Burger.
        </Text>
        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Information Sharing
        </Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Third-Party Service Providers:</Text> We
          may share your information with third-party service providers to
          facilitate services like payment processing, reservation management,
          and analytics.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Legal Compliance:</Text> We may disclose
          your information if required by law or to protect our rights,
          property, or safety, or the rights, property, or safety of others.
        </Text>
        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Your Choices
        </Text>

        <Text style={styles.text}>
          <Text style={styles.label}>Account Settings:</Text> You can update
          your account information and preferences in the app settings.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Location Services:</Text> You can enable or
          disable location services through your device settings.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Security
        </Text>
        <Text style={styles.text}>
          We implement reasonable security measures to protect your information
          from unauthorized access and disclosure.
        </Text>
        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Changes to this Privacy Policy
        </Text>
        <Text style={styles.text}>
          We may update this Privacy Policy to reflect changes in our practices.
          We will notify you of any material changes through the app or other
          means.
        </Text>
        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Contact Us
        </Text>
        <Text style={styles.text}>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at contact@testoburger.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  sectionSubHeading: {
    fontSize: 16,
    color: '#807F7E',
    fontFamily: Font.Urbanist_Medium,
    marginBottom: 15,
  },
  text: {
    color: Color.tertiary,
    fontSize: 14,
    fontFamily: Font.Urbanist_Regular,
    letterSpacing: -0.3,
    marginVertical: 15,
  },
  label: {
    fontSize: 14,
    color: Color.primary,
    fontFamily: Font.Urbanist_Medium,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginBottom: 3,
  },
});
