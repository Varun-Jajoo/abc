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
  const Chart:React.FC<FlagChartProps> = ({ data })=> {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const margin = { top: 50, right: 100, bottom: 50, left: 100 };
        const width = 1000 - margin.left - margin.right;
        const height = 2600 - margin.top - margin.bottom;

        const svg = d3.select(ref.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const labs = Array.from(new Set(data.map((d:any) => d.Lab)));
        const yScale = d3.scaleBand()
            .domain(labs.flatMap(lab => data.filter((d:any) => d.Lab === lab).map((d:any) => `${lab}-${d.Sample}`)))
            .range([0, height])
            .padding(0.1);

        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale));

        const addresses = Array.from(new Set(data.map((d:any) => d.Address)));
        
        const addressScale = d3.scaleBand()
            .domain(addresses)
            .range([0, width])
            .padding(0.2);

            svg.append('g')
            .attr('class', 'horizontal-grid')
            .selectAll('line')
            .data(yScale.domain())
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', (d:any) => yScale(d) + yScale.bandwidth() / 2)
            .attr('y2', (d:any) => yScale(d) + yScale.bandwidth() / 2)
            .attr('stroke', 'lightgray')
            .attr('stroke-width', 1);
            addresses.forEach((address, i) => {
                const addressData = data.filter((d: any) => d.Address === address);
                const firstLab = addressData[0].Lab;
                const lastLab = addressData[addressData.length - 1].Lab;
          
                svg.append('rect')
                  .attr('x', addressScale(address))
                  .attr('y', 0)
                  .attr('width', addressScale.bandwidth())
                  .attr('height', height)
                  .attr('fill', i % 2 === 0 ? 'lightgrey':"white")
                  .attr('opacity', 0.3);
              });
        addresses.forEach(address => {
            
            const addressGroup = svg.append('g')
                .attr('transform', `translate(${addressScale(address)},0)`);

            const xScale = d3.scaleLinear()
                .domain([-2, 2])
                .range([0, addressScale.bandwidth()]);

            addressGroup.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                
                .call(d3.axisBottom(xScale).tickValues([-2, 0, 2]));


            addressGroup.append('g')
                .attr('class', 'grid')
                .selectAll('line')
                .data(xScale.ticks(5))
                .enter()
                .append('line')
                .attr('x1', (d:any) => xScale(d))
                .attr('x2', (d:any) => xScale(d))
                .attr('y1', 0)
                .attr('y2', height)
                .attr('stroke', 'lightgray')
                .attr('stroke-width', 1);

            function trianglePath(x0:any, y0:any, width:any, height:any, direction:any) {
                const triangleHeight = height / 2;
                if (direction === 'left') {
                    return `M${x0},${y0 - triangleHeight / 2} L${x0 - width},${y0} L${x0},${y0 + triangleHeight / 2} Z`;
                } else {
                    return `M${x0},${y0 - triangleHeight / 2} L${x0 + width},${y0} L${x0},${y0 + triangleHeight / 2} Z`;
                }
            }

            addressGroup.selectAll('.triangle')
                .data(data.filter((d:any) => d.Address === address))
                .enter()
                .append('path')
                .attr('d', (d:any) => {
                    const direction = d.score < 0 ? 'left' : 'right';
                    const adjustedValue = Math.min(2, Math.abs(d.score));
                    return trianglePath(xScale(0), yScale(`${d.Lab}-${d.Sample}`) + yScale.bandwidth() / 2, Math.abs(xScale(adjustedValue) - xScale(0)), yScale.bandwidth(), direction);
                })
                .attr('fill', (d:any) => {
                    const absScore = Math.abs(d.score);
                    if (absScore > 3) {
                        return 'red';
                    } else if (absScore > 2) {
                        return 'yellow';
                    } else {
                        return 'blue';
                    }
                }) .each(function(d: any) {
                    const direction = d.score < 0 ? 'left' : 'right';
                    const adjustedValue = Math.min(2, Math.abs(d.score));
                    if (Math.abs(d.score) > 3) {
                      addressGroup.append('text')
                        .attr('x', direction === 'left' ? xScale(0) - Math.abs(xScale(adjustedValue) - xScale(0)) - 5 : xScale(0) + Math.abs(xScale(adjustedValue) - xScale(0)) + 5)
                        .attr('y', yScale(`${d.Lab}-${d.Sample}`) + yScale.bandwidth() / 2)
                        .attr('dy', '-0.4em')
                        .attr('dx', direction === 'left' ? '1.6em' : '-1.45em')
                        .attr('text-anchor', 'middle')
                        .attr('fill', 'black')
                        .text(d.score.toFixed(2));
                    }
                });
                
        });

        
        svg.append('g')
            .selectAll('.address-label')
            .data(addresses)
            .enter()
            .append('text')
            .attr('x', (d:any) => addressScale(d) + addressScale.bandwidth() / 2)
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            
            .text((d:any) => d)
            .attr('fill', 'black');

        const samples = Array.from(new Set(data.map((d:any) => d.Lab)));
        const sampleScale = d3.scaleBand()
            .domain(samples)
            .range([0, height])
            .padding(0.1);

        svg.append('g')
            .selectAll('.sample-label')
            .data(samples)
            .enter()
            .append('text')
            .attr('x', width + 10)
            .attr('y', (d:any) => sampleScale(d) + sampleScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'start')
            .text((d:any) => d)
            .attr('fill', 'black');
           
    }, []);

    return <svg ref={ref}></svg>;
};

export default Chart;
  
