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
	//app.stage.addChild(uiText);
	
	debugText = new PIXI.Text('DEBUG');
	debugText.x = 500;
	debugText.y = 0;
	//app.stage.addChild(debugText);
	
	makeBoxes();
	
	startButton = new PIXI.Graphics();
	startButton.beginFill(0x000000);
	startButton.drawCircle(0, 0, 150);
	startButton.eventMode = 'static';
	startButton.cursor = 'pointer';
	startButton.on('pointerdown', setupAudio );
	//startButton.anchor.x = .5;
	//startButton.anchor.y = .5;
	startButton.x = WINDOW_W/2;
	startButton.y = WINDOW_H/2;
	stage.addChild(startButton);
	
	window.addEventListener("keydown", OnKeyDown);
	
	app.ticker.add(tick);
}
var FRAME = 0;

function OnKeyDown(e)
{
	console.log("pressed " + e.keyCode);
	switch(e.keyCode)
	{
		case 49: onTap({target:box1}); break;
		case 50: onTap({target:box2}); break;
		case 51: onTap({target:box3}); break;
		case 52: onTap({target:box4}); break;
		
		case 54: onTap({target:box1a}); break;
		case 55: onTap({target:box2a}); break;
		case 56: onTap({target:box3a}); break;
		case 57: onTap({target:box4a}); break;
	}
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
	box1a.tint = 0xbadfad;
	
	box2.beginFill(0xFFFF00);
	box2a.beginFill(0xFFFF00);
	box2.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box2a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box2.endFill();
	box2a.endFill();
	box2.rotation = Math.PI/4;
	box2a.rotation = Math.PI/4;
	box2a.tint = 0xbadfad;
	
	box3.beginFill(0x00FF00);
	box3a.beginFill(0x00FF00);
	box3.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box3a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box3.endFill();
	box3a.endFill();
	box3.rotation = Math.PI/4;
	box3a.rotation = Math.PI/4;
	box3a.tint = 0xbadfad;
	
	box4.beginFill(0x0000FF);
	box4a.beginFill(0x0000FF);
	box4.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box4a.drawRect(-kBoxWidth/2, -kBoxHeight/2, kBoxWidth, kBoxHeight);
	box4.endFill();
	box4a.endFill();
	box4.rotation = Math.PI/4;
	box4a.rotation = Math.PI/4;
	box4a.tint = 0xbadfad;
	
	const gap = 80;
	box1.x = WINDOW_W/4 - gap;
	box1a.x = WINDOW_W/4 + gap;
	box1.y = WINDOW_H/4;
	box1a.y = WINDOW_H/4;
	box1a.scale.x = .7;
	box1a.scale.y = .7;
	
	box2.x = 3*WINDOW_W/4 + gap;
	box2a.x = 3*WINDOW_W/4 - gap;
	box2.y = WINDOW_H/4;
	box2a.y = WINDOW_H/4;
	box2a.scale.x = .7;
	box2a.scale.y = .7;
	
	box3.x = WINDOW_W/4 - gap;
	box3a.x = WINDOW_W/4 + gap;
	box3.y = WINDOW_H/2;
	box3a.y = WINDOW_H/2;
	box3a.scale.x = .7;
	box3a.scale.y = .7;
	
	box4.x = 3*WINDOW_W/4 + gap;
	box4a.x = 3*WINDOW_W/4 - gap;
	box4.y = WINDOW_H/2;
	box4a.y = WINDOW_H/2;
	box4a.scale.x = .7;
	box4a.scale.y = .7;
	
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
	
	app.stage.addChild(box1a);
	app.stage.addChild(box1);
	app.stage.addChild(box2a);
	app.stage.addChild(box2);
	app.stage.addChild(box3a);
	app.stage.addChild(box3);
	app.stage.addChild(box4a);
	app.stage.addChild(box4);
	
	box1.alpha = 0;
	box1a.alpha = 0;
	box2.alpha = 0;
	box2a.alpha = 0;
	box3.alpha = 0;
	box3a.alpha = 0;
	box4.alpha = 0;
	box4a.alpha = 0;
}

const SOUND_LIST = ["audio/djembe-1.wav"
					,"audio/djembe-2.wav"
					,"audio/djembe-3.wav"
					,"audio/djembe-4.wav"];
var BUFFER_LIST = [{},{},{},{}];				

function setupAudio()
{
	ButtonFade();
	audioContext = new AudioContext();	
	LoadSounds(SOUND_LIST, BUFFER_LIST);
}

function SOUND_NOW()
{
	return audioContext.currentTime;
};

