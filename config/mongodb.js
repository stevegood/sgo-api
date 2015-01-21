var mongoskin = require('mongoskin');

var mongo = {
    url: function(name) {
        var mongourl;
        if(process.env.VCAP_SERVICES){
            //app is running in cloud foundry
            var svcs = JSON.parse(process.env.VCAP_SERVICES);
            mongourl = svcs['mongolab'][0].credentials.uri;
        }
        else{
            //running locally or not on cloud foundry
            mongourl = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/'+name);
        }
        return mongourl;
    },

    db: function(name) {
        return mongoskin.db(mongo.url(name), {safe: true});
    }
};

module.exports = mongo;