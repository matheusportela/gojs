/* Go game server in Node.js
 */

var express = require('express');
var http = require('http');

var GAMES = [];

this.server = express();

this.server.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).json({'status': 'ok'});
});

this.server.get('/games', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.status(200).json({'games': GAMES});
});

this.server.post('/games', (req, res) => {
    var newGame = {
        'id': GAMES.length + 1,
        'game-owner': 'user1',
        'game-challenger': 'user2'
    };

    GAMES.push(newGame);

    res.set('Content-Type', 'application/json');
    res.status(200).json(newGame);
});