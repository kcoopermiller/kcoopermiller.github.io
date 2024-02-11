import { onMount } from 'solid-js';
import * as d3 from 'd3';
import { calculateHaversineDistance } from "../lib/helpers";

async function visitorInfo() {
  const geoResponse = await fetch('https://kcoopermiller.netlify.app/geolocation');
  const data = await geoResponse.json();

  console.log(data["geo"]["latitude"]);
  console.log(data["geo"]["longitude"]);

  const distance = calculateHaversineDistance(
    40.1164, // Champaign, IL latitude
    -88.2434, // Champaign, IL longitude
    data["geo"]["latitude"],
    data["geo"]["longitude"]
  );

  console.log(distance);

  const location = data["geo"]["city"];
  return {
    distance,
    location,
  };
}

const { distance, location } = await visitorInfo();

console.log(distance);

export function distanceToLocation() { return `We are ${distance} mi apart`; }

export function Graph() {
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

    // DFS Animation
    function animateDFS(startNodeIndex) {
      const visited = new Set(); // To keep track of visited nodes
      const stack = [[startNodeIndex, -1]]; // Initialize stack with the start node index and a dummy parent index
      const transitions = []; // To queue up transitions for animation
    
      // Function to highlight a node
      const highlightNode = (nodeIndex) => {
        transitions.push(() => node.filter((d, i) => i === nodeIndex)
          .transition()
          .duration(500)
          .style('fill', '#BC002D')); // Change color to highlight
      };
    
      // Function to highlight a link between two nodes
      const highlightLink = (sourceIndex, targetIndex) => {
        transitions.push(() => link.filter(d => (d.source === sourceIndex && d.target === targetIndex) || (d.source === targetIndex && d.target === sourceIndex))
          .transition()
          .duration(500)
          .style('stroke', '#BC002D')); // Change color to highlight
      };
    
      // Main DFS function
      const dfs = () => {
        while (stack.length > 0) {
          const [currentNodeIndex, parentIndex] = stack.pop(); // Get current node and its parent from the stack
    
          if (!visited.has(currentNodeIndex)) {
            visited.add(currentNodeIndex); // Mark current node as visited
            highlightNode(currentNodeIndex); // Queue highlight transition for the current node
    
            if (parentIndex !== -1) {
              highlightLink(parentIndex, currentNodeIndex); // Queue highlight transition for the link if it's not the start node
            }
    
            // Add all unvisited adjacent nodes to the stack
            links.forEach((link, index) => {
              if (link.source === currentNodeIndex && !visited.has(link.target)) {
                stack.push([link.target, currentNodeIndex]);
              } else if (link.target === currentNodeIndex && !visited.has(link.source)) {
                stack.push([link.source, currentNodeIndex]);
              }
            });
          }
        }
      };
    
      // Execute DFS to populate the transitions queue
      dfs();
    
      // Function to execute transitions in sequence
      const runTransitions = (i = 0) => {
        if (i < transitions.length) {
          transitions[i]().on('end', () => runTransitions(i + 1)); // Call the next transition after the current one ends
        }
      };
    
      // Start executing transitions
      runTransitions();
    }       

    animateDFS(3); // Start DFS animation from the 'Your Location' node
  });

  return (
    <svg class="hidden md:block" ref={svgRef}></svg>
  );
}