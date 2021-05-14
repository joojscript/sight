import { Button } from '@chakra-ui/button';
import { Center, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <Center minHeight="100vh" minWidth="100vw">
    <Container>
      <Col style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
      >
        <Heading size="4xl">👁️‍🗨️</Heading>
        <Heading size="3xl" style={{ fontFamily: 'Raleway' }}>Sight</Heading>
        <Text fontSize="20">Data visualization made easy</Text>
      </Col>
      <Row>
        <Col>
          <Button onClick={() => { document.location.href = 'https://github.com/joojscript'; }} colorScheme="twitter">About the creator</Button>
        </Col>
        <Col>
          <Link to="/visualization"><Button colorScheme="facebook">Visualize</Button></Link>
        </Col>
      </Row>
    </Container>
  </Center>
);

export default Home;
