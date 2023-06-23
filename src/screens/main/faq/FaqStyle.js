import { StyleSheet } from 'react-native';
import { Color, Window, Font } from '../../../globalStyle/Theme';

const styles = StyleSheet.create({
    goalContainer: {
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Color.primary,
        width: 99,
        height: 38,
        justifyContent: 'center'
    },
    goalsTextStyle: {
        color: Color.primary,
        fontSize: 16,
        fontFamily: Font.Urbanist_SemiBold,
        lineHeight: 22.4,
    },
});
export default styles;
