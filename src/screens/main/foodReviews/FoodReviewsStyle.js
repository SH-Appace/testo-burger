import React from "react";
import { StyleSheet } from "react-native";
import { GlobalStyle, Color, Window, Font } from "../../../globalStyle/Theme";

const styles = StyleSheet.create({
    starIconStyle: {
        color: Color.orange,
        width: 20, height: 19
    },
    starIcon: {
        fontSize: 16,
        color: Color.orange,
        paddingRight: 10,
    },
    Heading: {
        lineHeight: 22.4,
        fontSize: 16,
        color: Color.secondary,
        fontFamily: Font.Urbanist_Bold,
    },
    goalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 7,
        borderWidth: 2,
        borderColor: Color.primary,
        width: 118,
        height: 38.
    },
    goalsTextStyle: {
        color: Color.primary,
        fontSize: 16,
        fontFamily: Font.Urbanist_SemiBold,
        lineHeight: 22.4
    },
    num: {
        color: Color.secondary,
        fontSize: 12,
        fontFamily: Font.Urbanist_Medium,
        paddingHorizontal: 10,
        lineHeight: 14.4,
    },
    days: {
        color: Color.greyscale,
        fontSize: 12,
        fontFamily: Font.Urbanist_Medium,
        lineHeight: 14.4,
    }
})
export default styles;