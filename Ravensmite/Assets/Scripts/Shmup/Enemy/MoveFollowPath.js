// Move forward at set speed. Despawn when off screen
#pragma strict

public var speed: float=0.2;
var pathscript: iTweenPath;

function Start () {
	var path = pathscript.nodes.ToArray();
	iTween.MoveTo(gameObject, iTween.Hash("path", path,"time",8,"easetype","linear","orienttopath",true));
}

function Update () {
	//iTween.MoveTo(gameObject, Vector3(0, 5, 7), 4);
	
	//rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
}