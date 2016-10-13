var socket = io();//auto-discovery
//////////////////////
///Event Listeners
/////////////////////
	//logs current users
	socket.on("clients connected",function(users){
		console.log(users);
		document.getElementById("users-connected-update").innerHTML = users;
	});
//////////////////////
///Remote Setup
/////////////////////
//Set CLI Command
var device = "Comcast";
var command = "irsend SEND_ONCE "+device+" ";
//Sets Remote Buttons After HTML Loads
$(document).ready(function() {
	//Numpad Bindings
	for(var i = 0; i<10; i++){
		setNumPad(i);
	}
});
//////////////////////
///Functions
/////////////////////
//Sets NumPad Keys
function setNumPad(num){
	$( "#button-"+num ).on( "click", function(){remoteCommand("KEY_"+num);});
}
//sends ir signal command
function remoteCommand(buttonPressed){
    socket.emit('remoteCommand', command+buttonPressed);
}


