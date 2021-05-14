/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import { Point } from '@types';
import { Button } from '@chakra-ui/button';
import { Fade } from '@chakra-ui/transition';
import { Input } from '@chakra-ui/input';
import { useDisclosure } from '@chakra-ui/hooks';
import { Container, Col, Row } from 'react-grid-system';

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
    console.log({ sorted, range: range(sorted[0] || 0, sorted[-1] || sorted[0] || 0) });
    engine.runBaseFunction(range(sorted[0] || 0, sorted[sorted.length - 1] || sorted[0] || 0));
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
            <h1>
              Linear Regression
              {' '}
              {JSON.stringify(points)}
            </h1>
          </Row>
          <Row>
            <Button colorScheme={isOpen ? 'green' : 'twitter'} onClick={isOpen ? () => { setPoints([...points, { x: Number(xInputValue), y: Number(yInputValue) }]); onToggle(); } : () => onToggle()}>{isOpen ? 'Add Point' : 'Click Me'}</Button>
            <Fade in={isOpen}>
              <Input
                placeholder="X value"
                rounded="md"
                shadow="md"
                type="number"
                onChange={(e: any) => setXInputValue(e.target.value)}
              />
            </Fade>
            <Fade in={isOpen}>
              <Input
                placeholder="Y value"
                rounded="md"
                shadow="md"
                type="number"
                onChange={(e: any) => setYInputValue(e.target.value)}
              />
            </Fade>
          </Row>
          <Row>
            <Line type="line" data={data} options={options} height={3} width={13} />
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default LinearRegression;
