import React from 'react'
import App2 from './component/Display'
import Chart from './component/Fchart'
import FlagChart from './component/FlagChart'
import BoxPlot from './component/BoxPlot'
import FlagChartMain from './component/FlagChartMain'

export default function App() {
const data = 
  [
    {
      "group": "Group A",
      "categories": [
        {
          "category": "Category 1",
          "values": [15, 18, 21, 25, 19, 17, 20, 23, 24, 22,100]
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
  
  const data2 = [
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P1', Task: 'L01-P1', Unit: 'mg/100g', score: -0.537205027 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P2', Task: 'L01-P2', Unit: 'mg/100g', score: -0.431745924 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P3', Task: 'L01-P3', Unit: 'mg/100g', score: -0.562893947 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P4', Task: 'L01-P4', Unit: 'mg/100g', score: -0.874411085 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P5', Task: 'L01-P5', Unit: 'mg/100g', score: -0.036870896 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P6', Task: 'L01-P6', Unit: 'mg/100g', score: -0.26451481 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P7', Task: 'L01-P7', Unit: 'mg/100g', score: -0.0838739 },
    { Lab: 'L01', Address: 'Chrysen', Sample: 'P8', Task: 'L01-P8', Unit: 'mg/100g', score: -0.641198499 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P1', Task: 'L02-P1', Unit: 'mg/100g', score: 0.571689035 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P2', Task: 'L02-P2', Unit: 'mg/100g', score: 0.093356521 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P3', Task: 'L02-P3', Unit: 'mg/100g', score: 0.2150725 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P4', Task: 'L02-P4', Unit: 'mg/100g', score: 0.316481871 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P5', Task: 'L02-P5', Unit: 'mg/100g', score: 0.388339444 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P6', Task: 'L02-P6', Unit: 'mg/100g', score: 1.372170578 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P7', Task: 'L02-P7', Unit: 'mg/100g', score: -0.602387934 },
    { Lab: 'L02', Address: 'Chrysen', Sample: 'P8', Task: 'L02-P8', Unit: 'mg/100g', score: -0.155132198 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P1', Task: 'L03-P1', Unit: 'mg/100g', score: -0.643054006 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P2', Task: 'L03-P2', Unit: 'mg/100g', score: -0.302773393 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P3', Task: 'L03-P3', Unit: 'mg/100g', score: -0.962990977 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P4', Task: 'L03-P4', Unit: 'mg/100g', score: -0.874411085 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P5', Task: 'L03-P5', Unit: 'mg/100g', score: -0.21994757 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P6', Task: 'L03-P6', Unit: 'mg/100g', score: -0.991930539 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P7', Task: 'L03-P7', Unit: 'mg/100g', score: -0.327418371 },
    { Lab: 'L03', Address: 'Chrysen', Sample: 'P8', Task: 'L03-P8', Unit: 'mg/100g', score: -0.176265515 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P1', Task: 'L04-P1', Unit: 'mg/100g', score: -0.562407165 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P2', Task: 'L04-P2', Unit: 'mg/100g', score: -0.606780072 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P3', Task: 'L04-P3', Unit: 'mg/100g', score: -0.851852913 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P4', Task: 'L04-P4', Unit: 'mg/100g', score: -0.643915674 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P5', Task: 'L04-P5', Unit: 'mg/100g', score: -0.261287464 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P6', Task: 'L04-P6', Unit: 'mg/100g', score: -1.068500615 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P7', Task: 'L04-P7', Unit: 'mg/100g', score: 0.15967057 },
    { Lab: 'L04', Address: 'Benzo[k]fluoranthen', Sample: 'P8', Task: 'L04-P8', Unit: 'mg/100g', score: -0.450998642 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P1', Task: 'L05-P1', Unit: 'mg/100g', score: 1.267268037 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P2', Task: 'L05-P2', Unit: 'mg/100g', score: 1.14356141 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P3', Task: 'L05-P3', Unit: 'mg/100g', score: -0.273934981 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P4', Task: 'L05-P4', Unit: 'mg/100g', score: 3.389754015 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P5', Task: 'L05-P5', Unit: 'mg/100g', score: -0.036870896 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P6', Task: 'L05-P6', Unit: 'mg/100g', score: 0.290618246 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P7', Task: 'L05-P7', Unit: 'mg/100g', score: 2.178732792 },
    { Lab: 'L05', Address: 'Benzo[k]fluoranthen', Sample: 'P8', Task: 'L05-P8', Unit: 'mg/100g', score: 1.10230019 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P1', Task: 'L06-P1', Unit: 'mg/100g', score: 0.884195543 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P2', Task: 'L06-P2', Unit: 'mg/100g', score: 1.152773734 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P3', Task: 'L06-P3', Unit: 'mg/100g', score: 2.726792746 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P4', Task: 'L06-P4', Unit: 'mg/100g', score: 2.045197452 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P5', Task: 'L06-P5', Unit: 'mg/100g', score: 0.618661712 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P6', Task: 'L06-P6', Unit: 'mg/100g', score: 0.520328475 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P7', Task: 'L06-P7', Unit: 'mg/100g', score: 0.748891063 },
    { Lab: 'L06', Address: 'Benzo[k]fluoranthen', Sample: 'P8', Task: 'L06-P8', Unit: 'mg/100g', score: 1.18683346 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P1', Task: 'L07-P1', Unit: 'mg/100g', score: -0.79930726 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P2', Task: 'L07-P2', Unit: 'mg/100g', score: -0.938423721 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P3', Task: 'L07-P3', Unit: 'mg/100g', score: 0 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P4', Task: 'L07-P4', Unit: 'mg/100g', score: -0.739955428 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P5', Task: 'L07-P5', Unit: 'mg/100g', score: -0.225853269 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P6', Task: 'L07-P6', Unit: 'mg/100g', score: 0 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P7', Task: 'L07-P7', Unit: 'mg/100g', score: -0.704519486 },
    { Lab: 'L07', Address: 'Benzo[i]fluoranthen', Sample: 'P8', Task: 'L07-P8', Unit: 'mg/100g', score: -0.440431984 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P1', Task: 'L08-P1', Unit: 'mg/100g', score: 0.163414403 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P2', Task: 'L08-P2', Unit: 'mg/100g', score: 0.434212494 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P3', Task: 'L08-P3', Unit: 'mg/100g', score: 0.237300113 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P4', Task: 'L08-P4', Unit: 'mg/100g', score: 0.905525699 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P5', Task: 'L08-P5', Unit: 'mg/100g', score: 0.949380865 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P6', Task: 'L08-P6', Unit: 'mg/100g', score: 1.065890272 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P7', Task: 'L08-P7', Unit: 'mg/100g', score: 0.316796035 },
    { Lab: 'L08', Address: 'Benzo[i]fluoranthen', Sample: 'P8', Task: 'L08-P8', Unit: 'mg/100g', score: 0.098467611 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P1', Task: 'L09-P1', Unit: 'mg/100g', score: -0.708579564 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P2', Task: 'L09-P2', Unit: 'mg/100g', score: -0.542293807 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P3', Task: 'L09-P3', Unit: 'mg/100g', score: 1.926598685 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P4', Task: 'L09-P4', Unit: 'mg/100g', score: -0.362199061 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P5', Task: 'L09-P5', Unit: 'mg/100g', score: 0.270225461 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P6', Task: 'L09-P6', Unit: 'mg/100g', score: -0.388941185 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P7', Task: 'L09-P7', Unit: 'mg/100g', score: -0.445262469 },
    { Lab: 'L09', Address: 'Benzo[i]fluoranthen', Sample: 'P8', Task: 'L09-P8', Unit: 'mg/100g', score: 0.056200977 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P1', Task: 'L10-P1', Unit: 'mg/100g', score: -1.162218044 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P2', Task: 'L10-P2', Unit: 'mg/100g', score: -0.901574427 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P3', Task: 'L10-P3', Unit: 'mg/100g', score: -0.696259624 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P4', Task: 'L10-P4', Unit: 'mg/100g', score: -0.375004361 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P5', Task: 'L10-P5', Unit: 'mg/100g', score: -2.493641749 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P6', Task: 'L10-P6', Unit: 'mg/100g', score: -0.637793934 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P7', Task: 'L10-P7', Unit: 'mg/100g', score: -0.963776503 },
    { Lab: 'L10', Address: 'Benzo[e]pyren', Sample: 'P8', Task: 'L10-P8', Unit: 'mg/100g', score: -0.598931864 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P1', Task: 'L11-P1', Unit: 'mg/100g', score: 8.424675163 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P2', Task: 'L11-P2', Unit: 'mg/100g', score: 7.997530161 },
    
  
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P3', Task: 'L11-P3', Unit: 'mg/100g', score: 0.504031467 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P4', Task: 'L11-P4', Unit: 'mg/100g', score: 0.150012963 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P5', Task: 'L11-P5', Unit: 'mg/100g', score: 5.160144371 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P6', Task: 'L11-P6', Unit: 'mg/100g', score: 0.931892638 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P7', Task: 'L11-P7', Unit: 'mg/100g', score: -4.315639112 },
    { Lab: 'L11', Address: 'Benzo[e]pyren', Sample: 'P8', Task: 'L11-P8', Unit: 'mg/100g', score: 1.799699666 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P1', Task: 'L12-P1', Unit: 'mg/100g', score: 0.032363286 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P2', Task: 'L12-P2', Unit: 'mg/100g', score: -0.533081483 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P3', Task: 'L12-P3', Unit: 'mg/100g', score: -0.58512156 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P4', Task: 'L12-P4', Unit: 'mg/100g', score: -0.445433514 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P5', Task: 'L12-P5', Unit: 'mg/100g', score: -1.99165732 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P6', Task: 'L12-P6', Unit: 'mg/100g', score: -0.829219126 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P7', Task: 'L12-P7', Unit: 'mg/100g', score: -0.987345323 },
    { Lab: 'L12', Address: 'Benzo[e]pyren', Sample: 'P8', Task: 'L12-P8', Unit: 'mg/100g', score: -1.433697904 }
  ];
  return (
    <>
    <BoxPlot data={data}/>
    <FlagChartMain SwitchedAxis={false} data={data2}/>
    
    </>
  )
}
