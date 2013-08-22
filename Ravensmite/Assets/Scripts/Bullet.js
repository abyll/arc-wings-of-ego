#pragma strict

var speed: float;
var damage: float=1;
var owner: GameObject;
var team: String;
var canHurtOwner: boolean = false;
var canHurtTeam: boolean = false;

function Start () {
	
}

function Update () {
	rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
}

function OnTriggerEnter(collision: Collider) {
	var collObj = collision.transform.parent.gameObject;
	if(collObj == null || collObj == owner || collObj.CompareTag(team) || collObj.CompareTag("Bullet"))
		return;
	//Debug.Log("Shot a " + collision.gameObject.name);
	collObj.GetComponent(Life).Damage(damage);
	Destroy(gameObject);
}