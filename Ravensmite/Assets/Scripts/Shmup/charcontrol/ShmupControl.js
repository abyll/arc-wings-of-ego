#pragma strict

var leftbound: float;
var rightbound: float;
var topbound: float;
var bottombound: float;
var speed: float;
var tiltAngle: float;
var rotateSpeed: float = 0.5f;


function Start () {
}

function Update () {
	var horz = Input.GetAxis("Horizontal") * speed * Time.deltaTime; // left/right
	var vert = Input.GetAxis("Coaxial") * speed * Time.deltaTime; // up/down
	//Debug.Log("" + horz + "," + vert);
	var z = Mathf.Clamp(transform.position.z + horz, leftbound, rightbound);
	var y = Mathf.Clamp(transform.position.y + vert, bottombound, topbound);
	rigidbody.MovePosition(Vector3(0, y, z));
	
	// Tilting code
	var tiltAroundX= Input.GetAxis("Horizontal") * tiltAngle;
	var tiltAroundZ = -Input.GetAxis("Coaxial") * tiltAngle;
	var target = Quaternion.Euler (tiltAroundZ, 0, 0);
	// Dampen towards the target rotation
	transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * rotateSpeed);
	
}

function Die() { // Player Death
	Destroy(gameObject);
	Application.LoadLevel("MainMenu");
}
