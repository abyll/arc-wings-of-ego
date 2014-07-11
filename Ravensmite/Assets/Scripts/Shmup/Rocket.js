#pragma strict

var speed: float;
var damage: float=10.0f;
var proximity: float=0.2f;
//var innerRadius: float=2.0f;
var radius: float=8.0f;
var power: float= 500F;
//var minForce: float 600f;
var canHurtOwner: boolean = false;
var canHurtTeam: boolean = false;
var owner: GameObject;
var team: String;
var target: Vector3;
var explosion: ParticleEmitter;
private var container: Transform;
private var exploded: boolean = false;


function Start () {
	container = GameObject.Find("BulletCont").transform;
	transform.parent = container;
}

function FixedUpdate () {
	rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
	if(Vector3.Distance(target, transform.position) < proximity) {
		Explode();
	} else {
	}
}

function OnTriggerEnter(collision: Collider) {
	var collObj: GameObject;
	if(exploded)
		return;
	try {
		collObj = collision.transform.parent.gameObject;
	} catch (e) {
		collObj = collision.transform.gameObject;
	}
	if(collObj.CompareTag("Bullet"))
		return;
	if(!canHurtOwner && collObj == owner)
		return;
	if(!canHurtTeam && collObj.CompareTag(team))
		return;
	exploded = true;
	Explode();
	try {
		collObj.GetComponent(Life).Damage(damage);
	} catch(e){}
	
}

function Explode() {
	// and apply force and damage to any objects within range,
	// blasting in opposite direction
	
	var flame = Instantiate(explosion, transform.position, transform.rotation);
	flame.transform.parent = container;
	// Applies an explosion force to all nearby rigidbodies
	var explosionPos : Vector3 = transform.position;
	
	var layermask:int = (1)|(1<<8)|(1<<11);
	var colliders : Collider[] = Physics.OverlapSphere (explosionPos, radius, layermask);
	
	for (var hit : Collider in colliders) {
		if (hit && hit.rigidbody) {
			//Debug.Log(Vector3.Distance(transform.position, hit.transform.position));
			//Debug.DrawLine(transform.position, hit.transform.position, Color.red, 5.0);
			if(hit.collider.bounds.Contains(transform.position)) // AddExplosion breaks when the point is inside target collider
				hit.rigidbody.AddForceAtPosition((hit.transform.position - transform.position).normalized / Vector3.Distance(hit.transform.position,transform.position) * 2f * power, transform.position, ForceMode.Impulse); //
			else
				hit.rigidbody.AddExplosionForce(power, transform.position, radius, 0.0, ForceMode.Impulse);
		}
	}
	Destroy(gameObject);
}

