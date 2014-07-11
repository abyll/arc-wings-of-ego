#pragma strict
var damageMult: float = 0.8f;
function OnCollisionEnter(collision: Collision) {
	//Debug.Log(collision.gameObject.name + "hit terrain");
	var dmg:float = collision.relativeVelocity.magnitude * damageMult;
	Debug.Log("Dmg: " + dmg);
	try{
		collision.gameObject.GetComponent(Life).Damage(dmg);
	} catch(e) {
	
	}
	//collision.gameObject.transform.position -= collision.relativeVelocity * 1.5;
}