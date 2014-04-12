#pragma strict

var leftbound: float;
var rightbound: float;
var topbound: float;
var bottombound: float;
var speed: float;
var tiltAngle: float;
var rotateSpeed: float = 0.5f;
private var cam: Camera;
private var barrel: Transform;

function Start () {
	cam = GameObject.FindGameObjectWithTag("MainCamera").camera;
	barrel = transform.Find("barrel_turret/turret_barrel");
	if (barrel == null)
		Debug.Log("Barrel find failed");
}

function FixedUpdate () {
	var horz = Input.GetAxis("Horizontal") * speed * Time.deltaTime; // left/right
	var vert = Input.GetAxis("Vertical") * speed * Time.deltaTime; // up/down
	//Debug.Log("" + horz + "," + vert);
	var z = Mathf.Clamp(transform.localPosition.z + horz, leftbound, rightbound);
	var y = Mathf.Clamp(transform.localPosition.y + vert, bottombound, topbound);
	try {
	//rigidbody.MovePosition(Vector3(0, y, z)+transform.parent.position);
	rigidbody.AddForce(Vector3(0,y,z)*50);
	//transform.localPosition = Vector3(0, y, z);
	} catch (e) {
		//Placeholder to silence the console
	}
	
	// Tilting code
	var tiltAroundX= Input.GetAxis("Horizontal") * tiltAngle;
	var tiltAroundZ = -Input.GetAxis("Vertical") * tiltAngle;
	var target = Quaternion.Euler (tiltAroundZ, 0, 0);
	// Dampen towards the target rotation
	transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * rotateSpeed);
	
	// Aim Cannon
	var mousePos = Input.mousePosition;
	mousePos.z = cam.transform.position.x;
	barrel.LookAt(cam.ScreenToWorldPoint(mousePos), Vector3.forward);
	barrel.Rotate(-90,0,0);
}

function Die() { // Player Death
	Destroy(gameObject);
	Application.LoadLevel("mainmenu");
}
