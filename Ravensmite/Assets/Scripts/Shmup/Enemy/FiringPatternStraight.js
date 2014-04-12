// Shoot straight forward, or occasionally at player.

#pragma strict

var bullet: Transform;
var fireRate: float = 0.4;	// seconds between bullets
var target: GameObject;
var accuracy: float = 0.4;	// probability of shooting at player
var cof: float = 10.0; 		// cone of fire, or random deviation from 'perfect' shot
private var next_shot: float;
private var container: Transform;


function Start () {
	next_shot = Time.time + fireRate * 1.5; // delay before first shot.
	target = GameObject.FindWithTag("Player");
	container = GameObject.Find("BulletCont").transform;
}

function Update () {
	if(Time.time > next_shot) {
		next_shot = Time.time + fireRate;
		Shoot();
	}
}

function Shoot() {
	var rotation: Quaternion;
	if(Random.value < accuracy)
	{ // Aim at player a third of the time
		var relativePos = target.transform.position - transform.position;
		rotation = Quaternion.LookRotation(relativePos);
		//rotation.EulerAngles
	} else
	{ // fire straight, with CoF
		var angle = Random.Range(-cof, cof);
		rotation = transform.rotation;
		rotation = Quaternion.Euler(rotation.eulerAngles.x + angle, rotation.eulerAngles.y, rotation.eulerAngles.z);
	}
	var newbullet : Transform = Instantiate(bullet, transform.position+Vector3(0,0,-8), rotation);
	newbullet.GetComponent(Bullet).owner = gameObject;
	newbullet.GetComponent(Bullet).team = "Enemy";
		newbullet.parent = container;
}