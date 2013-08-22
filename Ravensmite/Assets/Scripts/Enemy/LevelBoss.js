#pragma strict

function Start () {

}

function Update () {

}


function Die() { // Boss Death
	Debug.Log("You won!");
	Destroy(gameObject);
	Application.LoadLevel("MainMenu");
}