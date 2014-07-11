#pragma strict

public var time: float=8;

function Start () {
	var tweenpath = gameObject.GetComponent("iTweenPath") as iTweenPath;
	var path = tweenpath.nodes.ToArray();
	iTween.MoveTo(gameObject, iTween.Hash("path",path, "time",time, "loopType","loop", "easetype","linear", "orienttopath",false));
}