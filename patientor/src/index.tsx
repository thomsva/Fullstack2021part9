import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from "./state";
import { ThemeProvider, Theme, StyledEngineProvider, createTheme } from '@mui/material/styles';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme();

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
    < StateProvider reducer={reducer}>
        <App />
      </StateProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);
