$(document).ready(function(){
    
		var video = $("#video-player");
		var windowObj = $(window);

		function onResizeWindow() {
			resizeVideo(video[0]);
		}

		function onLoadMetaData(e) {
			resizeVideo(e.target);
		}

		function resizeVideo(videoObject) {
			var percentWidth = videoObject.clientWidth * 100 / videoObject.videoWidth;
			var videoHeight = videoObject.videoHeight * percentWidth / 100;
			video.height(videoHeight);
		}

		video.on("loadedmetadata", onLoadMetaData);
		windowObj.resize(onResizeWindow);
	}
);