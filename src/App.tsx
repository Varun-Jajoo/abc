// src/App.tsx

import React from 'react';
import GlutenDetectionGraph from './component/Graph2';
import BoxPlot from './component/BoxPlot';
const data = {
    groups: [
      {
        name: "Group A",
        labDetectionRates: [
          { x: 1, y: 0.02 },
          { x: 3, y: 0.35 },
          { x: 5, y: 0.87 },
          { x: 7, y: 0.95 },
          { x: 9, y: 0.98 },
          { x: 11, y: 0.99 },
          { x: 13, y: 1.00 },
          { x: 15, y: 1.00 },
          { x: 17, y: 1.00 },
          { x: 18, y: 1.00 },
          { x: 2000, y: 0 }
        ],
        lpodCurve: [
          { x: 1, y: 0.01 },
          { x: 3, y: 0.20 },
          { x: 5, y: 0.80 },
          { x: 7, y: 0.95 },
          { x: 9, y: 0.98 },
          { x: 11, y: 1.00 },
          { x: 13, y: 1.00 },
          { x: 15, y: 1.00 },
          { x: 17, y: 1.00 },
          { x: 18, y: 1.00 },
          { x: 200, y: 1.00 }
        ],
        upperLimit: [
          { x: 1, y: 0.05 },
          { x: 3, y: 0.30 },
          { x: 5, y: 0.90 },
          { x: 7, y: 0.98 },
          { x: 9, y: 1.00 },
          { x: 11, y: 1.00 },
          { x: 13, y: 1.00 },
          { x: 15, y: 1.00 },
          { x: 17, y: 1.00 },
          { x: 18000, y: 1.00 }
        ],
        lowerLimit: [
          { x: 20000, y: 1.00 },
          { x: 1, y: 0.00 }
        ]
      },{
        name: "Group B",
        labDetectionRates: [
          { x: 1, y: 0.02 },
          { x: 3, y: 0.35 },
          { x: 5, y: 0.87 },
          { x: 7, y: 0.95 },
          { x: 9, y: 0.98 },
          { x: 11, y: 0.99 },
          { x: 13, y: 1.00 },
          { x: 15, y: 1.00 },
          { x: 17, y: 1.00 },
          { x: 18, y: 1.00 },
          { x: 2000, y: 0 }
        ],
        lpodCurve: [
          { x: 1, y: 0.01 },
          { x: 3, y: 0.20 },
          { x: 5, y: 0.80 },
          { x: 7, y: 0.95 },
          { x: 9, y: 0.98 },
          { x: 11, y: 1.00 },
          { x: 13, y: 1.00 },
          { x: 15, y: 1.00 },
          { x: 17, y: 1.00 },
          { x: 18, y: 1.00 },
          { x: 200, y: 1.00 }
        ],
        upperLimit: [
          { x: 1, y: 0.05 },
          { x: 3, y: 0.30 },
          { x: 5, y: 0.90 },
          { x: 7, y: 0.98 },
          { x: 9, y: 1.00 },
          { x: 11, y: 1.00 },
          { x: 13, y: 1.00 },
          { x: 15, y: 1.00 },
          { x: 17, y: 1.00 },
          { x: 18000, y: 1.00 }
        ],
        lowerLimit: [
          { x: 200000, y: 1.00 },
          { x: 1, y: 0.00 }
        ]
      }
    ]
  };
  

// Iterate over each group and modify the upperLimit as necessary

  console.log(data);
  

const App = () => (
  <GlutenDetectionGraph data={data.groups} xAxisLabel="Gluten concentration (mg/kg)" yAxisLabel="LPOD" log={4} />
);

export default App;
