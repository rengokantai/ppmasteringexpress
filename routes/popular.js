/**
 * Created by Hernan Y.Ke on 2015/11/16.
 */
var express = require('express');
var router = express.Router();
var ig=require('instagram-node').instagram();


ig.use({
    client_id:'2d880c21672b4094aa86ef98c7a03064',
    client_secret:'8e905af2b92144aeae757ada649ab7ab'
});
var polular_cache = {};
function get_most_popular(cb) {
    if(popular_cache.media){
        return cb(null, polular_cache.media,popular_cache.limit);
    }
    ig.media_popular(function(err,media,limit){
        polular_cache={
            "media":media,
            "limit":limit
        }
        return cb(err,media,limit);
    });
}
router.get('/', function(req, res, next) {
    get_most_popular()(function(err,media,limit){
        if(err){
            throw err;
        }
        //console.log(media);
        var urls =[];
        for(var i = 0;i<media.length;i++){
            urls.push(media[i].images.standard_resolution.url);
        }
        res.render('popular',{urls:urls})
    });

});

module.exports = router;