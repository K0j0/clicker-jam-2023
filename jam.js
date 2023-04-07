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
	
	InitBeatCheck();
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
	}, 100);

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
	this.age = 0;
}

Tap.prototype.toString = function TapToString() {
  return `{id:${this.idx}, tick:${this.tick}, age:${this.age}}`;
};

function onTap(ctx)
{
	var sources = [source1, source2, source3, source4];
	var buffers = [acSoundBuff1, acSoundBuff2, acSoundBuff3, acSoundBuff4];
	var idx = ctx.target.boxIndex;
	console.log("Tap index: " + idx + " at: " + audioTick + " ( " + sampleIndex + ")");
	sources[idx] = audioContext.createBufferSource();
    sources[idx].buffer = buffers[idx];
    sources[idx].connect(audioContext.destination);
    sources[idx].start(audioTick/10 + 1);
	console.log("tap. sampleIndex? " + sampleIndex);
	++count;
	
	/*
	var o = {id:idx, tick:audioTick
	, sIndex:sampleIndex, age: 0};
	*/
	var o = new Tap(idx, audioTick);
	var i = tapIndex++ % MAX_BEAT_LENGTH;
	lastTaps[i] = o;
	
	samples[sampleIndex] = o;
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

const MAX_BEAT_LENGTH = 6;
const SAMPLE_LENGTH = MAX_BEAT_LENGTH * 10;
var samples = [];
var lastTaps = [];
var tapIndex;
var sampleIndex;

function InitBeatCheck()
{
	tapIndex = 0;
	sampleIndex = 0;
	for(let i = 0; i < MAX_BEAT_LENGTH; ++i) {
		lastTaps.push(0);
		
		for(let j = 0; j < 10; ++j) {
			samples.push(0);
		}
	}
}

function printArray(name, arr) {
	var s = "";
	for(const e of arr)
	{
		s += e + ",";
	}
	console.log(name + "[" + s + "]");
}

var sampleCheckStartIndex = 0;
function CheckBeat()
{
	var noteFirst = [-1, -1, -1, -1];
	var noteLast = [-1, -1, -1, -1];
	
	//console.log("\n START \n");
	var count = 0;
	while(count < SAMPLE_LENGTH)
	{
		//let startIdx = sampleIndex % SAMPLE_LENGTH;
		let indexF = (sampleIndex + count) % SAMPLE_LENGTH;
		let indexB = (sampleIndex - (count+1)) < 0 ? SAMPLE_LENGTH + (sampleIndex - (count+1)) : (sampleIndex - (count+1));
		
		/*
		Iterate from "front" forward
		Iterate from "back" backwards
		Store first and last values for each by id
		*/
		
		//console.log(`indexF: ${indexF} | indexB: ${indexB}`);
		var sF = samples[indexF];
		if(0 != sF) {
			if(noteFirst[sF.idx] == -1){
				noteFirst[sF.idx] = sF;
			}
			
			/*
			console.log("Found tap at " + count + " | " + indexF
			+ " | " + s.age);
			*/
			if(sF.age >= SAMPLE_LENGTH) {
				samples[indexF] = 0;
			}
			++sF.age;			
		}
		
		var sB = samples[indexB];
		if(0 != sB) {
			if(noteLast[sB.idx] == -1){
				noteLast[sB.idx] = sB;
			}
			
			/*
			console.log("Found tap at " + count + " | " + indexF
			+ " | " + s.age);
			*/
		}
		
		/*
		Have it so taps "age out". Keep track of index they are tapped at and in this function check diff between their tapped index and current index. When that diff is the sample length then delete the tap so it's no longer considered.
		
		Limited to only 1 tap per tick this way. Could setup an array of taps later.
		*/
		
		++count;
	}
	
	/*
	for(let i = 0; i < SAMPLE_LENGTH; ++i) {
		if(0 != samples[i]) {
			console.log("Found tap at " + i);
		}
	}
	*/
	
	++sampleIndex;
	sampleIndex %= SAMPLE_LENGTH;
	
	printArray("First Beats", noteFirst);
	printArray("Last Beats", noteLast);
}