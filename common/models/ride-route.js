'use strict';

module.exports = function(RideRoute) {
RideRoute.updateLocation = function(loc,date,bikeUsageId,bikeId, cb) {  
	 RideRoute.app.models.bike.findById(bikeId,
     function(err, bike) {
    
       bike.updateAttribute("location",loc);
     }
     )
     RideRoute.create({location:loc,updateTime:date,bikeUsageId:bikeUsageId}, function(err, rideroute) {
   
      if (err) 
      cb(err,null)
        else
            cb(null, rideroute);
    });
    
  };

  RideRoute.remoteMethod('updateLocation', {
	      accepts:[ {arg: 'loc', type: 'GeoPoint'},
          {arg:'date',type:'date'},
          {arg:'bikeUsageId',type:'number'},
          {arg:'bikeId',type:'number'}
          ],

          returns: {arg: 'routeId', type: 'number'}
	    });
};
