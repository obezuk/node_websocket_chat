  express = require('express');

  app = express();

  http = require('http');

  redis = require("redis").createClient();
  
  redis.on("error", function (err) {
    console.log("Error " + err);
  });

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

    redis.zrange('messages', 0, -1, function(err, data) {

      if (err) {
        console.log(err);
      } else {
        // console.log(data);

        for (var d in data) {

          // console.log(data[d]);

          // console.log(typeofdata[d]);

          i = JSON.parse(data[d]);

          client.emit('message', i);
        }

      }

    });

    client.on('message', function(message) {

      console.log('Message Received');

      message.sender = client.id;

      io.sockets.emit('message', message);

      key = (new Date().getTime());

      redis.zadd('messages', key, JSON.stringify(message));

    });

  	client.on('disconnect', function() {
  		// Do Disconnect Event
    });

  });