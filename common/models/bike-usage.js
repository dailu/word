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
     BikeUsage.afterRemote('replaceById', function(context, bikeUsage, next) {
         console.log(bikeUsage)
        BikeUsage.app.models.bike.findById(bikeUsage.__data.bikeId,
     function(err, bike) {
      console.log(err);
      console.log(bike);
       bike.updateAttribute("status","A");
       next();
     }
        );
     });
};
