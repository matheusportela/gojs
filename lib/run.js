var go = require('./go')

go.server.listen(8080, function() {
    console.log('Server listening to http://localhost:8080');
});