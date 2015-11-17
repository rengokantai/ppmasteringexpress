/**
 * Created by Hernan Y.Ke on 2015/11/16.
 */
var expect = require('expect.js');
var Instagram = require('../lib/instagram');

var ig = new Instagram("id","pass");
var ig2 =new Instagram('2d880c21672b4094aa86ef98c7a03064','8e905af2b92144aeae757ada649ab7ab');

ig.get_most_popular = function(cb){
    return cb(null,{"data":"incoming"},3);
}
describe("credentials",function(){
    it("should be same id", function(){
        expect(ig.getClientId()).to.be("id");
    });
    it("should be same secret", function(){
        expect(ig.getClientSecret()).to.be("pass");
    });
    it("get media",function(done){
            ig.get_most_popular(function(err,media,limit){
                expect(err).to.be(null);
                expect(media).to.be.an('object');
                expect(media).to.eql({"data":"incoming"});
                expect(limit).to.equal(3);
                done();
            });
        });

});

