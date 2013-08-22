#pragma strict

public var enemy: GameObject;
public var spawnrate: float = 10f;
private var nextSpawn: float;

function Start () {
	nextSpawn = Time.time + spawnrate;
}

function Update () {
	if(Time.time >nextSpawn) {
		SpawnEnemy();
		nextSpawn = Time.time + spawnrate;
	}
	
}

function SpawnEnemy() {
	var y = Random.Range(-15, 15);
	var angle = Random.Range(-15, 15);
	Instantiate(enemy, Vector3(0, y, 30), Quaternion.Euler(angle, 180, 0));
}