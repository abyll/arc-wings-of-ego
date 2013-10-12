#pragma strict

var serverPassword : String = "";
var serverIP : String = "";
var serverPort : String = "";

var mainMenu : boolean = true;
var mpMenu : boolean = false;
var hostMenu : boolean = false;
var clientMenu : boolean = false;

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
		GUILayout.Label ( "Password" );
		serverPassword = GUILayout.TextField ( serverPassword );
		GUILayout.EndHorizontal ();
		
		if ( GUILayout.Button ( "Start Server" ) ) 
		{
			
		}
		if ( GUILayout.Button ( "Back" ) )
		{
			mpMenu = true;
			hostMenu = false;
		}
	}
	else if ( clientMenu ) {
		GUILayout.BeginHorizontal ();
		GUILayout.Label ( "Server IP" );
		serverIP = GUILayout.TextField ( serverIP, 15 );
		GUILayout.EndHorizontal ();
		
		GUILayout.BeginHorizontal ();
		GUILayout.Label ( "Password" );
		serverPassword = GUILayout.TextField ( serverPassword );
		GUILayout.EndHorizontal ();
		
		if ( GUILayout.Button ( "Join" ) ) 
		{
			
		}
		if ( GUILayout.Button ( "Back" ) ) {
			mpMenu = true;
			clientMenu = false;
		}
	}
	
	GUILayout.EndVertical ();
	GUILayout.EndArea ();
}