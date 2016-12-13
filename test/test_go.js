var chai = require('chai');
var chaiHttp = require('chai-http');
var http = require('http');
var go = require('../lib/go');

var assert = chai.assert;

chai.use(chaiHttp);

describe('go.js', function() {
    var server = undefined;

    before(function() {
        server = go.server.listen(8080);
    });

    after(function() {
        server.close();
    });

    describe('/', function() {
        it('expect server reply with status "ok"', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    var data = JSON.stringify(res.body);
                    var expect = JSON.stringify({'status': 'ok'});
                    assert.equal(res.status, 200);
                    assert.equal(data, expect);
                    done();
                });
        });
    });

    describe('/games', function() {
        it('expect empty list of games', (done) => {
            chai.request(server)
                .get('/games')
                .end((err, res) => {
                    var data = JSON.stringify(res.body);
                    var expect = JSON.stringify({'games': []});
                    assert.equal(res.status, 200);
                    assert.equal(data, expect);
                    done();
                })
        });

        it('expect new game in list of games', (done) => {
            chai.request(server)
                .post('/games')
                .send({'game-owner': 'user1', 'game-challenger': 'user2'})
                .end((err, res) => {
                    var data = JSON.stringify(res.body);
                    var expect = JSON.stringify({
                        'id': 1,
                        'game-owner': 'user1',
                        'game-challenger': 'user2'
                    });
                    assert.equal(res.status, 200);
                    assert.equal(data, expect);

                    chai.request(server)
                        .get('/games')
                        .end((err, res) => {
                            var data = JSON.stringify(res.body);
                            var expect = JSON.stringify({
                                'games': [
                                    {
                                        'id': 1,
                                        'game-owner': 'user1',
                                        'game-challenger': 'user2'
                                    }
                                ]
                            });
                            assert.equal(res.status, 200);
                            assert.equal(data, expect);

                            done();
                        });
                });
        });

        it('expect new game with different users in list of games', (done) => {
            chai.request(server)
                .post('/games')
                .send({'game-owner': 'user3', 'game-challenger': 'user4'})
                .end((err, res) => {
                    var data = JSON.stringify(res.body);
                    var expect = JSON.stringify({
                        'id': 2,
                        'game-owner': 'user3',
                        'game-challenger': 'user4'
                    });
                    assert.equal(res.status, 200);
                    assert.equal(data, expect);

                    done();
                });
        });
    });
});
