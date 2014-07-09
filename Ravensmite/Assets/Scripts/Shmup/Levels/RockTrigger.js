#pragma strict

var triggered = false;

function OnCollisionEnter(collision: Collision) {
	if(triggered)
		return;
	if(collision.transform.CompareTag("Player")) {
		triggered = true;
		var data = GameObject.FindGameObjectWithTag("PlayerDataContainer").GetComponent(PlayerDataContainer).playerData;
		var mission = (data.missionProgress[Application.loadedLevel-1]);
		mission.flagsHit.Add("secret");
		Debug.Log("Hit secret");
	}
}