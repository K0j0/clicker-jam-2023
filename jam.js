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

var audioContext;
var audioLoader;

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
	
	
	
	for(var i = 0; i < kAudioSourceCount; ++i) {
		sounds1[i] = new Audio("audio/djembe-1.wav");
		sounds2[i] = new Audio("audio/djembe-2.wav");
		sounds3[i] = new Audio("audio/djembe-3.wav");
		sounds4[i] = new Audio("audio/djembe-4.wav");
	}
	
	uiText = new PIXI.Text('Shelter: 0');
	uiText.x = 50;
	uiText.y = 10;
	
	debugText = new PIXI.Text('DEBUG');
	debugText.x = 500;
	debugText.y = 0;

	app.stage.addChild(uiText);
	//app.stage.addChild(debugText);
	
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
	box1.on('pointerdown', onTap1 );
	box1.cursor = 'pointer';
	box2.eventMode = 'static';
	box2.on('pointerdown', onTap2 );
	box3.cursor = 'pointer';
	box3.eventMode = 'static';
	box3.on('pointerdown', onTap3 );
	box4.cursor = 'pointer';
	box4.eventMode = 'static';
	box4.on('pointerdown', onTap4 );
	
	app.stage.addChild(box1);
	app.stage.addChild(box2);
	app.stage.addChild(box3);
	app.stage.addChild(box4);
	
	
	/*
	*/
	sprite = PIXI.Sprite.from('batman.png');
	//sprite.interactive = true;
	sprite.eventMode = 'static';
	sprite.cursor = 'pointer';
	sprite.on('pointerdown', setupAudio );
	stage.addChild(sprite);
	//setupAudio();
	
	app.ticker.add(tick);
	
	//debugChangeBody();
}

var acSoundBuff1;
var acSoundBuff2;
var acSoundBuff3;
var acSoundBuff4;
function setupAudio()
{
	stage.removeChild(sprite);

	audioContext = new AudioContext();

    var url = "audio/djembe-1.wav";
	var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff1 = buffer;
		console.log("Got Sound Buffer1 Response");
		setupAudio2();
    }, function(){ console.log("dang"); });
    }
    request.send();
	
	/*
	url = "audio/djembe-2.wav";
	request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff2 = buffer;
		console.log("Got Sound Buffer2 Response");
    }, function(){ console.log("dang"); });
    }
    request.send();
	
	url = "audio/djembe-3.wav";
	request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff3 = buffer;
		console.log("Got Sound Buffer3 Response");
    }, function(){ console.log("dang"); });
    }
    request.send();
	
	url = "audio/djembe-4.wav";
	request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff4 = buffer;
		console.log("Got Sound Buffer4 Response");
    }, function(){ console.log("dang"); });
    }
    request.send();
	*/
}

function setupAudio2()
{
	var url = "audio/djembe-2.wav";
	var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff2 = buffer;
		console.log("Got Sound Buffer2 Response");	
		setupAudio3();
    }, function(){ console.log("dang"); });
    }
    request.send();
}

function setupAudio3()
{
	var url = "audio/djembe-3.wav";
	var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff3 = buffer;
		console.log("Got Sound Buffer3 Response");
		setupAudio4();
    }, function(){ console.log("dang"); });
    }
    request.send();
}

function setupAudio4()
{
	var url = "audio/djembe-4.wav";
	var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        acSoundBuff4 = buffer;
		console.log("Got Sound Buffer4 Response");		
    }, function(){ console.log("dang"); });
    }
    request.send();
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

var source1;
var source2;
var source3;
var source4;
function onTap1()
{
	/*
	playSound(0);
	console.log("tap 1");
	++count;
	*/
	console.log("tap 1a");
	source1 = audioContext.createBufferSource(); // creates a sound source
    source1.buffer = acSoundBuff1;                    // tell the source which sound to play
    source1.connect(audioContext.destination);	       // connect the source to the context's destination (the speakers)
    source1.start(0);
}

function onTap2()
{
	console.log("tap 2");
	source2 = audioContext.createBufferSource();
    source2.buffer = acSoundBuff2;
    source2.connect(audioContext.destination);
    source2.start(0);
	++count;
}

function onTap3()
{
	console.log("tap 3");
	source3 = audioContext.createBufferSource();
    source3.buffer = acSoundBuff3;
    source3.connect(audioContext.destination);
    source3.start(0);
	++count;
}

function onTap4()
{
	console.log("tap 4");
	source4 = audioContext.createBufferSource();
    source4.buffer = acSoundBuff4;
    source4.connect(audioContext.destination);
    source4.start(0);
	++count;
}

function tick()
{
	SetUIText("Shelter: " + count);
}

