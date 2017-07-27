'use latest';

module.exports = (context, cb) => {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDV24grNHHk2P6syByMfmMJOTD-7txqX6k',
    Promise: Promise
  })
  
  const { placeId } = context.data;
  
  return googleMapsClient.places({ placeId: placeId }).asPromise()
    .then(response => cb(null, response))
    .catch(cb);
};
