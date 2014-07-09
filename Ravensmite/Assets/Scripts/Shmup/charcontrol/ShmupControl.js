#pragma strict

var leftbound: Transform;
var rightbound: Transform;
var topbound: Transform;
var bottombound: Transform;
var speed: float;
var tiltAngle: float;
var rotateSpeed: float = 0.5f;
private var cam: Camera;

function Start () {
	cam = GameObject.FindGameObjectWithTag("MainCamera").camera;
}

function FixedUpdate () {
	var horz = Input.GetAxis("Horizontal") * speed * Time.deltaTime; // left/right
	var vert = Input.GetAxis("Vertical") * speed * Time.deltaTime; // up/down
	//Debug.Log("" + horz + "," + vert);
	//var z = Mathf.Clamp(transform.localPosition.z + horz, leftbound.position.z, rightbound.position.z);
	//var y = Mathf.Clamp(transform.localPosition.y + vert, bottombound.position.y, topbound.position.y);
	//try {
	//rigidbody.MovePosition(Vector3(0, y, z));//+transform.parent.position);
	rigidbody.AddForce(Vector3(0,vert,horz)*500);
	//transform.localPosition = Vector3(0, y, z);
	//} catch (e) {
		//Debug.Log(e.Message);
		//Placeholder to silence the console
	//}
	
}

function Update() {

	// Tilting code
	var tiltAroundX= Input.GetAxis("Horizontal") * tiltAngle;
	var tiltAroundZ = -Input.GetAxis("Vertical") * tiltAngle;
	var target = Quaternion.Euler (tiltAroundZ, 0, 0);
	// Dampen towards the target rotation
	transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * rotateSpeed);
	
}

function Die() { // Player Death
	Destroy(gameObject);
	Application.LoadLevel("mainmenu");
}
