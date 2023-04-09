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
	
	sprite = PIXI.Sprite.from('imgs/batman.png');
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
	box1a = new PIXI.Graphics();
	box1.boxIndex = 0;
	box1a.boxIndex = 10;
	
	box2 = new PIXI.Graphics();
	box2a = new PIXI.Graphics();
	box2.boxIndex = 1;
	box2a.boxIndex = 11;
	
	box3 = new PIXI.Graphics();
	box3a = new PIXI.Graphics();
	box3.boxIndex = 2;
	box3a.boxIndex = 12;
	
	box4 = new PIXI.Graphics();
	box4a = new PIXI.Graphics();
	box4.boxIndex = 3;
	box4a.boxIndex = 13;

	
	// Rectangle
	box1.beginFill(0xFF0000);
	box1.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box1.endFill();
	box1.rotation = Math.PI/4;
	box1a.beginFill(0xFF0000);
	box1a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box1a.endFill();
	box1a.rotation = Math.PI/4;
	
	box2.beginFill(0xFFFF00);
	box2a.beginFill(0xFFFF00);
	box2.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box2a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box2.endFill();
	box2a.endFill();
	box2.rotation = Math.PI/4;
	box2a.rotation = Math.PI/4;
	
	box3.beginFill(0x00FF00);
	box3a.beginFill(0x00FF00);
	box3.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box3a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box3.endFill();
	box3a.endFill();
	box3.rotation = Math.PI/4;
	box3a.rotation = Math.PI/4;
	
	box4.beginFill(0x0000FF);
	box4a.beginFill(0x0000FF);
	box4.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box4a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box4.endFill();
	box4a.endFill();
	box4.rotation = Math.PI/4;
	box4a.rotation = Math.PI/4;
	
	const gap = 50;
	box1.x = WINDOW_W/4 - gap;
	box1a.x = WINDOW_W/4 + gap;
	box1.y = WINDOW_H/4;
	box1a.y = WINDOW_H/4;
	box1a.scale.x = .9;
	box1a.scale.y = .9;
	
	box2.x = 3*WINDOW_W/4 - gap;
	box2a.x = 3*WINDOW_W/4 + gap;
	box2.y = WINDOW_H/4;
	box2a.y = WINDOW_H/4;
	box2a.scale.x = .9;
	box2a.scale.y = .9;
	
	box3.x = WINDOW_W/4 + gap;
	box3a.x = WINDOW_W/4 - gap;
	box3.y = WINDOW_H/2;
	box3a.y = WINDOW_H/2;
	box3a.scale.x = .9;
	box3a.scale.y = .9;
	
	box4.x = 3*WINDOW_W/4 - gap;
	box4a.x = 3*WINDOW_W/4 + gap;
	box4.y = WINDOW_H/2;
	box4a.y = WINDOW_H/2;
	box4a.scale.x = .9;
	box4a.scale.y = .9;
	
	box1.eventMode = 'static';
	box1a.eventMode = 'static';
	box1.on('pointerdown', onTap, box1 );
	box1a.on('pointerdown', onTap, box1a );
	box1.cursor = 'pointer';
	box1a.cursor = 'pointer';
	box2.eventMode = 'static';
	box2a.eventMode = 'static';
	box2.on('pointerdown', onTap, box2 );
	box2a.on('pointerdown', onTap, box2a );
	box3.cursor = 'pointer';
	box3a.cursor = 'pointer';
	box3.eventMode = 'static';
	box3a.eventMode = 'static';
	box3.on('pointerdown', onTap, box3 );
	box3a.on('pointerdown', onTap, box3a );
	box4.cursor = 'pointer';
	box4a.cursor = 'pointer';
	box4.eventMode = 'static';
	box4a.eventMode = 'static';
	box4.on('pointerdown', onTap, box4 );
	box4a.on('pointerdown', onTap, box4a );
	
	bar = new PIXI.Graphics();
	bar.beginFill(0xFFFFFF);
	bar.drawRect(0, 0, 10, WINDOW_H);
	app.stage.addChild(bar);
	
	app.stage.addChild(box1);
	app.stage.addChild(box1a);
	app.stage.addChild(box2);
	app.stage.addChild(box2a);
	app.stage.addChild(box3);
	app.stage.addChild(box3a);
	app.stage.addChild(box4);
	app.stage.addChild(box4a);
}

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
	trueTick = 0;
	
	setInterval(function(){		
			//console.log("Tick: " + audioTick);
			++trueTick;
		}, TICK_LENGTH);

	LoadSounds(SOUND_LIST, BUFFER_LIST);
}

function debugChangeBody()
{
	var dev_date = new Date().toLocaleString();
	debugText.text = "Date: " + dev_date;
}

function playSound(which, when) {
	var sound = audioContext.createBufferSource();
    sound.buffer = BUFFER_LIST[which];
    sound.connect(audioContext.destination);
	sound.start(when);
}

function Tap(_id, _tick){
	this.idx = _id;
	this.tick = _tick % M_LEN_MOD;
	this.tickTrue = _tick;
	this.time = audioContext.currentTime - frameStartTime;
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
	}
	autoSources = [];
	autoBuffers = [...BUFFER_LIST]; // Should be a copy?
	let isEndTap = ctx.target.boxIndex >= 10;
	var idx = ctx.target.boxIndex = isEndTap ? ctx.target.boxIndex - 10: ctx.target.boxIndex;
	playSound(idx, 0);
	console.log("Tap index: " + idx + " at: " + audioTick + " ( " + (audioTick % M_LEN_MOD) + ")");
	++count;
	
	var o = new Tap(idx, audioTick);
	measureNotes.push(o);
	
	if(once) {
		once = false;
		hasTapped = true;
		CheckBeat();
	}
}

function tick()
{
	SetUIText("Shelter: " + count);
}

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
const BPM = 60;
const MEASURE_LENGTH =  (1 / (BPM / 60) * 1000); // milliseconds
const M_LEN_MOD = MEASURE_LENGTH / TICK_LENGTH;
var lastMeasure = [];
var beatCount = 0;
var hasTapped = false;
function CheckBeat()
{
	if(audioTick % M_LEN_MOD == 0 && audioTick > 0) {
		frameStartTime = audioContext.currentTime;
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
				printArray(`A Beat[${i}]`, aBeat);
				for(let ii = 0; ii < aBeat.length; ++ii) {
					let aTap = aBeat[ii];
					autoSources[i] = audioContext.createBufferSource();
					autoSources[i].buffer = autoBuffers[aTap.idx];
					autoSources[i].connect(audioContext.destination);
					//let aTime = (audioContext.currentTime + (aTap.tick/10));
					let aTime = (frameStartTime + aTap.time);
					autoSources[i].start(aTime);
					console.log(`Play ${aBeat[ii].idx} at ${aTime}`);
				}
			}
		}
		
		if(0 == beatCount){
			lastMeasure = measureNotes;
		}
		measureNotes = [];
	}
	
	console.log(`Tick: ${GET_TICKS()} | audioTick: ${audioTick/10}s | trueTick: ${trueTick/10}s`);
	printArray("Measure", measureNotes);
	if(hasTapped) {
		++audioTick;
	}
	//++trueTick;	
}

function compareBeats(currMeasure, lastMeasure)
{
	if(currMeasure.length == lastMeasure.length && currMeasure.length >= 0)
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