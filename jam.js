console.log("Hi?");

/*
Split into functions that do stuff

Setup application
-Draw stage
-Create audio sources
-Create UI
-Make button(s?)

Callback functions
-on button click
-set UI text
-play audio
-debug print?
*/

var app;
var stage;
var sprite;
var sounds = [];
const kAudioSourceCount = 10;
var currSoundIndex = 0;

function setup()
{	
	app = new PIXI.Application({ background: '#1099bb' , width: 540, height: 960 });
	stage = app.stage;
	document.body.appendChild(app.view);
	
	sprite = PIXI.Sprite.from('batman.png');
	sprite.interactive = true;
	sprite.cursor = 'pointer';
	sprite.on('pointerdown', onTap );

	stage.addChild(sprite);
	
	for(var i = 0; i < kAudioSourceCount; ++i) {
		sounds[i] = new Audio("note0.wav");
	}
	
	app.ticker.add(tick);
}

function debugChangeBody()
{
	var dev_date = new Date().toLocaleString();
	var p = document.createElement("p");
	p.textContent = "Date: " + dev_date;
	document.body.appendChild(p);
}

function playSound() {
	var idx = currSoundIndex++ % kAudioSourceCount;
	sounds[idx].play();
}

function onTap()
{
	playSound();
	console.log("tap");
}

function tick()
{
	//console.log("tock..");
}

