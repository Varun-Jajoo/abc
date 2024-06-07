import React from 'react';
import './App.css';
import BoxPlot from './component/BoxPlot';
const sampleData = [
  {
    group: "Group A",
    categories: [
      { category: "S 1", values: [150, 155] },
      { category: "S 2", values: [160, 158] },
      { category: "S 3", values: [165, 160] },
      { category: "S 4", values: [170, 165] },
      { category: "S 5", values: [175, 170] },
      { category: "S 6", values: [180, 175] },
      { category: "S 7", values: [185, 180] },
      { category: "S 8", values: [190, 185] },
      { category: "S 9", values: [195, 190] },
      { category: "S 10", values: [200, 195] },
    ]
  },
  {
    group: "Group B",
    categories: [
      { category: "S 14", values: [160, 165] },
      { category: "S 15", values: [155, 150] },
      { category: "S 16", values: [160, 155] },
      { category: "S 17", values: [165, 160] },
      { category: "S 18", values: [170, 165] },
      { category: "S 19", values: [175, 170] },
      { category: "S 20", values: [180, 175] },
      { category: "S 21", values: [185, 180] },
      { category: "S 22", values: [190, 185] },
      { category: "S 23", values: [195, 190] },
    ]
  },
  {
    group: "Group C",
    categories: [
      { category: "S 24", values: [170, 175] },
      { category: "S 25", values: [175, 180] },
      { category: "S 26", values: [180, 185] },
      { category: "S 27", values: [185, 190] },
      { category: "S 28", values: [190, 195] },
      { category: "S 29", values: [195, 200] },
      { category: "S 30", values: [200, 205] },
      { category: "S 31", values: [205, 210] },
      { category: "S 32", values: [210, 215] },
      { category: "S 33", values: [215,222,222,222,222,220,50,200,222,52] },
    ]
  }
];


// const sampleData = [
//   {
//     group: "Group A",
//     categories: [
//       { category: "S 1", values: [187, 182] },  
//       { category: "S 2", values: [197, 198] },  
//       { category: "S 3", values: [202, 198] },  
//     ],
//     intervals: [
//       {
//         type: "confidence interval",  
//         percentage: "95%",           
//         values: [178.5,200.5],         
//       },
//       {
//         type: "tolerance interval",   
//         percentage: "95%",            
//         values: [172,210]         
//       },
//     ],
//   },
// ];
const App = () => {
  return (
    <div>
      <h1>Box Plot Example</h1>
      <BoxPlot data={sampleData} />
    </div>
  );
};

export default App;
