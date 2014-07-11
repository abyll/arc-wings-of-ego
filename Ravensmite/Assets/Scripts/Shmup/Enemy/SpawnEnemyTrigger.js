#pragma strict

var enemyToSpawn: GameObject;
var pointenabled = false;
private var triggered = false;
private var container: Transform;

function Start () {
	container = GameObject.Find("EnemyCont").transform;

}

function OnTriggerEnter(other: Collider) {
	if(!pointenabled) 
		return;
	//Instantiate(enemyToSpawn, transform.position, transform.rotation);
	if(!triggered) {
		triggered = true;
		var y = Random.Range(-15, 15);
		var angle = Random.Range(-15, 15);
		Instantiate(enemyToSpawn, transform.position + Vector3(0, y, 0), Quaternion.Euler(angle, 180, 0)).transform.parent = container;
	}
}