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
	box1.boxIndex = 0;
	box2 = new PIXI.Graphics();
	box2.boxIndex = 1;
	box3 = new PIXI.Graphics();
	box3.boxIndex = 2;
	box4 = new PIXI.Graphics();
	box4.boxIndex = 3;

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
	box1.on('pointerdown', onTap, box1 );
	box1.cursor = 'pointer';
	box2.eventMode = 'static';
	box2.on('pointerdown', onTap, box2 );
	box3.cursor = 'pointer';
	box3.eventMode = 'static';
	box3.on('pointerdown', onTap, box3 );
	box4.cursor = 'pointer';
	box4.eventMode = 'static';
	box4.on('pointerdown', onTap, box4 );
	
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

var audioTick;

var acSoundBuff1;
var acSoundBuff2;
var acSoundBuff3;
var acSoundBuff4;
function setupAudio()
{
	stage.removeChild(sprite);
	
	audioContext = new AudioContext(); 
	// When audio context is created start interval to start keeping track of time
	audioTick = 0;
	setInterval(function(){
		++audioTick;
		//console.log("Tick: " + audioTick);
		CheckBeat();
	}, TICK_LENGTH);

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

function Tap(_id, _tick){
	this.idx = _id;
	this.tick = _tick;
}

Tap.prototype.toString = function TapToString() {
  return `{id:${this.idx}, tick:${this.tick}}`;
};

var autoSources;
var autoBuffers;
function onTap(ctx)
{
	// TODO: Do -this elsewhere and once
	var sources = [source1, source2, source3, source4];
	var buffers = [acSoundBuff1, acSoundBuff2, acSoundBuff3, acSoundBuff4];
	autoSources = [source1, source2, source3, source4];
	autoBuffers = [acSoundBuff1, acSoundBuff2, acSoundBuff3, acSoundBuff4];
	
	var idx = ctx.target.boxIndex;
	console.log("Tap index: " + idx + " at: " + audioTick + " ( " + (audioTick % M_LEN_MOD) + ")");
	sources[idx] = audioContext.createBufferSource();
    sources[idx].buffer = buffers[idx];
    sources[idx].connect(audioContext.destination);
    //sources[idx].start(audioTick/10 + 1);
	sources[idx].start(0);
	++count;
	
	var o = new Tap(idx, audioTick % M_LEN_MOD);
	measureNotes.push(o);
}

var source1;
var source2;
var source3;
var source4;

function tick()
{
	SetUIText("Shelter: " + count);
}


/*
Figure out beats
*/

function printArray(name, arr) {
	var s = "";
	for(const e of arr)
	{
		s += e + ",";
	}
	console.log(name + "[" + s + "]");
}

var measure = 0;
var sampleCheckStartIndex = 0;
var measureNotes = [];
const TICK_LENGTH = 100; 	// milliseconds
const MEASURE_LENGTH = 4000; // milliseconds
const M_LEN_MOD = MEASURE_LENGTH / TICK_LENGTH;
var lastMeasure = [];
var beatCount = 0;
function CheckBeat()
{
	if(audioTick % M_LEN_MOD == 0) {
		console.log("New Measure");
		++measure;
		
		if(compareBeats(measureNotes, lastMeasure)) {
			++beatCount;
			console.log("Another one");
		}
		else {
			beatCount = 0;
		}
		
		if(beatCount > 0) {
			console.log("Auto beat");
			beatCount = 0;
			
			let count = 0;
			for(const b of measureNotes){
				autoSources[count] = audioContext.createBufferSource();
				autoSources[count].buffer = autoBuffers[b.idx];
				autoSources[count].connect(audioContext.destination);
				autoSources[count].start((audioTick / 10) + (b.tick / 10));
				++count;
			}
			/*
			autoSources[0] = audioContext.createBufferSource();
			autoSources[0].buffer = autoBuffers[1];
			autoSources[0].connect(audioContext.destination);
			autoSources[0].start(audioTick / 10 + 1);
			*/
		}
		
		lastMeasure = measureNotes;
		measureNotes = [];
	}
	
	printArray("Measure", measureNotes);
}

function compareBeats(currMeasure, lastMeasure)
{
	if(currMeasure.length == lastMeasure.length && currMeasure.length > 0)
	{
		for(let i = 0; i < currMeasure.length; ++i)
		{
			const currNote = currMeasure[i];
			const lastNote = lastMeasure[i];
			if(currNote.idx == lastNote.idx)
			{
				if(Math.abs(currNote.tick - lastNote.tick) <= 2)
				{
					console.log("Matching beats");
					return true;
				}
			}
		}
	}
	return false;
}