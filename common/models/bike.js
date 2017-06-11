'use strict';

module.exports = function(Bike) {
 Bike.nearby = function(loc, cb) {
     
	     Bike.find({where: {
          location: {
           near: loc,
             maxDistance: 100
          }
        }
    }, function(err, bike) {
   
      if (err) 
      cb(err,null)
        else
            cb(null, bike);
    });
  };

  Bike.remoteMethod('nearby', {
	      accepts: {arg: 'loc', type: 'GeoPoint'},
          returns: {arg: 'nearby', type: ['Bike'],root: true}
	    });
};
