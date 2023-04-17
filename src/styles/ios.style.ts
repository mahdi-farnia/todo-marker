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

// TODO menu styling
export const Menu = defineStyleConfig({
  variants: {
    ios: (props) => ({})
  }
});

export function mode(light: string, dark: string) {
  return (props: StyleFunctionProps) => (props.colorMode === 'light' ? light : dark);
}
