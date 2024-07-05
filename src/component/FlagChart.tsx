import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  Lab: string;
  Address: string;
  Sample: string;
  Task: string;
  Unit: string;
  score: number;
}

const FlagChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const data: DataPoint[] = [
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

const isSwitched = true; 
// Set this to true or false to toggle the behavior
useEffect(() => {
    const margin = { top: 40, right: 250, bottom: 30, left: 250 };
    const width = 1500 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .style('background-color', 'white')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
        .domain([-2, 2])
        .range([0, width / 8]);

    const y0 = d3.scaleBand()
        .domain(Array.from(new Set(data.map(d => d.Lab))))
        .range([0, height])
        .padding(0.05);

    const y1 = d3.scaleBand()
        .domain(Array.from(new Set(data.map(d => d.Address))))
        .range([0, y0.bandwidth() / 2]);

    svg.append('g')
        .call(d3.axisLeft(y0).tickSize(0))
        .attr('color', 'black')
        .selectAll('.tick text')
        .attr('dy', '-1.35em'); // Adjusted vertical alignment

    const samples = Array.from(new Set(data.map(d => d.Sample)));
    const displayedAddresses = new Set();
    const uniqueAddresses = Array.from(new Set(data.map(d => d.Address)));
    uniqueAddresses.forEach((address, i) => {
        const addressData = data.filter(d => d.Address === address);
        const firstLab = addressData[0].Lab;
        const lastLab = addressData[addressData.length - 1].Lab;

        svg.append('rect')
            .attr('x', 0)
            .attr('y', y0(firstLab))
            .attr('width', width)
            .attr('height', y0(lastLab) - y0(firstLab))
            .attr('fill', i % 2 === 0 ? 'lightgrey' : 'white')
            .attr('opacity', 0.5);
    });

    samples.forEach((sample, i) => {
        svg.append('g')
            .selectAll('.address-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'address-label')
            .attr('x', width + margin.left / 10)
            .attr('y', (d: any) => y0(d.Lab))
            .attr('dy', '0.9em')
            .attr('text-anchor', 'right')
            .text((d: any) => {
                if (!displayedAddresses.has(d.Address)) {
                    displayedAddresses.add(d.Address);
                    return  d.Address;
                } else {
                    return '';
                }
            });
    });
    if (isSwitched) {
        samples.forEach((sample, i) => {
            svg.append('g')
                .selectAll('.address-label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'address-label')
                .attr('x', width + margin.left / 10)
                .attr('y', (d: any) => y0(d.Lab))
                .attr('dy', '0.9em')
                .attr('text-anchor', 'right')
                .text((d: any) => {
                    if (!displayedAddresses.has(d.Address)) {
                        displayedAddresses.add(d.Sample);
                        return  d.Sample;
                    } else {
                        return '';
                    }
                });
        });
    }
    samples.forEach(sample => {
        svg.selectAll(`.y-grid-${sample}`)
            .data(data.filter(d => d.Sample === sample))
            .enter()
            .append('line')
            .attr('class', `y-grid-${sample}`)
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', (d: any) => y0(d.Lab))
            .attr('y2', (d: any) => y0(d.Lab))
            .attr('stroke', 'lightgray')
            .attr('stroke-opacity', 0.7)
            .attr('shape-rendering', 'crispEdges');
    });

    samples.forEach((sample, i) => {
        const sampleGroup = svg.append('g')
            .attr('transform', `translate(${(width / 8) * i},${height})`);

        sampleGroup.call(d3.axisBottom(x).tickValues([-2, 0, 2]).tickSizeOuter(0))
            .selectAll('text')
            .style("text-anchor", "end")
            .attr("dx", "-1em")
            .attr("dy", "-.45em")
            .attr("transform", "rotate(-90)");

        svg.append('text')
            .attr('x', (width / 8) * i + (width / 16))
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .attr('fill', 'black')
            .text(sample);

    if(isSwitched){
        
    }
        
        svg.append('g')
            .attr('class', `grid-${sample}`)
            .attr('transform', `translate(${(width / 8) * i},${height})`)
            .call(d3.axisBottom(x)
                .tickValues([-2, 0, 2])
                .tickSize(-height)
                .tickFormat(''))
            .selectAll('line')
            .attr('stroke', 'lightgray')
            .attr('stroke-opacity', 0.7)
            .attr('shape-rendering', 'crispEdges');

        svg.selectAll(`.category-${sample}`)
            .data(data.filter(d => d.Sample === sample))
            .enter()
            .append('g')
            .attr('class', `category-${sample}`)
            .attr('transform', (d: any) => `translate(${(width / 8) * i},${y0(d.Lab)})`)
            .each(function (this: SVGGElement, labData: any) {
                const labGroup = d3.select(this);

                labGroup.selectAll('.subpart')
                    .data(data.filter(d => d.Lab === labData.Lab && d.Sample === sample))
                    .enter()
                    .append('g')
                    .attr('class', 'subpart')
                    .attr('transform', (d: any) => `translate(0,${y0(d.Address)})`)
                    .each(function (this: SVGGElement, addressData: any) {
                        const addressGroup = d3.select(this);

                        const direction = addressData.score < 0 ? 'left' : 'right';
                        const color = Math.abs(addressData.score) > 3 ? 'red' : (Math.abs(addressData.score) > 2 ? 'yellow' : 'blue');
                        const adjustedValue = Math.min(2, Math.abs(addressData.score));
                        if (Math.abs(addressData.score) > 3 || Math.abs(addressData.score) < -3) {
                            addressGroup.append('text')
                                .attr('x', direction === 'left' ? x(0) - Math.abs(x(adjustedValue) - x(0)) - 5 : x(0) + Math.abs(x(adjustedValue) - x(0)) + 5)
                                .attr('y', 0)
                                .attr('dy', '-0.4em')
                                .attr('dx', direction === 'left' ? '1.6em' : '-1.45em')
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'black')
                                .text(addressData.score.toFixed(2));
                        }
                        addressGroup.append('path')
                            .attr('d', trianglePath(x(0), 0, Math.abs(x(adjustedValue) - x(0)), y1.bandwidth() + 20, direction))
                            .attr('fill', color);
                    });
            });
    });

    function trianglePath(x0: number, y0: number, width: number, height: number, direction: string) {
        const triangleHeight = height / 2;
        if (direction === 'left') {
            return `M${x0},${y0 - triangleHeight / 2} L${x0 - width},${y0} L${x0},${y0 + triangleHeight / 2} Z`;
        } else {
            return `M${x0},${y0 - triangleHeight / 2} L${x0 + width},${y0} L${x0},${y0 + triangleHeight / 2} Z`;
        }
    }
}, [data, isSwitched]);




  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default FlagChart;
