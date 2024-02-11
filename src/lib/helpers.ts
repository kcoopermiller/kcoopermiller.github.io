export function trimText(input: string, maxLength: number = 100): string {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength - 3) + "...";
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getVisitorLocation() {
  // Use the visitor's IP to get the geolocation data
  const geoResponse = await fetch('http://localhost:8888/geolocation');
  const geoData = await geoResponse.json();

  // Your logic to calculate distance
  const visitorLat = geoData["geo"]["latitude"];
  const visitorLon = geoData["geo"]["longitude"];
  const yourLat = 40.1164;
  const yourLon = -88.2434; 
  const distance = calculateHaversineDistance(yourLat, yourLon, visitorLat, visitorLon);

  return {
    location: geoData["geo"]["city"],
    distance: distance,
  };
}

// Haversine formula to calculate distance
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // Radius of the Earth in miles
  const R = 3958.8;
  const radianLat1 = lat1 * (Math.PI / 180);
  const radianLat2 = lat2 * (Math.PI / 180);
  const differenceLat = radianLat2 - radianLat1;
  const differenceLon = (lon2 - lon1) * (Math.PI / 180);

  // Haversine formula
  const a = Math.sin(differenceLat / 2) * Math.sin(differenceLat / 2) +
            Math.cos(radianLat1) * Math.cos(radianLat2) *
            Math.sin(differenceLon / 2) * Math.sin(differenceLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Distance in miles, rounded to the nearest whole number
  return distance.toFixed(0)
}
