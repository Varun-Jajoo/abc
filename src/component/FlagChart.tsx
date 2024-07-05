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
interface FlagChartProps {
    data: DataPoint[];
  }
  
const FlagChart: React.FC<FlagChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);


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
    
        // Ensure firstLab and lastLab are correctly mapped to y-coordinates
        const yFirstLab = y0(firstLab);
        const yLastLab = y0(lastLab);
    
        // Calculate height ensuring it covers the entire range
        const height = Math.abs(yLastLab - yFirstLab);
    
        svg.append('rect')
            .attr('x', 0)
            .attr('y', Math.min(yFirstLab, yLastLab))
            .attr('width', width)
            .attr('height', height)
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
            .attr('y', (d: DataPoint) => y0(d.Lab))
            .attr('dy', '0.9em')
            .attr('text-anchor', 'right')
            .text((d: DataPoint) => {
                if (!displayedAddresses.has(d.Address)) {
                    displayedAddresses.add(d.Address);
                    return  d.Address;
                } else {
                    return '';
                }
            });
    });
    
    samples.forEach(sample => {
        svg.selectAll(`.y-grid-${sample}`)
            .data(data.filter(d => d.Sample === sample))
            .enter()
            .append('line')
            .attr('class', `y-grid-${sample}`)
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', (d: DataPoint) => y0(d.Lab))
            .attr('y2', (d: DataPoint) => y0(d.Lab))
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
            .attr('transform', (d: DataPoint) => `translate(${(width / 8) * i},${y0(d.Lab)})`)
            .each(function (this: SVGGElement, labData: DataPoint) {
                const labGroup = d3.select(this);

                labGroup.selectAll('.subpart')
                    .data(data.filter(d => d.Lab === labData.Lab && d.Sample === sample))
                    .enter()
                    .append('g')
                    .attr('class', 'subpart')
                    .attr('transform', (d: DataPoint) => `translate(0,${y0(d.Address)})`)
                    .each(function (this: SVGGElement, addressData: DataPoint) {
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
}, [data]);




  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default FlagChart;
