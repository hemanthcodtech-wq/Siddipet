const https = require('https');
const d3Geo = require('d3-geo');

https.get('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/IND.geo.json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const geojson = JSON.parse(data);
    
    // Fit size to 400x480 (leaving some margin)
    // We will offset it slightly to center it in the 500x520 map we have
    const projection = d3Geo.geoMercator().fitExtent([[50, 20], [450, 500]], geojson);
    const pathGenerator = d3Geo.geoPath().projection(projection);
    
    const svgPath = pathGenerator(geojson);
    
    console.log(svgPath);
  });
});
