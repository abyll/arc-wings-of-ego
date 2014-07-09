#pragma strict

var enemyToSpawn: GameObject;
private var triggered = false;
private var container: Transform;

function Start () {
	container = GameObject.Find("EnemyCont").transform;

}

function OnTriggerEnter(other: Collider) {
	Debug.Log("Spawn triggered");
	//Instantiate(enemyToSpawn, transform.position, transform.rotation);
	if(!triggered) {
		triggered = true;
		var y = Random.Range(-15, 15);
		var angle = Random.Range(-15, 15);
		Instantiate(enemyToSpawn, transform.position + Vector3(0, y, 0), Quaternion.Euler(angle, 180, 0)).transform.parent = container;
	}
}