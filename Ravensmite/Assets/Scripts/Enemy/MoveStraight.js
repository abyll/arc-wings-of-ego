// Move forward at set speed. Despawn when off screen
#pragma strict

public var speed: float=0.2;


function Start () {

}

function Update () {
	rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
}