#pragma strict

var speed: float;
var damage: float=1;
var owner: GameObject;
var team: String;
var canHurtOwner: boolean = false;
var canHurtTeam: boolean = false;
var playerFireRate = 0.01;


var explosion: ParticleEmitter;

function Start () {
	
}

function Update () {
	rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
}

function OnTriggerEnter(collision: Collider) {
	try {
		var collObj = collision.transform.parent.gameObject;
	} catch (e) {
		//Placeholder to silence the console
	}
	if(collObj == null || collObj == owner || collObj.CompareTag(team) || collObj.CompareTag("Bullet"))
		return;
	//Debug.Log("Shot a " + collision.gameObject.name);
	
	// Flame effect on bullet collision
	var flame = Instantiate(explosion, transform.position, transform.rotation);
	Destroy(flame, 1);
	
	
	collObj.GetComponent(Life).Damage(damage);
	Destroy(gameObject);
}