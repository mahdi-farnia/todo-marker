import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { reduxStore } from './store';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/800.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
