import { ThemeOverride, extendTheme } from '@chakra-ui/react';
import { Button, Input, Tabs, Tooltip, Menu, Text, iosColor, mode } from './app.style';

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: mode('#f4f4f4', '#1b1b1b')(props)
      },
      '[lang=fa]': {
        fontFamily: ['Vazir', 'sans-serif'].join(','),
        direction: 'rtl'
      },
      '[contenteditable]': {
        outline: 'none'
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
    Tooltip,
    Menu,
    Text
  },
  colors: {
    ios: iosColor
  },
  config: {
    useSystemColorMode: true
  }
} as ThemeOverride);
