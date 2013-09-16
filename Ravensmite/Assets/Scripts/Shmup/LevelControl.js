#pragma strict
var scrolls = false;
var scrollSpeed: float = 8.5;
var pathtime: float =10;
var pathscript: iTweenPath;
//private var path: Array;
function Start () {
	var path = pathscript.nodes.ToArray();
	//if (!scrolls)
		//iTween.MoveTo(gameObject, iTween.Hash("path", path,"time",pathtime,"easetype","linear"));
}

function Update () {
	if(scrolls)
		rigidbody.MovePosition(transform.position + Vector3(0, 0, scrollSpeed * Time.deltaTime));
	else {
	}
}