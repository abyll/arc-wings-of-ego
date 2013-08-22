#pragma strict

var bullet: Transform;
var fireRate: float = 0.5; // seconds between bullets
var validAngle: float = 10; // angle you're allowed to shoot between, straight ahead of plane.
private var next_shot: float;
private var cam: Camera;

function Start () {

	cam = GameObject.FindGameObjectWithTag("MainCamera").camera;
}

function Update () {

	if(Input.GetButton("Fire1") && Time.time > next_shot) {
		Debug.Log("Shot");
		next_shot = Time.time + fireRate;
		Shoot();
	}
}

function Shoot () {
	// find target aimed by mouse
	var mousePos = Input.mousePosition;
	mousePos.z = cam.transform.position.x;
	var target = cam.ScreenToWorldPoint(mousePos);
	var rot = Quaternion.LookRotation(target - transform.position, transform.right);
	var diff: float;
	var axis: Vector3;
	rot.ToAngleAxis(diff, axis);
	// Debug.DrawLine(transform.position, target, Color.red, 4.0);
	Debug.Log(rot.eulerAngles + " - " + transform.rotation.eulerAngles + "=" + diff + ", " + axis);
	// if(rot.eulerAngles.x > transform.rotation.eulerAngles.x - validAngle / 2)
		// rot.eulerAngles.x = transform.rotation.eulerAngles.x - validAngle / 2;
	// else if(rot.eulerAngles.x < transform.rotation.eulerAngles.x + validAngle / 2)
		// rot.eulerAngles.x = transform.rotation.eulerAngles.x + validAngle / 2;
	var newbullet : Transform = Instantiate(bullet, transform.position, rot);
	newbullet.GetComponent(Bullet).owner = this.gameObject;
}