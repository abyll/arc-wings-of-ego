#pragma strict

var bullet: Transform;
var fireRate: float = 0.5; // seconds between bullets
var validAngle: float = 10; // angle you're allowed to shoot between, straight ahead of plane.
var tiltAngle: float;
private var next_shot: float;
private var cam: Camera;

function Start () {
	cam = GameObject.FindGameObjectWithTag("MainCamera").camera;
}

function Update () {
	if(Time.time < next_shot) {
		return;
	}
	
	var firePos = MousePos();
	var fireShot = false; 
	if(Input.GetButton("Fire1")) {
		//Debug.Log("Mouse Shoot");
		fireShot = true;
		firePos = MousePos();
	} else {
		//Debug.Log("Controller Shoot");
		//firePos.x = Input.GetAxis("Horizontal"); //* tiltAngle;
		//firePos.y = -Input.GetAxis("Vertical"); //* tiltAngle;
		//Debug.Log(firePos);
		//if(firePos.x < 1 || firePos.y > 1) {
		//fireShot = true;
		//}
	}
	if(fireShot) {
		//Shoot(firePos);
		Debug.Log(firePos);
		Debug.Log("Shoot");
		next_shot = Time.time + fireRate;
		Shoot(firePos);
	}
}

function MousePos() {
	// find target aimed by mouse
	var mousePos = Input.mousePosition;
	mousePos.z = cam.transform.position.x;
	return mousePos;
}

function Shoot (firePos) {
	var target = cam.ScreenToWorldPoint(firePos);
	var rot = Quaternion.LookRotation(target - transform.position, transform.right);
	//var rot = Quaternion.LookRotation(firePos);
	var diff: float;
	var axis: Vector3;
	rot.ToAngleAxis(diff, axis);
	// Debug.DrawLine(transform.position, target, Color.red, 4.0);
	Debug.Log(rot.eulerAngles + " - " + transform.rotation.eulerAngles + "=" + diff + ", " + axis);
	// if(rot.eulerAngles.x > transform.rotation.eulerAngles.x - validAngle / 2)
		// rot.eulerAngles.x = transform.rotation.eulerAngles.x - validAngle / 2;
	// else if(rot.eulerAngles.x < transform.rotation.eulerAngles.x + validAngle / 2)
		// rot.eulerAngles.x = transform.rotation.eulerAngles.x + validAngle / 2;
	try {
		var newbullet : Transform = Instantiate(bullet, transform.position, rot);
		newbullet.GetComponent(Bullet).owner = this.gameObject;
	} catch (e) {
		//Placeholder to silence console
	}
	
	
}