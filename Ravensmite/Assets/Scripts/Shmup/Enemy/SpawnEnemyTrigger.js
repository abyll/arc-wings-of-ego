#pragma strict

var enemyToSpawn: GameObject;
private var triggered = false;

function Start () {

}

function Update () {
	
}

function OnTriggerEnter() {
	if(!triggered) {
		triggered = true;
		Instantiate(enemyToSpawn, transform.position, transform.rotation);
	}
}