#pragma strict
var scrolls = false;
var follow_path = false;
var scrollSpeed: float = 8.5;
var pathtime: float =10;
var pathscript: iTweenPath;
//private var path: Array;

function Start () {
	var path = pathscript.nodes.ToArray();
	if (scrolls && follow_path)
		iTween.MoveTo(gameObject, iTween.Hash("path",path, "speed",scrollSpeed, "easetype","linear", "LoopType","loop"));
}

function Update () {
	if(scrolls && !follow_path)
		rigidbody.MovePosition(transform.position + Vector3(0, 0, scrollSpeed * Time.deltaTime));
	else {
	}
}

function EndLevel() {
	Debug.Log("You won!");
	Application.LoadLevel("MainMenu");
}