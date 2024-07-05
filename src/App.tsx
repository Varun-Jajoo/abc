import React from 'react'
import App2 from './component/Display'
import Chart from './component/Fchart'
import FlagChart from './component/FlagChart'
import BoxPlot from './component/BoxPlot'

export default function App() {
const data = 
  [
    {
      "group": "Group A",
      "categories": [
        {
          "category": "Category 1",
          "values": [15, 18, 21, 25, 19, 17, 20, 23, 24, 22]
        },
        {
          "category": "Category 2",
          "values": [28, 30, 27, 33, 29, 31, 32, 34, 26, 25]
        },
        {
          "category": "Category 3",
          "values": [10, 12, 14, 13, 15, 11, 9, 8, 7, 16]
        }
      ]
    },
    {
      "group": "Group B",
      "categories": [
        {
          "category": "Category 1",
          "values": [20, 22, 23, 21, 24, 25, 27, 26, 28, 29]
        },
        {
          "category": "Category 2",
          "values": [35, 37, 34, 36, 33, 32, 30, 31, 29, 28]
        },
        {
          "category": "Category 3",
          "values": [18, 20, 19, 21, 23, 24, 22, 25, 26, 27]
        }
      ]
    }
  ]
  
  return (
    <>
    <BoxPlot data={data}/>
    <FlagChart/>
    
    </>
  )
}
