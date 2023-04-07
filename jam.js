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

function SetUIText(newText)
{
	uiText.text = newText;
}

var bar;
function setup()
{	
	app = new PIXI.Application({
		 backgroundColor: '#1099bb'
		, w: WINDOW_W
		, h: WINDOW_H
		});
	stage = app.stage;
	document.body.appendChild(app.view);
	
	uiText = new PIXI.Text('Shelter: 0');
	uiText.x = 50;
	uiText.y = 10;
	app.stage.addChild(uiText);
	
	debugText = new PIXI.Text('DEBUG');
	debugText.x = 500;
	debugText.y = 0;
	//app.stage.addChild(debugText);
	
	makeBoxes();
	
	sprite = PIXI.Sprite.from('batman.png');
	//sprite.interactive = true;
	sprite.eventMode = 'static';
	sprite.cursor = 'pointer';
	sprite.on('pointerdown', setupAudio );
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.x = WINDOW_W/2;
	sprite.y = WINDOW_H/2;
	stage.addChild(sprite);
	
	app.ticker.add(tick);
}

function makeBoxes()
{
	box1 = new PIXI.Graphics();
	box1.boxIndex = 0;
	box2 = new PIXI.Graphics();
	box2.boxIndex = 1;
	box3 = new PIXI.Graphics();
	box3.boxIndex = 2;
	box4 = new PIXI.Graphics();
	box4.boxIndex = 3;

	
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
	
	bar = new PIXI.Graphics();
	bar.beginFill(0xFFFFFF);
	bar.drawRect(0, 0, 10, WINDOW_H);
	app.stage.addChild(bar);
	
	app.stage.addChild(box1);
	app.stage.addChild(box2);
	app.stage.addChild(box3);
	app.stage.addChild(box4);
}

var audioTick;

var acSoundBuff1;
var acSoundBuff2;
var acSoundBuff3;
var acSoundBuff4;

const SOUND_LIST = ["audio/djembe-1.wav"
					,"audio/djembe-2.wav"
					,"audio/djembe-3.wav"
					,"audio/djembe-4.wav"];
var BUFFER_LIST = [{},{},{},{}];				

function setupAudio()
{
	stage.removeChild(sprite);
	audioContext = new AudioContext();	
	// When audio context is created start interval to start keeping track of time
	audioTick = 0;	

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
	//request.send();		

		LoadSounds(SOUND_LIST, BUFFER_LIST);
	
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
var once = true;
function onTap(ctx)
{
	if(once)
	{		
		setInterval(function(){		
			//console.log("Tick: " + audioTick);
			CheckBeat();
		}, TICK_LENGTH);
		TweenLite.to(bar, {x:WINDOW_W, duration:(MEASURE_LENGTH/1000), repeat:-1, ease: "linear"});
		//return;
	}
	// TODO: Do -this elsewhere and once
	var sources = [source1, source2, source3, source4];
	//var buffers = [acSoundBuff1, acSoundBuff2, acSoundBuff3, acSoundBuff4];
	autoSources = [];
	autoBuffers = [acSoundBuff1, acSoundBuff2, acSoundBuff3, acSoundBuff4];
	
	var idx = ctx.target.boxIndex;
	console.log("Tap index: " + idx + " at: " + audioTick + " ( " + (audioTick % M_LEN_MOD) + ")");
	sources[idx] = audioContext.createBufferSource();
    sources[idx].buffer = BUFFER_LIST[idx];
    sources[idx].connect(audioContext.destination);
    //sources[idx].start(audioTick/10 + 1);
	sources[idx].start(0);
	++count;
	
	var o = new Tap(idx, audioTick % M_LEN_MOD);
	measureNotes.push(o);
	
	if(once) {
		once = false;
		CheckBeat();
	}
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

function GET_TICKS()
{
	return audioTick % M_LEN_MOD;
}

var measure = 0;
var sampleCheckStartIndex = 0;
var measureNotes = [];
var autoBeats = [];
const TICK_LENGTH = 100; 	// milliseconds
const BPM = 15;
const MEASURE_LENGTH =  (1 / (BPM / 60) * 1000); // milliseconds
const M_LEN_MOD = MEASURE_LENGTH / TICK_LENGTH;
var lastMeasure = [];
var beatCount = 0;
function CheckBeat()
{
	if(audioTick % M_LEN_MOD == 0 && audioTick > 0) {
		console.log("New Measure");
		++measure;
		
		if(compareBeats(measureNotes, lastMeasure)) {
			++beatCount;
			autoBeats.push(measureNotes);
			console.log("Another one");
		}
		else {
			beatCount = 0;
		}
		
		if(autoBeats.length > 0) {
			console.log("Auto beat");
			//beatCount = 0;
			
			for(let i = 0; i < autoBeats.length; ++i) {
				let aBeat = autoBeats[i];
				printArray(`A Beat[${i}]`, measureNotes);
				for(let ii = 0; ii < aBeat.length; ++ii) {
					autoSources[i] = audioContext.createBufferSource();
					autoSources[i].buffer = BUFFER_LIST[aBeat[ii].idx];
					autoSources[i].connect(audioContext.destination);
					var aTime = (audioTick / 10) + (aBeat[ii].tick / 10);
					autoSources[i].start(aTime);
					var dTime = (aBeat[ii].tick);
					console.log(`Play ${aBeat[ii].idx} at ${dTime} | ${audioTick % M_LEN_MOD}`);
				}
			}
		}
		
		if(0 == beatCount){
			lastMeasure = measureNotes;
		}
		measureNotes = [];
	}
	
	console.log("Tick: " + GET_TICKS());
	printArray("Measure", measureNotes);
	++audioTick;
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