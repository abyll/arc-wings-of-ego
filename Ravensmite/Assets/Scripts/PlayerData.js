#pragma strict
import System.Collections.Generic;
import System.Xml.Serialization;
import System.IO;

public class MissionData {
	public var missionNumber: int;
	public var flagsHit : HashSet.<String> = new HashSet.<String>();
	public var complete = false;
	public var score = 0;
	
	public function MissionData() {
		missionNumber = -1;
	}
	public function MissionData(number: int) {
		missionNumber = number;
	}
}

@XmlRoot("PlayerData")
public class PlayerData {
	public var name: String = "";
	@XmlArray("Missions")
	public var missionProgress: List.<MissionData> = new List.<MissionData>();
	
	public static function Load(playername: String) {
		var serializer = new XmlSerializer(PlayerData);
		var stream = new FileStream(Path.Combine(Application.persistentDataPath, playername + ".xml"), FileMode.Open);
		var data : PlayerData = serializer.Deserialize(stream) as PlayerData;
		stream.Close();
		return data;
	}

	public function Save() {
		var path = Path.Combine(Application.persistentDataPath, name + ".xml");
		Debug.Log("Saving to "+path);
		var serializer = new XmlSerializer(PlayerData);
		var stream = new FileStream(path, FileMode.Create);
		serializer.Serialize(stream, this);
		stream.Close();
	}
}
