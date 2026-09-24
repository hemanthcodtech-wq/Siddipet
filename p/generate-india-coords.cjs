const https = require('https');
const d3Geo = require('d3-geo');

const CITIES = [
  { label: 'Siddipet',      lat: 18.1018, lon: 78.8521, state: 'Telangana',      time: 'Origin', color: '#F59E0B' },
  { label: 'Hyderabad',     lat: 17.3850, lon: 78.4867, state: 'Telangana',      time: 'Same Day',  color: '#34D399' },
  { label: 'Warangal',      lat: 17.9689, lon: 79.5941, state: 'Telangana',      time: 'Same Day',  color: '#34D399' },
  { label: 'Bengaluru',     lat: 12.9716, lon: 77.5946, state: 'Karnataka',      time: '1 Day',     color: '#60A5FA' },
  { label: 'Chennai',       lat: 13.0827, lon: 80.2707, state: 'Tamil Nadu',     time: '1 Day',     color: '#60A5FA' },
  { label: 'Pune',          lat: 18.5204, lon: 73.8567, state: 'Maharashtra',    time: '2 Days',    color: '#F59E0B' },
  { label: 'Mumbai',        lat: 19.0760, lon: 72.8777, state: 'Maharashtra',    time: '2 Days',    color: '#F59E0B' },
  { label: 'Ahmedabad',     lat: 23.0225, lon: 72.5714, state: 'Gujarat',        time: '2 Days',    color: '#F59E0B' },
  { label: 'Delhi',         lat: 28.7041, lon: 77.1025, state: 'NCR',            time: '2 Days',    color: '#F472B6' },
  { label: 'Visakhapatnam', lat: 17.6868, lon: 83.2185, state: 'Andhra Pradesh', time: 'Next Day',  color: '#60A5FA' },
  { label: 'Kolkata',       lat: 22.5726, lon: 88.3639, state: 'West Bengal',    time: '3 Days',    color: '#C084FC' },
  { label: 'Patna',         lat: 25.5941, lon: 85.1376, state: 'Bihar',          time: '2 Days',    color: '#C084FC' },
  { label: 'Goa',           lat: 15.2993, lon: 74.1240, state: 'Goa',            time: '2 Days',    color: '#F59E0B' },
  { label: 'Lucknow',       lat: 26.8467, lon: 80.9462, state: 'Uttar Pradesh',  time: '2 Days',    color: '#F472B6' },
  { label: 'Jaipur',        lat: 26.9124, lon: 75.7873, state: 'Rajasthan',      time: '2 Days',    color: '#F472B6' }
];

https.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/IND.geo.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const geojson = JSON.parse(data);
    
    // Fit size and create projection
    const projection = d3Geo.geoMercator().fitExtent([[30, 20], [470, 500]], geojson);
    const pathGenerator = d3Geo.geoPath().projection(projection);
    
    const svgPath = pathGenerator(geojson);
    
    console.log("const INDIA_PATH = `" + svgPath + "`;\n");
    
    CITIES.forEach(city => {
        const [x, y] = projection([city.lon, city.lat]);
        console.log(`{ x: ${Math.round(x)}, y: ${Math.round(y)}, label: '${city.label}', state: '${city.state}', time: '${city.time}', color: '${city.color}' },`);
    });
  });
});
