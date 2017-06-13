'use strict';

module.exports = function(BikeUsage) {
     BikeUsage.afterRemote('create', function(context, bikeusage, next) {
      
        BikeUsage.app.models.bike.findById(bikeusage.__data.bikeId,
     function(err, bike) {
       bike.updateAttribute("status","R");
       next();
     }
        );
     });
     BikeUsage.afterRemote('replaceById', function(context, bikeusage, next) {
         console.log(bikeusage)
        BikeUsage.app.models.bike.findById(bikeusage.__data.bikeId,
     function(err, bike) {
   
       bike.updateAttribute("status","A");
       next();
     }
        );
     });
};
