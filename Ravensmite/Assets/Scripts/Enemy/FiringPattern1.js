// Shoot straight forward, and randomly shoot toward player.

#pragma strict

var bullet: Transform;
var fireRate: float = 0.4;	// seconds between bullets
var target: GameObject;
var accuracy: float = 0.4;	// probability of shooting at player
var cof: float = 10.0; 		// cone of fire, or random deviation from 'perfect' shot
private var next_shot: float;


function Start () {
	next_shot = Time.time + fireRate * 1.5; // delay before first shot.
	target = GameObject.FindWithTag("Player");
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
	{ // fire straight
		rotation = transform.rotation;
	}
	var newbullet : Transform = Instantiate(bullet, transform.position, rotation);
	newbullet.GetComponent(Bullet).owner = this.gameObject;
	newbullet.GetComponent(Bullet).team = "Enemy";
}