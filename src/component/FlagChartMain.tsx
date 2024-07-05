import React from 'react';
import FlagChart from './FlagChart';
import Chart from './Fchart';
interface DataPoint {
    Lab: string;
    Address: string;
    Sample: string;
    Task: string;
    Unit: string;
    score: number;
  }
interface FlagChartMainProps {
  SwitchedAxis: boolean;
  data: DataPoint[];
}

const FlagChartMain: React.FC<FlagChartMainProps> = ({ SwitchedAxis ,data}) => {
  return (
    <>
      {SwitchedAxis ? <Chart data={data} /> : <FlagChart data={data}/>}
    </>
  );
};

export default FlagChartMain;
