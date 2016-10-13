//Inital Variables
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
////////////////////
//EXPRESS SERVER
////////////////////
  //Define Public Dir
  app.use(express.static('public'));
  //Server Set Up
  var port = 8000
  http.listen(port,function(){
    console.log('Server Initiated' );
  });
////////////////////
//SOCKETS
////////////////////
var clients = [];
io.on('connection', function(socket){
  /////////////////////////////////
  //On  Connection/////////////
    clients.push(socket.id);
    console.log('A user has connected');
    if(clients.length == null)
      console.log("Current Users: 0");
    else
      console.log("Current Users: " + clients.length);
    io.emit('clients connected', clients.length);//update client's user count
  /////////////////////////////
  //On Disconnection//////
    socket.on('disconnect', function(){
      for(var i = 0; i < clients.length; i++){
        if(clients[i] == socket.id){
          clients.splice(i,1);
        }
      }
      console.log('A user has disconnected');
      if(clients.length == null)
        console.log("Current Users: 0");
      else
        console.log("Current Users: " + clients.length);
      io.emit('clients connected', clients.length);//update client's user count
    });
  /////////////////////////////
  //TV Control////////////////
    //Set CLI variable
    var exec = require('child_process').exec;
    //Event Listener
    socket.on('remoteCommand', function(command){
      var cmd = command;//set cmd command
      console.log(cmd);//log button pressed
      //Execute Command
      exec(cmd, function(error, stdout, stderr) {});
    });
});
