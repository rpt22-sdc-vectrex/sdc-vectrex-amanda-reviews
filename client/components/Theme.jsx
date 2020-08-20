/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    dark_gray: '#222222',
    middle_gray: '#595959',
    light_gray: '#b1b1b1',
  },
  fonts: ['Roboto', 'Merriweather'],
  fontSizes: [13, 14, 16, 26],
  fontWeight: [300, 400, 600],
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
