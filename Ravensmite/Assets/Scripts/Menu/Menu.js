#pragma strict

function Start () {

}

function Update () {

}

function OnGUI() {
	if(GUI.Button(Rect(10,10,300,50), "Start Game"))
		Application.LoadLevel("TestScene");
}