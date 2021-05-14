import { Button } from '@chakra-ui/button';
import { Center } from '@chakra-ui/layout';
import {
  Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/tabs';
import LinearRegression from 'pages/LinearRegression';
import React from 'react';

const Menu: React.FC = () => (
  <Tabs style={{ minHeight: '100vh', minWidth: '100vw' }} orientation="vertical" isFitted variant="enclosed">
    <TabList mb="1em">
      <Tab>Linear Regression</Tab>
      <Tab>Other</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <LinearRegression />
      </TabPanel>
      <TabPanel>
        <Center style={{ minHeight: '100vh' }}>
          <Button isLoading loadingText="Work In Progress..." />
        </Center>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default Menu;
