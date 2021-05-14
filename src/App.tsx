import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import Routes from 'routes';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
}

export default App;
