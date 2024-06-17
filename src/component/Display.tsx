import React, { useState, ChangeEvent } from "react";
import GlutenDetectionGraph from "./Graph2";
import BoxPlot from "./BoxPlot";
import Scatterplot from "./ScatterPlot";
import * as XLSX from "xlsx";

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
interface ScatterPlotData {
  x: number;
  y: number;
}

const processExcelData = (data: any[]): GroupData[] => {
  const groups: { [key: string]: GroupData } = {};

  data.forEach((row) => {
    const group = row["Group"];
    const dataType = row["DataType"];
    const x = row["Xvalue"];
    const y = row["Yvalue"];

    if (!groups[group]) {
      groups[group] = {
        name: group,
        labDetectionRates: [],
        lpodCurve: [],
        upperLimit: [],
        lowerLimit: [],
      };
    }

    const point: Point = { x, y };

    switch (dataType) {
      case "labDetectionRates":
        groups[group].labDetectionRates.push(point);
        break;
      case "lpodCurve":
        groups[group].lpodCurve.push(point);
        break;
      case "upperLimit":
        groups[group].upperLimit.push(point);
        break;
      case "lowerLimit":
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

  data.forEach((row) => {
    const group = row["Group"];
    const category = row["Category"];
    const value1 = row["Value 1"];
    const value2 = row["Value 2"];
    const intervalType = row["Interval Type"];
    const intervalPercentage = row["Interval Percentage"];
    const intervalValue1 = row["Interval Value 1"];
    const intervalValue2 = row["Interval Value 2"];

    // Ensure group is initialized
    if (!groups[group]) {
      groups[group] = {
        group,
        categories: [],
        intervals: [],
      };
    }

    // Ensure categories array is initialized
    if (!groups[group].categories) {
      groups[group].categories = [];
    }

    // Find or create category within categories array
    let categoryObj = groups[group].categories.find(
      (cat) => cat.category === category
    );
    if (!categoryObj) {
      categoryObj = { category, values: [] };
      groups[group].categories.push(categoryObj);
    }

    // Add values to the category
    categoryObj.values.push(value1, value2);

    // Ensure intervals array is initialized
    if (!groups[group].intervals) {
      groups[group].intervals = [];
    }

    // Push interval data to intervals array
    // groups[group].intervals.push({
    //   type: intervalType,
    //   percentage: intervalPercentage,
    //   values: [intervalValue1, intervalValue2]
    // });
  });

  return Object.values(groups);
};

const processScatterPlotData = (data: any[]): ScatterPlotData[][] => {
  const groups: { [key: string]: ScatterPlotData[] } = {};

  data.forEach((row) => {
    const group = row["Group"];
    const x = row["Xvalue"];
    const y = row["Yvalue"];

    if (!groups[group]) {
      groups[group] = [];
    }

    const point: ScatterPlotData = { x, y };
    groups[group].push(point);
  });

  return Object.values(groups);
};

const App2: React.FC = () => {
  const [graphData, setGraphData] = useState<GroupData[]>([]);
  const [boxPlotData, setBoxPlotData] = useState<BoxPlotGroupData[]>([]);
  const [scatterPlotData, setScatterPlotData] = useState<ScatterPlotData[][]>(
    []
  );

  // const [kdeData,setKdeData] = useState<KdeData[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer) {
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<any>(sheet);

          if ((jsonData[0] as any).hasOwnProperty("DataType")) {
            const processedGraphData = processExcelData(jsonData);
            setGraphData(processedGraphData);
            console.log("Processed Graph Data:", processedGraphData);
          } else if ((jsonData[0] as any).hasOwnProperty("Category")) {
            const processedBoxPlotData = processIntervalData(jsonData);
            setBoxPlotData(processedBoxPlotData);
            console.log("Processed BoxPlot Data:", processedBoxPlotData);
          } else {
            const processedScatterPlotData = processScatterPlotData(jsonData);
            setScatterPlotData(processedScatterPlotData);
            console.log(
              "Processed Scatter Plot Data:",
              processedScatterPlotData
            );
          }
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading the Excel file", error);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <div>
        <h3>Upload Data for Graph:</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <GlutenDetectionGraph
          data={graphData}
          xAxisLabel="Gluten concentration (mg/kg)"
          yAxisLabel="LPOD"
          log={4}
        />
      </div>
      <div>
        <h3>Upload Data for Box Plot:</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <BoxPlot data={boxPlotData} />
      </div>
      <div>
        <h3>Upload Data for Scatter Plot:</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <Scatterplot
          width={600}
          height={400}
          datasets={scatterPlotData}
          labels={scatterPlotData.map((_, index) => `Group ${index + 1}`)}
          plotType="ellipse"
        />
      </div>
    </div>
  );
};

export default App2;
