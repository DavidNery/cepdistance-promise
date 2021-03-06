// https://www.movable-type.co.uk/scripts/latlong.html
export default function distanceBetweenTwoCoords(lat1, long1, lat2, long2) {
  const earthRadius = 6371e3; // meters
  const lat1Radians = lat1 * Math.PI/180; // radians
  const lat2Radians = lat2 * Math.PI/180;
  const deltaLatitude = (lat2-lat1) * Math.PI/180;
  const deltaLongitude = (long2-long1) * Math.PI/180;

  const a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) +
            Math.cos(lat1Radians) * Math.cos(lat2Radians) *
            Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return earthRadius * c;
}