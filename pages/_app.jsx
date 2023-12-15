import { ThemeProvider } from 'styled-components';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from '../components/Alert';

import defaultTheme, { lightTheme, darkTheme } from '../styles/theme';
import GlobalStyle from '../styles/global';
import '../styles/tailwind.css';
import { NextUIProvider } from '@nextui-org/react';

const options = {
  // you can also just use "bottom center"
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use "scale"
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }) {
  const isDark = false;
  const temaPrincipal = isDark
    ? { ...defaultTheme, ...darkTheme }
    : { ...defaultTheme, ...lightTheme };

  return (
    <ThemeProvider theme={temaPrincipal}>
      <NextUIProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <GlobalStyle />
          <Component {...pageProps} />
        </AlertProvider>
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default MyApp;
