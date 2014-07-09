#pragma strict
var scrolls = false;
var follow_path = false;
var invert = true;
var scrollSpeed: float = 8.5;
var pathtime: float = 10;
var pathscript: iTweenPath;
private var path: Vector3[];

function Start () {
	path = pathscript.nodes.ToArray();
	if (invert) {
		for(var i=0; i<path.length; i++)
			path[i] = -path[i];
	}
	if (scrolls && follow_path)
		iTween.MoveTo(gameObject, iTween.Hash("path",path, "speed",scrollSpeed, "easetype","EaseOutQuart"));
}
/*
function Update () {
	if(scrolls && !follow_path)
		rigidbody.MovePosition(transform.position + Vector3(0, 0, scrollSpeed * Time.deltaTime));
	else {
	}
}*/

function EndLevel() {
	Debug.Log("You won!");
	var playerData = GameObject.FindGameObjectWithTag("PlayerDataContainer").GetComponent(PlayerDataContainer).playerData;
	var mission = (playerData.missionProgress[Application.loadedLevel-1]);
	mission.complete = true;
	playerData.Save();
	Application.LoadLevel("MainMenu");
}