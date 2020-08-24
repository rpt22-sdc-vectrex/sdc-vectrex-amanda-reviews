/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    darkGray: '#222222',
    middleGray: '#595959',
    lightGray: '#b1b1b1',
  },
  // TODO : make it an object
  fonts: ['Roboto', 'Merriweather'],
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
