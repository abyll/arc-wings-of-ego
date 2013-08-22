// Move forward at set speed. Despawn when off screen
#pragma strict

public var speed: float=0.2;

function Start () {
	var tweenpath = gameObject.GetComponent("iTweenPath") as iTweenPath;
	var path = tweenpath.nodes.ToArray();
	iTween.MoveTo(gameObject, iTween.Hash("path", path,"time",8,"easetype","linear","orienttopath",true));
}

function Update () {
	//iTween.MoveTo(gameObject, Vector3(0, 5, 7), 4);
	
	//rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
}