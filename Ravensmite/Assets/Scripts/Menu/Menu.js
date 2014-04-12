#pragma strict
var defaultPort : int = 33971;

var serverPassword : String = "";
var serverIP : String = "";
var serverPort : int ;

var mainMenu : boolean = true;
var mpMenu : boolean = false;
var hostMenu : boolean = false;
var clientMenu : boolean = false;

var generalStyle : GUIStyle;

private var players = [4];
class Player {
	var playerName : String;
	var networkPlayer : NetworkPlayer;
}

function Start () {

}

function Update () {

}

function OnGUI() {
	// Button dimension
	var buttonWidth = 300;
	var buttonHeight = 50;
	
	// Button positioning
	var horizontalOffset = buttonWidth / 2;
	
	if ( Network.peerType == NetworkPeerType.Disconnected ) {
		GUILayout.BeginArea ( new Rect ( Screen.width / 4, Screen.height / 2, Screen.width / 2, Screen.height / 2 ) );
		GUILayout.BeginVertical ();
		
		if ( mainMenu ) 
		{
			if( GUILayout.Button ( "Start Game" ) )
				Application.LoadLevel ("TestScene");
			if ( GUILayout.Button ( "Multiplayer" ) )
			{
				mpMenu = true;
				mainMenu = false;
			}
			if( GUILayout.Button ( "Exit" ) )
				Application.Quit ();
		} 
		else if ( mpMenu ) 
		{
			if ( GUILayout.Button ( "Host" ) ) {
				hostMenu = true;
				mpMenu = false;
			}
			else if ( GUILayout.Button ( "Join" ) ) {
				clientMenu = true;
				mpMenu = false;
			}
			else if ( GUILayout.Button ( "Back" ) ) {
				mainMenu = true;
				mpMenu = false;
			}
		}
		else if ( hostMenu ) {
			GUILayout.BeginHorizontal ();
			GUILayout.Label ( "Password", generalStyle );
			serverPassword = GUILayout.TextField ( serverPassword );
			GUILayout.EndHorizontal ();
			
			if ( GUILayout.Button ( "Start Server" ) ) 
			{
				Network.InitializeServer( 4, defaultPort, true );
			}
			if ( GUILayout.Button ( "Back" ) )
			{
				mpMenu = true;
				hostMenu = false;
			}
		}
		else if ( clientMenu ) {
			GUILayout.BeginHorizontal ();
			GUILayout.Label ( "Server IP", generalStyle );
			serverIP = GUILayout.TextField ( serverIP, 15 );
			GUILayout.EndHorizontal ();
			
			GUILayout.BeginHorizontal ();
			GUILayout.Label ( "Password", generalStyle );
			serverPassword = GUILayout.TextField ( serverPassword );
			GUILayout.EndHorizontal ();
			
			if ( GUILayout.Button ( "Join" ) ) 
			{
				if ( serverIP == "" )
					serverIP = "127.0.0.1";
				Network.Connect ( serverIP, defaultPort );
			}
			if ( GUILayout.Button ( "Back" ) ) {
				mpMenu = true;
				clientMenu = false;
			}
		}
		
		GUILayout.EndVertical ();
		GUILayout.EndArea ();
	}
	else {
		if ( Network.peerType == NetworkPeerType.Connecting ) {
			GUILayout.Label ( "Connecting", generalStyle );
		}
		else if ( Network.peerType == NetworkPeerType.Client ) {
			GUILayout.Label ( "Connected as client.", generalStyle );
		}
		else if ( Network.peerType == Network.peerType.Server ) {
			GUILayout.Label ( "Acting as server.", generalStyle);
		}
		
		if ( GUILayout.Button ( "Disconnect" ) ) {
			Network.Disconnect( 1000 );
		}
	}
}

// Client
function OnConnectedOnServer () {
	Debug.Log ( "A client has connected to the server." );
}

function OnDisconnectedFromServer ( info : NetworkDisconnection ) {
	Debug.Log ( "A client has disconnected from the server." );
}

function OnFailedToConnect ( error : NetworkConnectionError ) {
	Debug.Log ( "Could not connect to a server: " + error );
}

// Server
function OnPlayerConnected ( player : NetworkPlayer ) {
	Debug.Log ( "Player connected." );
}

function OnServerInitialized () {
	Debug.Log ( "Server is ready." );
}

function OnPlayerDisconnected ( player : NetworkPlayer ) {
	Debug.Log ( "Player disconnected." );
}