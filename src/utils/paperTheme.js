import {Color} from '../globalStyle/Theme';
import {fonts} from './paperFontsTheme';

export const theme = {
  roundness: 2,

  colors: {
    primary: Color.primary,
    onPrimaryContainer: Color.light,
    primaryContainer: Color.primary,
    secondaryContainer: Color.primary,
    outline: Color.primary,
    onPrimary: Color.light,
    accent: Color.tertiary,
    backdrop: Color.tertiary,
    background: Color.tertiary,
    text: Color.light,
    placeholder: Color.light,
    onSurface: Color.light,
    onSurfaceVariant: Color.light,
    disabled: Color.light,
    surface: Color.tertiary,
  },
  fonts: fonts,
};
