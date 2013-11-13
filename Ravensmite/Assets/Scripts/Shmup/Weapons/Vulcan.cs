using UnityEngine;
using System.Collections;

public class Vulcan : Weapon
{
	float speed;
	float damage;
	float owner;
	float team;
	bool canHurtOwner = false;
	bool canHurtTeam = false;
	ParticleEmitter explosion;
	float playerFireRate = 0.5;// seconds between bullets

	void Start () {
		
	}

	void Update () {
		rigidbody.MovePosition(rigidbody.position + transform.forward * speed * Time.deltaTime);
	}

	void OnTriggerEnter(Collider collision) {
		try {
			var collObj = collision.transform.parent.gameObject;
		} catch (e) {
			//Placeholder to silence the console
		}
		if(collObj == null || collObj == owner || collObj.CompareTag(team) || collObj.CompareTag("Bullet"))
			return;
		//Debug.Log("Shot a " + collision.gameObject.name);
		
		// Flame effect on bullet collision
		var flame = Instantiate(explosion, transform.position, transform.rotation);
		Destroy(flame, 1);
		
		
		collObj.GetComponent(Life).Damage(damage);
		Destroy(gameObject);
	}
}