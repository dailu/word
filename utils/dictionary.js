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
        'url': 'http://api.pearson.com/v2/dictionaries/ldoce5/entries',
        'query': {
          'headword': '{headword}',
        },
        'options': {
          'strictSSL': true,
          'useQuerystring': true,
        },
        'responsePath': '$.results[0]',
      },
      functions: {
        'mean': ['headword'],
      },
    },
  ]});

var model = ds.createModel('dummy');

model.mean('goodbye',  (err, result) => {
  if (result && result[0]) {
    console.log(result[0].pronunciations[0].audio[0].url);
    console.log(result[0].senses[0].examples[0].text);
    console.log(result[0].senses[0].definition[0]);
  }
});
