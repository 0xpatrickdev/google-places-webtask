"use latest";

var request = require('request-promise');

const googlePlacesUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/';
const output = 'json';


module.exports = function(context, cb) {
    let lat = context.body.latitude || '40.743';
    let long = context.body.longitude || '-73.987';

    let radius = context.body.radius || '100';
    let location = `${lat},${long}`;
    let key = context.secrets.GOOGLE_MAPS_KEY;

    if (context.body.openNow === true) {
      let onUrl = '&opennow=true';
    } else let onUrl = '';
    
    if (context.body.keyword) {
      let kwUrl = `&keyword=${context.body.keyword}`;
    } else let kwUrl = '';
    
    const request_url = `${googlePlacesUrl}${output}?location=${location}&radius=${radius}${onUrl}${kwUrl}&key=${key}`;
    
    request(request_url, { json: true })
        .then( function(data) {
            if(data && (data.status == 'OK' || data.status == 'ZERO_RESULTS') ) {
                let response = {
                    timestamp: new Date(),
                    latitude: lat,
                    longitude: long,
                    radius: radius,
                    request_url: request_url,
                    results: data.results || []
                };
                cb(null, response);
            } else {
                let error = new Error(`${data.status}${data.error_message ? ':'+data.error_message : ''}`);
                return cb(error);
            }
        })
        .catch( function(error) {
            cb(error);
        });
};