import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define the data
const data = [
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

  const Chart: React.FC = () => {
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
            .padding(-0.015);

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
  
