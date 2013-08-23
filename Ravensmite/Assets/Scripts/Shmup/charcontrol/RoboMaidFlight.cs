using UnityEngine;
using System.Collections;

public class RoboMaidFlight: MonoBehaviour {
    private float speed = 65f;
	// Use this for initialization
	void Start () {
        
	}
	
	// Update is called once per frame
	void Update () {
		float horz = Input.GetAxis("Horizontal"); // left/right
		float vert = Input.GetAxis("Vertical"); // up/down
		float coax = -Input.GetAxis("Coaxial"); // forward/back
		Vector3 translate = new Vector3(horz, coax, vert);
		translate *= Time.deltaTime * speed;
		transform.Translate(translate);

		float yaw = Input.GetAxis("Yaw") * 1.8f;
		float pitch = Input.GetAxis("Pitch") * 1.8f;
		float roll = Input.GetAxis("Roll") * 2.5f;
		
		transform.Rotate(pitch, roll, yaw);
	}
}
