'use strict';
var loopback = require('loopback');

var ds = loopback.createDataSource({
  connector: 'rest',
  strictSSL: false,
  debug: false,
  defaults: {
    'headers': {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        'method': 'GET',
        'url': 'http://maps.googleapis.com/maps/api/geocode/{format=json}',
        'query': {
          'address': '{street},{city},{zipcode}',
          'sensor': '{sensor=false}',
        },
        'options': {
          'strictSSL': true,
          'useQuerystring': true,
        },
        'responsePath': '$.results[0].geometry.location',
      },
      functions: {
        'geocode': ['street', 'city', 'zipcode'],
      },
    },
  ]});

var model = ds.createModel('dummy');

var loc = {
  street: 'Bedok Reservoir road',
  city: 'Singapore',
  zipcode: '479250',
};

model.geocode(loc.street, loc.city, loc.zipcode,  (err, result) =>{
  if (result && result[0]) {
    console.log(result[0]);
  }
});
