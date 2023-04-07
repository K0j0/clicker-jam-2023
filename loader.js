// 
function LoadSounds(_soundUrlList, _bufferList) {
	for(var i = 0; i < _soundUrlList.length; ++i) {
		(function(i) {
			var url = _soundUrlList[i];
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';

			// Decode asynchronously
			request.onload = function() {
				audioContext.decodeAudioData(request.response, function(buffer) {
					_bufferList[i] = buffer;
					console.log(`Got Sound Buffer Response for: ${url}`);
				}, function(){ console.log("dang..."); });
			}
			console.log(`Requesting: ${url}`);
			request.send();
		})(i);
	}
}