function ButtonFade()
{
	var tm = new TimelineMax({paused:true});
	tm.to(startButton, {alpha:0, duration:.25, onComplete:function(){stage.removeChild(startButton);;}});
	tm.to([box1,box1a,box2,box2a,box3,box3a,box4,box4a], {alpha:1, duration:.25});
	tm.play();
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

function Tap(_id){
	this.idx = _id >= 10 ? _id - 10 : _id;
	this.trueIdx = _id;
	this.time = audioContext.currentTime - frameStartTime;
	this.trueTime = audioContext.currentTime;
	this.isEndTap = _id >= 10;
}

Tap.prototype.toString = function TapToString() {
  return `{id:${this.idx}|${this.trueIdx}, TIME:${String(this.time).substring(0,4)}, *true-time*:${String(this.trueTime).substring(0,4)}, end? ${this.isEndTap}`;
};

function Sequence(_notes, _space) {
	this.notes = _notes;
	this.sources = [];
	this.length = _notes.length;
	this.lastIndex = _notes.length-1;
	this.space = _space;
	this.duration = _notes[_notes.length-1].trueTime - _notes[0].trueTime;
	this.nextPlay = 0;
	this.lastPlay = 0;
	this.scheduled = false;

	this.Play = function Play(when)
	{
		this.nextPlay = when;
		this.scheduled = true;
		console.log("Auto beat");
		printArray("A Beat", this.notes);
		for(let i = 0; i < this.notes.length; ++i) {
			let aTap = this.notes[i];
			this.sources[i] = audioContext.createBufferSource();
			this.sources[i].buffer = autoBuffers[aTap.idx];
			this.sources[i].connect(audioContext.destination);
			let aTime = (when + aTap.time);
			this.sources[i].start(aTime);
			if(i == this.lastIndex) {
				this.lastPlay = aTime;
			}
			console.log(`Play ${this.notes[i].idx} at ${aTime}`);
		}
	}
}

function AdjustSpace(space)
{
	/*
	Have array of intervals
	Get modulo for each
	Determine which had smallest
	Divide space by that interval
	Round to nearest interval from space
	Return that value as newSpace
	*/
	const intervals = [1/16, 1/8, 1/4, 1/2, 1];
	var values = [];
	
	for(let i = 0; i < intervals.length; ++i) {
		values[i] = space % intervals[i];
	}
	
	var min = 9999;
	var mIndex = -1;
	var interval = 0;
	for(let i = 0; i < values.length; ++i) {
		if(values[i] < min) {
			mIndex = i;
			min = values[i];
			interval = intervals[i];
		}
	}
	
	var foo = space % interval;
	if(foo < interval/2){
		return space - foo;
	}
	else {
		return (space - foo) + interval;
	}
}


var autoBuffers;
var once = true;
function onTap(ctx)
{
	if(once)
	{		
		/*
		setInterval(function(){		
			//console.log("Tick: " + audioTick);
			CheckBeat();
		}, TICK_LENGTH);
		*/
		autoBuffers = [...BUFFER_LIST]; // Should be a copy?
		TweenLite.to(bar, {x:WINDOW_W, duration:(MEASURE_LENGTH/1000), repeat:-1, ease: "linear"});
	}
	
	/*
	Check for sequence started
		if so
			Compare curr measure array to last measure array
			If match, schedule loop
		if not
			Clear out curr meausre array
			Add in next note
	*/
	
	if(!sequenceStarted) {
		frameStartTime = audioContext.currentTime;
		measureNotes = [];
		//lastMeasure = [];
		sequenceStarted = true;
	}
		
	var o = new Tap(ctx.target.boxIndex);
	
	measureNotes.push(o);
	
	if(o.isEndTap){
		sequenceStarted = false;
		console.log("End Tap");
		
		if(compareBeats(measureNotes, lastMeasure)) {
			++beatCount;
			if(beatCount >= 2){
				console.log("Another one");
				let space = measureNotes[0].trueTime - lastMeasure[lastMeasure.length-1].trueTime;
				let newSpace = AdjustSpace(space);
				var seq = new Sequence(measureNotes, space);
				SEQS.push(seq);
				seq.Play(audioContext.currentTime+space);
			}
		}
		else {
			beatCount = 0;
		}
		
		printArray("Curr Notes ", measureNotes);
		printArray("Last notes ", lastMeasure);
		lastMeasure = measureNotes;
	}
	
	playSound(o.idx, 0);
	
	console.log("Tapped " + o);
	
	
	if(once) {
		once = false;
		hasTapped = true;
		//CheckBeat();
	}
}

function tick()
{
	//console.log("tick");
	//const THRESH
	++FRAME;
	if(FRAME%10 == 0){
		for(s of SEQS) {
			if(SOUND_NOW() > s.lastPlay && SOUND_NOW() > s.nextPlay){
				let nextTime = s.lastPlay + s.space;
				s.Play(nextTime);
			}
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

var measure = 0;
var sampleCheckStartIndex = 0;
var measureNotes = [];
var autoBeats = [];
const BPM = 60;
const MEASURE_LENGTH =  (1 / (BPM / 60) * 1000); // milliseconds
const BEAT_DURATION = 1 / (BPM / 60);
var lastMeasure = [];
var beatCount = 0;
var hasTapped = false;

function compareBeats(currMeasure, lastMeasure)
{
	if(currMeasure.length == lastMeasure.length && lastMeasure.length > 1)
	{
		for(let i = 0; i < currMeasure.length; ++i)
		{
			const currNote = currMeasure[i];
			const lastNote = lastMeasure[i];
			if(currNote.idx == lastNote.idx)
			{
				if(Math.abs(currNote.time - lastNote.time) > .2)
				{
					//console.log("Got Here 1");
					return false;
				}
				else
				{
					console.log("Matches: " + currNote);
				}
			}
		}
		//console.log("Got Here 2");
		console.log("Matching-ish beats");
		return true;
	}
	
	//console.log("Got Here 3");
	return false;
}