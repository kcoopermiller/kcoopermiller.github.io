import { calculateHaversineDistance } from "../lib/helpers";

async function visitorInfo() {
  const geoResponse = await fetch('https://kcm.sh/geolocation');
  const data = await geoResponse.json();

  const distance = calculateHaversineDistance(
    37.7749, // San Francisco, CA latitude
    -122.4194, // San Francisco, CA longitude
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

const width = 450, height = 100;
const highlightColor = '#BC002D';

// `delay` is when (in ms) the node or link gets highlighted
const nodes = [
  { id: location, x: 100, y: height / 2, r: 40, delay: 3000 },
  { id: '', x: 300, y: height - 25, r: 20, delay: 2000 },
  { id: '', x: 200, y: height - 70, r: 20, delay: 1000 },
  { id: 'San Francisco', x: 400, y: height / 2, r: 40, delay: 500 }
];

const links = [
  { source: 0, target: 1, delay: 3500 },
  { source: 0, target: 2 },
  { source: 2, target: 1, delay: 2500 },
  { source: 2, target: 3, delay: 1500 }
];

const highlight = (name, delay) =>
  delay === undefined
    ? {}
    : { animation: `${name} 500ms cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms forwards` };

export default function Graph() {
  return (
    <>
    {distance && location ? (
      <>
        <h2 class="text-xl font-bold m-0 z-20">We are {distance} {Number(distance) === 1 ? "mile" : "miles"} apart</h2>
        <svg class="hidden md:block max-w-full h-auto" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <style>{`
            @keyframes graph-node { to { fill: ${highlightColor}; } }
            @keyframes graph-link { to { stroke: ${highlightColor}; } }
          `}</style>
          <g>
            {links.map((d) => (
              <line
                x1={nodes[d.source].x}
                y1={nodes[d.source].y}
                x2={nodes[d.target].x}
                y2={nodes[d.target].y}
                style={{ stroke: '#4e4e4e', ...highlight('graph-link', d.delay) }}
              />
            ))}
          </g>
          <g>
            {nodes.map((d) => (
              <circle r={d.r} cx={d.x} cy={d.y} style={highlight('graph-node', d.delay)} />
            ))}
          </g>
          {/* Labels for the first and last nodes */}
          {nodes.filter((d) => d.id).map((d) => (
            <text
              x={d.x}
              y={d.y + 5}
              text-anchor="middle"
              style={{ fill: 'white', 'font-size': '13px', 'font-weight': 'bold', 'font-family': 'CabinetGrotesk' }}
            >
              {d.id}
            </text>
          ))}
        </svg>
      </>
    ) : (
      <p>Unable to retrieve visitor information</p>
    )}
    </>
  );
}
