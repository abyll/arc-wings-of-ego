#pragma strict

function Start () {

}

function Update () {

}

function Die() { // Boss Death
	Destroy(gameObject);
	GameObject.FindGameObjectWithTag("Level").SendMessage("EndLevel");
}