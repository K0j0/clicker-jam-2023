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
var WINDOW_W = 800;
var WINDOW_H = 800;
var sounds = [];
var sounds1 = [];
var sounds2 = [];
var sounds3 = [];
var sounds4 = [];
const kAudioSourceCount = 10;
var currSoundIndex = 0;
var uiText;
var debugText;
var count = 0;
var box1, box2, box3, box4;

function SetUIText(newText)
{
	uiText.text = newText;
}

function setup()
{	
	/*
	var dimension_1 = window.outerHeight;
	var dimension_2 = window.outerWidth;
	var tall = dimension_1 > dimension_2;
	if(tall) {
		WINDOW_W = dimension_2;
		WINDOW_H = dimension_1;
	}
	else {
		WINDOW_W = dimension_1;
		WINDOW_H = dimension_2;
	}
	
	console.log("Window is " + (tall ? "tall" : "short") + " at (" + WINDOW_W + ", " + WINDOW_H + ")");
	*/
	
	var clickerDiv = document.getElementById("clicker");
	
	app = new PIXI.Application({ 
		//resizeTo:clickerDiv
		 backgroundColor: '#1099bb'
		, w: WINDOW_W
		, h: WINDOW_H
		});
	stage = app.stage;
	document.body.appendChild(app.view);
	
	/*
	sprite = PIXI.Sprite.from('batman.png');
	//sprite.interactive = true;
	sprite.eventMode = 'static';
	sprite.cursor = 'pointer';
	sprite.on('pointerdown', onTap );
	stage.addChild(sprite);
	*/
	
	for(var i = 0; i < kAudioSourceCount; ++i) {
		sounds1[i] = new Audio("audio/note0.wav");
		sounds2[i] = new Audio("audio/thum.wav");
		sounds3[i] = new Audio("audio/g4.wav");
		sounds4[i] = new Audio("audio/dsharp.wav");
	}
	
	uiText = new PIXI.Text('Shelter: 0');
	uiText.x = 50;
	uiText.y = 10;
	
	debugText = new PIXI.Text('DEBUG');
	debugText.x = 500;
	debugText.y = 0;

	app.stage.addChild(uiText);
	app.stage.addChild(debugText);
	
	box1 = new PIXI.Graphics();
	box2 = new PIXI.Graphics();
	box3 = new PIXI.Graphics();
	box4 = new PIXI.Graphics();

	const kBoxWidth = 150;
	const kBoxHeight = 150;
	// Rectangle
	box1.beginFill(0xFF0000);
	box1.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box1.endFill();
	
	box2.beginFill(0xFFFF00);
	box2.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box2.endFill();
	
	box3.beginFill(0x00FF00);
	box3.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box3.endFill();
	
	box4.beginFill(0x0000FF);
	box4.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box4.endFill();
	
	box1.x = WINDOW_W/4;
	box1.y = WINDOW_H/4;
	box2.x = 3*WINDOW_W/4;
	box2.y = WINDOW_H/4;
	box3.x = WINDOW_W/4;
	box3.y = WINDOW_H/2;
	box4.x = 3*WINDOW_W/4;
	box4.y = WINDOW_H/2;
	
	box1.eventMode = 'static';
	box1.on('pointerup', onTap1 );
	box1.cursor = 'pointer';
	box2.eventMode = 'static';
	box2.on('pointerup', onTap2 );
	box3.cursor = 'pointer';
	box3.eventMode = 'static';
	box3.on('pointerup', onTap3 );
	box4.cursor = 'pointer';
	box4.eventMode = 'static';
	box4.on('pointerup', onTap4 );
	
	app.stage.addChild(box1);
	app.stage.addChild(box2);
	app.stage.addChild(box3);
	app.stage.addChild(box4);
	
	
	app.ticker.add(tick);
	
	debugChangeBody();
}

function debugChangeBody()
{
	var dev_date = new Date().toLocaleString();
	debugText.text = "Date: " + dev_date;
}

function playSound(which) {
	var idx = currSoundIndex++ % kAudioSourceCount;
	switch(which)
	{
		case 0:
		sounds1[idx].play();
		break;
		case 1:
		sounds2[idx].play();
		break;
		case 2:
		sounds3[idx].play();
		break;
		case 3:
		sounds4[idx].play();
		break;
		default:
		console.log("-no sound-");
		break;
	}
}

function onTap()
{
	playSound();
	console.log("tap");
	++count;
}

function onTap()
{
	playSound();
	console.log("tap");
	++count;
}

function onTap1()
{
	playSound(0);
	console.log("tap 1");
	++count;
}

function onTap2()
{
	playSound(1);
	console.log("tap 2");
	++count;
}

function onTap3()
{
	playSound(2);
	console.log("tap 3");
	++count;
}

function onTap4()
{
	playSound(3);
	console.log("tap 4");
	++count;
}

function tick()
{
	SetUIText("Shelter: " + count);
}

