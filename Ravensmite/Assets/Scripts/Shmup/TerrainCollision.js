#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision: Collision) {
	Debug.Log(collision.gameObject.name + "hit terrain");
	var dmg:float = collision.relativeVelocity.magnitude * 80f;
	//Debug.Log("Dmg: " + dmg);
	try{
		collision.gameObject.SendMessage("Damage", dmg);
	} catch(e) {}
	//collision.gameObject.transform.position -= collision.relativeVelocity * 1.5;
}