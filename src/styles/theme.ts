import { ThemeOverride, extendTheme } from '@chakra-ui/react';
import { Button, Input, Tabs, Tooltip, iosColor, mode } from './ios.style';

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: mode('#f4f4f4', '#1b1b1b')(props)
      },
      '[lang=fa]': {
        fontFamily: ['Vazir', 'sans-serif'].join(','),
        direction: 'rtl'
      }
    })
  },
  fonts: {
    body: ['Montserrat', 'sans-serif'].join(','),
    heading: ['Montserrat', 'sans-serif'].join(',')
  },
  components: {
    Input,
    Button,
    Tabs,
    Tooltip
  },
  colors: {
    ios: iosColor
  },
  config: {
    useSystemColorMode: true,
    initialColorMode: 'system'
  }
} as ThemeOverride);
