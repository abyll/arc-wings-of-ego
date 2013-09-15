#pragma strict

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
	var verticalOffset = buttonHeight + 10;
	
	if(GUI.Button( new Rect( Screen.width / 2 - horizontalOffset, Screen.height / 2 , buttonWidth, buttonHeight), "Start Game"))
		Application.LoadLevel("TestScene");
	else if(GUI.Button( new Rect( Screen.width / 2 - horizontalOffset, Screen.height / 2 + verticalOffset, buttonWidth, buttonHeight), "Exit" ))
		Application.Quit();
}