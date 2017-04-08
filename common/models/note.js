module.exports = function(Note) {
	Note.greet = function(msg, cb) {
	      cb(null, 'Greetings... ' + msg);
	    }

	    Note.remoteMethod('greet', {
	          accepts: {arg: 'msg', type: 'string'},
	          returns: {arg: 'greeting', type: 'string'}
	    });
	  
};
