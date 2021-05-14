/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { Point } from '@types';
import { Button, IconButton } from '@chakra-ui/button';
import { Fade } from '@chakra-ui/transition';
import { Input } from '@chakra-ui/input';
import { useDisclosure } from '@chakra-ui/hooks';
import { MinusIcon } from '@chakra-ui/icons';
import { Container, Col, Row } from 'react-grid-system';

import {
  Table, TableCaption, Tbody, Td, Th, Thead, Tr,
} from '@chakra-ui/table';
import { Heading } from '@chakra-ui/layout';
import range from '../../helpers/range';
import engine from './engine';

// import { Container } from './styles';

const LinearRegression: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [points, setPoints] = useState<Point[]>([]);
  const [xInputValue, setXInputValue] = useState<string>();
  const [yInputValue, setYInputValue] = useState<string>();

  useEffect(() => {
    engine.computeResults(points);
    const sorted = points.map((p:Point) => p.x).sort((a, b) => a - b).filter((item, i, self) => self.lastIndexOf(item) === i);
    engine.runBaseFunction(range(Math.ceil(sorted[0]) || 0, Math.ceil(sorted[sorted.length - 1]) || sorted[0] || 0));
  }, [points]);

  const data = {
    labels: points.map((p:Point) => p.x).sort((a, b) => a - b).filter((item, i, self) => self.lastIndexOf(item) === i),
    datasets: [{
      label: 'Regression Line',
      data: engine.lastResults,
      backgroundColor: 'rgba(0, 0, 255, 1)',
      borderColor: 'rgba(0, 0, 255, 1)',
      pointRadius: 0,
      order: 2,
    }, {
      label: 'Points',
      data: points,
      type: 'scatter',
      backgroundColor: 'rgba(255, 0, 0, 1)',
      borderColor: 'rgba(0, 0, 0, 0)',
      // this dataset is drawn on top
      order: 1,
    }],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Container>
        <Col>
          <Row>
            <Heading>Linear Regression</Heading>
          </Row>
          <Row>
            <Line type="line" data={data} options={options} height={3} width={13} />
          </Row>
          <Row>
            <Col>
              <Table variant="simple">
                <TableCaption>Current Points</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Point</Th>
                    <Th isNumeric>X Coordinate</Th>
                    <Th isNumeric>Y Coordinate</Th>
                    <Th>Remove Point</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {points.map((point: Point, index: number) => (
                    <Tr>
                      <Td><b>{`#${index + 1}`}</b></Td>
                      <Td isNumeric>{point.x}</Td>
                      <Td isNumeric>{point.y}</Td>
                      <Td><IconButton aria-label="Remove Point" icon={<MinusIcon />} onClick={() => setPoints(points.filter((_, i: number) => index !== i))} /></Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Col>
            <Col>
              <Col>
                <Button
                  width="full"
                  colorScheme={isOpen ? 'green' : 'twitter'}
                  onClick={isOpen
                    ? () => {
                      setPoints([...points, { x: Number(xInputValue) || 0, y: Number(yInputValue) || 0 }]);
                      onToggle();
                    } : () => onToggle()}
                >
                  {isOpen ? 'Add Point' : 'Click here to add points'}
                </Button>

              </Col>
              <Col>
                <Fade in={isOpen}>
                  <Input
                    style={{ marginTop: 12 }}
                    placeholder="X value"
                    rounded="md"
                    shadow="md"
                    type="number"
                    onChange={(e: any) => setXInputValue(e.target.value ? e.target.value : 0)}
                  />
                </Fade>
                <Fade in={isOpen}>
                  <Input
                    style={{ marginTop: 12 }}
                    placeholder="Y value"
                    rounded="md"
                    shadow="md"
                    type="number"
                    onChange={(e: any) => setYInputValue(e.target.value ? e.target.value : 0)}
                  />
                </Fade>
              </Col>
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default LinearRegression;
