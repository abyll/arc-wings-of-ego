#pragma strict

var playerDataContainer : PlayerDataContainer;
var defaultPort : int = 33971;

var serverPassword : String = "";
var serverIP : String = "";

var generalStyle : GUIStyle;
var disabledStyle : GUIStyle;

private var characterName : String = "";
private var serverPort : int ;
private enum MenuScreen { Main, Multiplayer, MPHost, MPClient, CharacterSelect, MissionSelect}

private var currentMenu: MenuScreen = MenuScreen.Main;


private var players = [4];
class Player {
	var playerName : String;
	var networkPlayer : NetworkPlayer;
}

function Start () {

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
		switch (currentMenu)
		{
		case(MenuScreen.Main) :
			if( GUILayout.Button("Character Select") )
				currentMenu = MenuScreen.CharacterSelect;
			if( GUILayout.Button ( "Mission Select" ) )
				currentMenu = MenuScreen.MissionSelect;
			if ( GUILayout.Button ( "Multiplayer" ) )
			{
				currentMenu = MenuScreen.Multiplayer;
			}
			if( GUILayout.Button ( "Exit" ) )
				Application.Quit ();
			break;
		case(MenuScreen.Multiplayer) :
			if ( GUILayout.Button ( "Host" ) ) {
				currentMenu = MenuScreen.MPHost;
			}
			else if ( GUILayout.Button ( "Join" ) ) {
				currentMenu = MenuScreen.MPClient;
			}
			else if ( GUILayout.Button ( "Back" ) ) {
				currentMenu = MenuScreen.Main;
			}
			break;
		case (MenuScreen.MPHost):
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
				currentMenu = MenuScreen.Multiplayer;
			}
			break;
		case (MenuScreen.MPClient) :
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
				currentMenu = MenuScreen.Multiplayer;
			}
			break;
		case MenuScreen.CharacterSelect:
			GUILayout.BeginHorizontal ();
			GUILayout.Label ( "Name", generalStyle );
			characterName = GUILayout.TextField ( characterName, 20 );
			GUILayout.EndHorizontal ();
			if (GUILayout.Button("Load/Create")) {
				// Try to load <name>.xml
				// Create new on load fail (file doesn't exist, most likely)
				
				try {
					var playerData = PlayerData.Load(characterName);
					playerDataContainer.playerData = playerData;
					Debug.Log("Loaded Player");
				} catch(e) {
					Debug.Log("Load Failed; creating new");
					playerDataContainer.playerData.name = characterName;
					playerDataContainer.playerData.missionProgress.Add(new MissionData(0));
					// Eventually add all missions
					// Missions will be indexed by their scene # - 1, due to 0-indexing
				}
				currentMenu = MenuScreen.MissionSelect;
			}
			if (GUILayout.Button("Back"))
				currentMenu = MenuScreen.Main;
			break;
		case MenuScreen.MissionSelect:
			if(GUILayout.Button("Mission 1")) {
				DontDestroyOnLoad(playerDataContainer);
				Application.LoadLevel("TestScene");
			}
			if(playerData != null) {
				if(playerDataContainer.playerData.missionProgress.Count>=1) {
					var mission = (playerDataContainer.playerData.missionProgress[0]);
					if(mission.complete)
						GUILayout.Button("Mission 2");
				}
			}
			if (GUILayout.Button("Back"))
				currentMenu = MenuScreen.Main;
			break;
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