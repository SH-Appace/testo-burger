import { StyleSheet } from "react-native"
import { Color, Font, Window } from "../../../globalStyle/Theme"

const styles = StyleSheet.create({
    goalContainer: {
        padding: 10,
        borderRadius: 25,
        marginVertical: 17,
        borderWidth: 2,
        borderColor: Color.primary,
        marginHorizontal: Window.fixPadding,
    },
    goalsTextStyle: {
        color: Color.primary,
        fontSize: 16,
        lineHeight: 22.4,
        fontFamily: Font.Urbanist_SemiBold,
    },
    Heading: {
        lineHeight: 24,
        fontSize: 20,
        alignItem: 'center',
        color: Color.secondary,
        fontFamily: Font.Urbanist_Bold,
    },
})

export default styles;