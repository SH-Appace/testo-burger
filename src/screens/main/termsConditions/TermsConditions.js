import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, Font, GlobalStyle, Window} from '../../../globalStyle/Theme';
import AppBar from '../../../components/AppBar';

const TermsConditions = () => {
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
          <Text style={GlobalStyle.AppCenterTextStyle}>Terms & Conditions</Text>
        }
      />
      <Text style={styles.sectionSubHeading}>Last updated: 12 Oct, 2023</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Welcome to Testo Burger, a mobile application dedicated to providing a
          delightful dining experience. By using our app, you agree to comply
          with and be bound by the following terms and conditions. If you
          disagree with any part of these terms, please do not use our app.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Account Registration
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Account Creation:</Text> To access certain
          features of the app, you may be required to create an account. You
          agree to provide accurate, current, and complete information during
          the registration process.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Account Security:</Text>You are responsible
          for maintaining the confidentiality of your account credentials and
          for all activities that occur under your account. Notify us
          immediately if you suspect any unauthorized use of your account.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Use of the App
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>License:</Text> Testo Burger grants you a
          limited, non-exclusive, and non-transferable license to use the app
          for personal and non-commercial purposes.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Prohibited Activities:</Text>You agree not
          to engage in any unauthorized or prohibited activities, including but
          not limited to: {'\n'}1 ) Attempting to interfere with the proper
          functioning of the app.
          {'\n'}2 ) Using the app for any illegal or unauthorized purpose.
          {'\n'}3 ) Violating any local, state, national, or international law.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Content
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>User-Generated Content:</Text> You may have
          the opportunity to submit reviews, comments, or other content. By
          submitting content, you grant Testo Burger a worldwide, royalty-free,
          irrevocable, and sublicensable right to use, reproduce, modify, adapt,
          publish, translate, and distribute the content.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Content Removal:</Text> Testo Burger
          reserves the right to remove any content that violates these terms or
          is deemed inappropriate without notice.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Reservation and Ordering
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Reservation Accuracy:</Text> When making a
          reservation, you agree to provide accurate and current information.
          Testo Burger is not responsible for any inaccuracies in reservation
          details.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Payment:</Text> Payment for orders and
          reservations is processed through secure third-party services. Testo
          Burger is not responsible for any errors or security breaches related
          to payment processing.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Limitation of Liability
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Disclaimer:</Text> The app is provided "as
          is" without any warranties, expressed or implied. Testo Burger does
          not guarantee the accuracy, completeness, or timeliness of the app's
          content.
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Limitation of Liability:</Text> Testo
          Burger and its affiliates shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages arising out of
          or in connection with your use of the app.
        </Text>

        <Text style={[styles.label, {fontSize: 18, color: Color.tertiary}]}>
          Changes to Terms and Conditions
        </Text>
        <Text style={styles.text}>
          We may update these terms and conditions at any time without prior
          notice. Continued use of the app after any modifications constitutes
          acceptance of the updated terms.
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

export default TermsConditions;

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
