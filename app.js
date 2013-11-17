  express = require('express');

  app = express();

  http = require('http');

  app.configure(function() {

    app.set('port', process.env.PORT || 3000);
    // app.set('views', __dirname + '/views');
    // app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.cookieParser());

    app.use(app.router);

    path = require('path');

    app.use(express.static(path.join(__dirname, 'public')));

  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  server = http.createServer(app).listen(app.get('port'), function() {

    console.log("Express server listening on port " + app.get('port'));

    console.log('Running Node Version: ' + process.version);
  });

  io = require('socket.io').listen(server);

  io.set('log level', 0);

  io.on('connection', function (client) {

  	// Do Login Event

    console.log('Client Connected');

    client.on('message', function(message) {

      console.log('Message Received');

      message.sender = client.id;

      client.emit('message', message);

    });

  	client.on('disconnect', function() {
  		// Do Disconnect Event
    });

  });