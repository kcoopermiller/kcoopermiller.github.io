import { onMount } from 'solid-js';
import * as d3 from 'd3';
import { calculateHaversineDistance } from "../lib/helpers";

async function visitorInfo() {
  const geoResponse = await fetch('https://kcm.sh/geolocation');
  const data = await geoResponse.json();

  const distance = calculateHaversineDistance(
    40.1164, // Champaign, IL latitude
    -88.2434, // Champaign, IL longitude
    data["geo"]["latitude"],
    data["geo"]["longitude"]
  );

  const location = data["geo"]["city"];
  return {
    distance,
    location,
  };
}

const { distance, location } = await visitorInfo();

export default function Graph() {
  let svgRef;

  onMount(() => {
    const width = 450, height = 100;

    const svg = d3.select(svgRef).attr('width', width).attr('height', height);
    
    const nodes = [
      { id: location, x: 100, y: height / 2 },
      { id: '', x: 300, y: height - 25},
      { id: '', x: 200, y: height - 70},
      { id: 'Champaign', x: 400, y: height / 2 }
    ];

    const links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 2, target: 1 },
      { source: 2, target: 3 }
    ];

    // Draw links
    const link = svg.append('g')
                    .selectAll('line')
                    .data(links)
                    .enter().append('line')
                      .attr('x1', d => nodes[d.source].x)
                      .attr('y1', d => nodes[d.source].y)
                      .attr('x2', d => nodes[d.target].x)
                      .attr('y2', d => nodes[d.target].y)
                      .style('stroke', '#4e4e4e');

    // Draw nodes
    const node = svg.append('g')
                    .selectAll('circle')
                    .data(nodes)
                    .enter().append('circle')
                      .attr('r', (d, i) => i === 0 || i === nodes.length - 1 ? 40 : 20)
                      .attr('cx', d => d.x)
                      .attr('cy', d => d.y);

    // Add labels to the first and last nodes
    svg.selectAll('text')
        .data(nodes.filter((d, i) => i === 0 || i === nodes.length - 1)) // Filter only the first and last nodes
        .enter().append('text')
          .attr('x', d => d.x)
          .attr('y', d => d.y + 5) // Adjust this value to center the text vertically within the node
          .text(d => d.id)
          .attr('text-anchor', 'middle') // Center the text horizontally
          .style('fill', 'white')
          .style('font-size', '13px')
          .style('font-weight', 'bold')
          .style('font-family', 'Cabinet Grotesk')

      // Function to highlight a node
      const highlightNode = (nodeIndex) => {
        node.filter((d, i) => i === nodeIndex)
          .transition()
          .duration(500)
          .style('fill', '#BC002D'); // Change color to highlight
      };
    
      // Function to highlight a link between two nodes
      const highlightLink = (sourceIndex, targetIndex) => {
        link.filter(d => (d.source === sourceIndex && d.target === targetIndex) || (d.source === targetIndex && d.target === sourceIndex))
          .transition()
          .duration(500)
          .style('stroke', '#BC002D'); // Change color to highlight
      };

      // Execute the highlighting sequence
      setTimeout(() => {
        highlightNode(3);
      }, 500);
      setTimeout(() => {
        highlightNode(2);
      }, 1000);
      setTimeout(() => {
        highlightLink(2, 3);
      }, 1500);
      setTimeout(() => {
        highlightNode(1);
      }, 2000);
      setTimeout(() => {
        highlightLink(1, 2);
      }, 2500);
      setTimeout(() => {
        highlightNode(0);
      }, 3000);
      setTimeout(() => {
        highlightLink(0, 1);
      }, 3500);
        
  });

  return (
    <>
      <h2 class="text-xl font-bold m-0 z-20">We are {distance} miles apart</h2>
      <svg class="hidden md:block" ref={svgRef}></svg>
    </>
  );
}