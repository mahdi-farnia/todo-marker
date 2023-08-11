import { StyleFunctionProps, defineStyleConfig } from '@chakra-ui/react';

export const iosColor: Record<string, string> = {
  primary: '#3478f6',
  light: 'white',
  dark: '#202020'
};

export const Input = defineStyleConfig({
  variants: {
    ios: (props) => ({
      field: {
        border: 'none',
        bgColor: mode('ios.light', 'ios.dark')(props)
      }
    })
  }
});

export const Button = defineStyleConfig({
  variants: {
    ios: (props) => ({
      color: 'ios.primary',
      bgColor: mode('ios.light', 'ios.dark')(props)
    })
  }
});

export const Tabs = defineStyleConfig({
  variants: {
    ios: (props) => ({
      tab: {
        bgColor: mode('white', '#000')(props),
        fontWeight: 'semibold',
        rounded: 'md',
        color: mode('blackAlpha.500', 'whiteAlpha.500')(props),
        _selected: {
          color: mode('black', 'white')(props)
        }
      }
    })
  }
});

export const Tooltip = defineStyleConfig({
  variants: {
    ios: (props) => ({
      bgColor: mode('ios.dark', 'ios.light')(props)
    })
  }
});

export const Menu = defineStyleConfig({
  variants: {
    ios: (props) => ({
      list: {
        fontSize: 'smaller',
        bgColor: mode('ios.light', 'ios.dark')(props),
        rounded: 'lg'
      },
      item: {
        bgColor: 'transparent',
        _focus: {
          color: 'ios.primary',
          bgColor: mode('blackAlpha.100', 'whiteAlpha.100')(props)
        }
      }
    })
  }
});

export const Text = defineStyleConfig({
  variants: {
    markdown: (props) => ({
      bgColor: mode('ios.light', 'ios.dark')(props),
      rounded: 'md',
      px: 1.5,
      py: 1
    }),
    markdown_input: (props) => ({
      borderBottom: '1px solid',
      borderBottomColor: mode('blackAlpha.300', 'whiteAlpha.300')(props),
      pl: 10,
      py: 1
    }),
    code: (props) => ({
      px: 1.5,
      py: 1,
      rounded: 'md',
      bgColor: mode('rgb(218, 235, 255)', 'rgb(30, 40, 51)')(props) // TODO change BG
    })
  }
});

export function mode(light: string, dark: string) {
  return (props: StyleFunctionProps) => (props.colorMode === 'light' ? light : dark);
}
