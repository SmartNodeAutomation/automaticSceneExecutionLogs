let mongoose = require('mongoose');
let Schema = mongoose.Schema;


const internalUse = Schema({
    email: {type: String},
  	time: {type: String},
    node: {type: String},
    slave:{type: String},
    cmd:{type:Object}
});

module.exports = mongoose.model('appinternalUse', internalUse);
