/* Go game server in Node.js
 */

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var GAMES = [];

this.server = express();
this.server.use(bodyParser.json());

this.server.route('/')
    .get((req, res) => {
        res.set('Content-Type', 'application/json');
        res.status(200).json({'status': 'ok'});
    });

this.server.route('/games')
    .get((req, res) => {
        res.set('Content-Type', 'application/json');
        res.status(200).json({'games': GAMES});
    })
    .post((req, res) => {
        var newGame = {
            'id': GAMES.length + 1,
            'game-owner': req.body['game-owner'],
            'game-challenger': req.body['game-challenger']
        };

        GAMES.push(newGame);

        res.set('Content-Type', 'application/json');
        res.status(200).json(newGame);
    });
