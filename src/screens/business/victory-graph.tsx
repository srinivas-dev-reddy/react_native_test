import React, {memo, useEffect, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryArea,
  VictoryAxis,
} from 'victory-native';
import {GRAPH_HEIGHT} from './model';

const getRandomNum = () => Number((Math.random() * 100).toFixed(0));
const VictoryGraph = () => {
  const {width} = useWindowDimensions();
  const getData = () => {
    // const bars = random(6, 10);
    // return range(bars).map(bar => {
    //   return {x: bar + 1, y: random(2, 10)};
    // });

    const l = [];
    for (let i = 0; i < getRandomNum() / 10 + 2; i++) {
      l.push({x: i + 1, y: getRandomNum()});
    }

    return l;
  };

  const [vdata, setVData] = useState(getData());

  useEffect(() => {
    let c = 0;
    const nd = [...vdata];
    const interval = setInterval(() => {
      c += 1;
      //   setVData([...vdata, {x: vdata.length + 1, y: getRandomNum()}]);

      nd.push({x: nd.length + 1, y: getRandomNum()});
      setVData([...nd]);

      if (c > 30) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View>
      <VictoryChart
        domainPadding={{x: 0, y: 0}}
        animate={{duration: 600}}
        style={{
          parent: {
            overflow: 'visible',
          },
        }}
        width={width}>
        {/* <VictoryBar
          data={vdata}
          style={{
            data: {fill: 'tomato', width: 12},
          }}
          animate={{
            onExit: {
              duration: 0,
              before: () => ({
                _y: 0,
                fill: 'orange',
                label: 'BYE',
              }),
            },
          }}
        /> */}
        <VictoryAxis
          dependentAxis
          height={0}
          width={0}
          style={{
            axis: {stroke: 'transparent', width: 0},
            ticks: {stroke: 'transparent', width: 0},
            tickLabels: {fill: 'transparent', width: 0},
          }}
          // tickFormat={() => ''}
        />
        <VictoryArea
          height={GRAPH_HEIGHT + 30}
          data={vdata}
          style={{
            data: {
              fill: 'transparent',
              stroke: 'black',
              strokeWidth: 2,
            },
            labels: {width: 0, fontSize: 0},
            parent: {
              marginTop: 100,
              overflowY: 'visible',
            },
          }}
          interpolation={'natural'}
          //   labels={({data, index}) =>
          //     index === data.length - 1 ? 'last label' : index
          //   }
          animate={{
            onExit: {
              duration: 0,
              before: () => ({
                _y: 0,
                fill: 'orange',
                label: 'BYE',
              }),
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default memo(VictoryGraph);
