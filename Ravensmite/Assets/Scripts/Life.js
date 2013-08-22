#pragma strict

var HP: float=5;
var invuln: boolean=false;

function Start () {

}

function Update () {

}

function Damage(damage: float) {
	if(invuln)
		return;
	HP -= damage;
	if(HP <= 0)
		SendMessage("Die");
}

function Die() {
	Destroy(gameObject);
}
