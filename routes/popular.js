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
/* GET users listing. */
router.get('/', function(req, res, next) {
    ig.media_popular(function(err,media,limit){
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