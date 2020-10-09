import React from 'react';

import GlobalStyle from './styles/GlobalStyle';
import './App.css';

import Providers from './hooks';

import Routes from './routes/index';

function App() {
  return (
    <Providers>
      <Routes />
      <GlobalStyle />
    </Providers>
  );
}

export default App;
