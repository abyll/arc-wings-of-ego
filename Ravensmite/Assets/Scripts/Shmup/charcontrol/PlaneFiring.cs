using UnityEngine;
using System.Collections;
using Weapons;

public class PlaneFiring : MonoBehaviour
{
	private float coolDown;
	private float validAngle = 10; // angle you're allowed to shoot between, straight ahead of plane.
	private float tiltAngle;
	private Camera cam;
	enum weaponsEnum {Bullet, Vulcan, Beam, Melee};
	private Weapon[] weapons = { Bullet, Vulcan, Beam, Melee }; 
	private float[] weaponCooldown = { 0.5, 0.1, 2.0, 1.0};
	int activeWeaponIndex; 
	

	void Start () {
		cam = GameObject.FindGameObjectWithTag("MainCamera").camera;
		activeWeaponIndex = weaponsEnum.Bullet;
	}

	void Update () {
		if(Time.time < next_shot) {
			return;
		}
		
		switchWeapon();
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
			next_shot = Time.time + weaponCooldown[activeWeaponIndex];
			Shoot(firePos);
		}
	}

	void switchWeapon() {
		//We will be adding code to shoot one of the many fun death machines here
	}

	Vector3 MousePos() {
		// find target aimed by mouse
		Vector3 mousePos = Input.mousePosition;
		mousePos.z = cam.transform.position.x;
		return mousePos;
	}

	void Shoot (Vector3 firePos) {
		Vector3 target = cam.ScreenToWorldPoint(firePos);
		Quaternion rot = Quaternion.LookRotation(target - transform.position, transform.right);
		//var rot = Quaternion.LookRotation(firePos);
		float diff;
		Vector3 axis;
		rot.ToAngleAxis(diff, axis);
		// Debug.DrawLine(transform.position, target, Color.red, 4.0);
		Debug.Log(rot.eulerAngles + " - " + transform.rotation.eulerAngles + "=" + diff + ", " + axis);
		// if(rot.eulerAngles.x > transform.rotation.eulerAngles.x - validAngle / 2)
			// rot.eulerAngles.x = transform.rotation.eulerAngles.x - validAngle / 2;
		// else if(rot.eulerAngles.x < transform.rotation.eulerAngles.x + validAngle / 2)
			// rot.eulerAngles.x = transform.rotation.eulerAngles.x + validAngle / 2;
		try {
			Transform newbullet = Instantiate(weapons[activeWeaponIndex], transform.position, rot);
			newbullet.GetComponent(weapons[activeWeaponIndex]).owner = this.gameObject;
		} catch (e) {
			//Placeholder to silence console
		}
	}
}