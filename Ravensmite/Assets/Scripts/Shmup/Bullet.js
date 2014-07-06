#pragma strict

var speed: float;
var damage: float=1;
var owner: GameObject;
var team: String;
var canHurtOwner: boolean = false;
var canHurtTeam: boolean = false;
private var container: Transform;
var explosion: ParticleEmitter;


function Start () {
	container = GameObject.Find("BulletCont").transform;
	transform.parent = container;
}

function Update () {
	rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
}

function OnTriggerEnter(collision: Collider) {
	var collObj: GameObject;
	try {
		collObj = collision.transform.parent.gameObject;
	} catch (e) {
		collObj = collision.transform.gameObject;
	}
	if(!canHurtOwner && collObj == owner)
		return;
	if(!canHurtTeam && collObj.CompareTag(team)) //if(collObj == null || collObj == owner || collObj.CompareTag(team) || collObj.CompareTag("Bullet"))
		return;
	//Debug.Log("Shot a " + collision.gameObject.name);
	
	// Flame effect on bullet collision
	var flame = Instantiate(explosion, transform.position, transform.rotation);
	flame.transform.parent = container;
	
	try {
		collObj.GetComponent(Life).Damage(damage);
	} catch(e){}
	Destroy(gameObject);
}