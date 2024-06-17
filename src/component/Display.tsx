import React, { useState, ChangeEvent } from 'react';
import GlutenDetectionGraph from './Graph2';
import BoxPlot from './BoxPlot'; // Assuming BoxPlot is a component you have
import * as XLSX from 'xlsx';

interface Point {
  x: number;
  y: number;
}

interface GroupData {
  name: string;
  labDetectionRates: Point[];
  lpodCurve: Point[];
  upperLimit: Point[];
  lowerLimit: Point[];
}

interface BoxPlotCategoryData {
  category: string;
  values: number[];
}

interface BoxPlotGroupData {
  group: string;
  categories: BoxPlotCategoryData[];
  intervals?: {
    type: string;
    percentage: string;
    values: number[];
  }[];
}

const processExcelData = (data: any[]): GroupData[] => {
  const groups: { [key: string]: GroupData } = {};

  data.forEach(row => {
    const group = row['Group'];
    const dataType = row['DataType'];
    const x = row['Xvalue'];
    const y = row['Yvalue'];

    if (!groups[group]) {
      groups[group] = {
        name: group,
        labDetectionRates: [],
        lpodCurve: [],
        upperLimit: [],
        lowerLimit: []
      };
    }

    const point: Point = { x, y };

    switch (dataType) {
      case 'labDetectionRates':
        groups[group].labDetectionRates.push(point);
        break;
      case 'lpodCurve':
        groups[group].lpodCurve.push(point);
        break;
      case 'upperLimit':
        groups[group].upperLimit.push(point);
        break;
      case 'lowerLimit':
        groups[group].lowerLimit.push(point);
        break;
      default:
        break;
    }
  });

  return Object.values(groups);
};

const processIntervalData = (data: any[]): BoxPlotGroupData[] => {
  const groups: { [key: string]: BoxPlotGroupData } = {};

  data.forEach(row => {
    const group = row['Group'];
    const category = row['Category'];
    const value1 = row['Value 1'];
    const value2 = row['Value 2'];
    const intervalType = row['Interval Type'];
    const intervalPercentage = row['Interval Percentage'];
    const intervalValue1 = row['Interval Value 1'];
    const intervalValue2 = row['Interval Value 2'];

    if (!groups[group]) {
      groups[group] = {
        group,
        categories: [],
        intervals: []
      };
    }

    let categoryObj = groups[group].categories.find(cat => cat.category === category);
    if (!categoryObj) {
      categoryObj = { category, values: [] };
      groups[group].categories.push(categoryObj);
    }

    categoryObj.values.push(value1, value2);
  });

  return Object.values(groups);
};

const App2: React.FC = () => {
  const [graphData, setGraphData] = useState<GroupData[]>([]);
  const [boxPlotData, setBoxPlotData] = useState<BoxPlotGroupData[]>([]);
  const [xAxisLabel, setXAxisLabel] = useState<string>('Gluten concentration (mg/kg)');
  const [yAxisLabel, setYAxisLabel] = useState<string>('LPOD');
  const [log, setLog] = useState<number | undefined>(4);
  const [drop, setDrop] = useState<boolean>(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer) {
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<any>(sheet);

          if ((jsonData[0] as any).hasOwnProperty('DataType')) {
            const processedGraphData = processExcelData(jsonData);
            setGraphData(processedGraphData);
            console.log('Processed Graph Data:', processedGraphData);
          } else {
            const processedBoxPlotData = processIntervalData(jsonData);
            setBoxPlotData(processedBoxPlotData);
            console.log('Processed BoxPlot Data:', processedBoxPlotData);
          }
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading the Excel file', error);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleXAxisLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setXAxisLabel(event.target.value);
  };

  const handleYAxisLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setYAxisLabel(event.target.value);
  };

  const handleLogChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLog(parseInt(event.target.value));
  };

  const handleDropChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDrop(event.target.checked);
  };

  return (
    <div>
      <div style={{paddingLeft: '20px'}}>
        <h3>Upload Data for Graph:</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} /> <br />
        <label>X Axis Label:</label> 
        <input type='text' value={xAxisLabel} onChange={handleXAxisLabelChange} />
        <br />
        <label>Y Axis Label:</label>
        <input type='text' value={yAxisLabel} onChange={handleYAxisLabelChange} />
        <br />
        <label>Log:</label>
        <input type='number' value={log || ''} onChange={handleLogChange} />
        <br />
        <label>Drop:</label>
        <input type='checkbox' checked={drop} onChange={handleDropChange} />
        <br />
        </div>
        <GlutenDetectionGraph data={graphData} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} log={log} drop={drop} />
      
      <div>
        <h3>Upload Data for Box Plot:</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <BoxPlot data={boxPlotData} />
      </div>
    </div>
  );
};

export default App2;
