var socket = io();//auto-discovery
$(document).ready(function() {
//////////////////////
///Event Listeners
/////////////////////
	//logs current users
	socket.on("clients connected",function(users){
		console.log(users);
		document.getElementById("users-connected-update").innerHTML = users;
	});
//////////////////////
///Navigation Setup
/////////////////////
	currentNav = "#nav-item1";//initial tab
	currentLayout = "#numpad-layout";//initial content
	$(currentLayout).show();//unhide initial content

	$("#nav-item1").on("click", function(){changeLayout("#nav-item1","#numpad-layout");});
	$("#nav-item2").on("click", function(){changeLayout("#nav-item2","#controls-layout");});
//////////////////////
///Remote Setup 
/////////////////////
	//Set CLI Command
	var device = "Comcast";
	var command = "irsend SEND_ONCE "+device+" ";

	//Numpad Bindings
	for(var i = 0; i<10; i++){
		setNumPad(i);
	}
	//Misc
	$( "#button-power" ).on( "click", function(){remoteCommand("KEY_POWER");});
	$( "#button-info" ).on( "click", function(){remoteCommand("KEY_INFO");});
	$( "#button-last" ).on( "click", function(){remoteCommand("KEY_Last");});
	$( "#button-enter" ).on( "click", function(){remoteCommand("KEY_Enter");});
	//Channel Control
	$( "#button-channel-up" ).on( "click", function(){remoteCommand("KEY_CHANNELUP");});
	$( "#button-channel-down" ).on( "click", function(){remoteCommand("KEY_CHANNELDOWN");});
	//volume control
	$( "#button-mute" ).on( "click", function(){remoteCommand("KEY_MUTE");});
	$( "#button-volume-up" ).on( "click", function(){remoteCommand("KEY_VOLUMEUP");});
	$( "#button-volume-down" ).on( "click", function(){remoteCommand("KEY_VOLUMEDOWN");});
	//Movement Keys
	$( "#button-ok" ).on( "click", function(){remoteCommand("KEY_OK");});
	$( "#button-up" ).on( "click", function(){remoteCommand("KEY_UP");});
	$( "#button-down" ).on( "click", function(){remoteCommand("KEY_DOWN");});
	$( "#button-left" ).on( "click", function(){remoteCommand("KEY_LEFT");});
	$( "#button-right" ).on( "click", function(){remoteCommand("KEY_RIGHT");});
	//Missing KEY_GUIDE....
	//Missing KEY_EXIT.....

//////////////////////
///Functions
/////////////////////
	//Changes Controls (updates nav and current buttons shown)
	function changeLayout(nav, layout){
		if(currentNav != nav){
			$(currentNav).css( "background-color", "transparent" );
			currentNav = nav;
			$(currentNav).css( "background-color", "rgba(255, 255, 255, 0.50)" );

			$(currentLayout).hide();
			currentLayout = layout;
			$(currentLayout).show();
		}
	}
	//Sets NumPad Keys
	function setNumPad(num){
		$( "#button-"+num ).on( "click", function(){remoteCommand("KEY_"+num);});
	}
	//sends ir signal command
	function remoteCommand(buttonPressed){
	    socket.emit('remoteCommand', command+buttonPressed);
	}
});


