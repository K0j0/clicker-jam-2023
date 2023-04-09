var app;
var stage;
var sprite;
var WINDOW_W = 800;
var WINDOW_H = 800;
const kAudioSourceCount = 10;
var currSoundIndex = 0;
var uiText;
var debugText;
var count = 0;
var box1, box2, box3, box4;
var startButton;

var audioContext;
var audioLoader;

const kBoxWidth = 150;
const kBoxHeight = 150;

var sources;
const SOURCE_COUNT = 4;


var audioTick;
var trueTick;

var frameStartTime;