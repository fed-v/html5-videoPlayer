document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);


// SET PROGRESS BAR WIDTH DYNAMICALL ON LOAD AND RESIZE!
$(window).resize(setProgressWidth);

function setProgressWidth(){

    // I SHOULD EXPLAIN WHAT'S GOING ON HERE!
    var parentWidth = $('.media-controls').width();
    var playControlsWidth = $('#playControls').width();
    var timeContainerWidth = $('#timeContainer').width();
    var volumeControlsWidth = $('#volumeControls').width();
    var guttersWidth = 45;
    var widthAvailable = parentWidth - playControlsWidth - timeContainerWidth - volumeControlsWidth - guttersWidth + "px";
    $('#progressContainer').css("width", widthAvailable);


    // LET ME SEE THEM NUMBERS, BOY!
    console.log("Paretent Width :"+parentWidth+"\nPlayer Controls Width: "+playControlsWidth+"\nVolume Controls Width: "+volumeControlsWidth+"\nTime Controls Width :"+timeContainerWidth);

}

setProgressWidth();






function initialiseMediaPlayer() {

    // SET THE PROGRESS BAR TO 0%!
    $('#progress-bar').css('width', '0%').attr('aria-valuenow', '0');

    // GET MEDIA PLAYER ELEMENTS
    var mediaPlayer = document.getElementById('videoPlayer');
    mediaPlayer.controls = false;
    var playBtn = document.getElementById('play_btn');
    var stopBtn = document.getElementById('stop_btn');
    var volumeInc_btn = document.getElementById('volumeInc_btn');
    var volumeDec_btn = document.getElementById('volumeDec_btn');
    var mute_btn = document.getElementById('mute_btn');
    var replay_btn = document.getElementById('replay_btn');

    // SET LISTENERS
    playBtn.onclick = togglePlay;
    stopBtn.onclick = stopMedia;
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
    mediaPlayer.addEventListener('timeupdate', updateTime, false);
    volumeInc_btn.onclick = changeVolume;
    volumeDec_btn.onclick = changeVolume;
    mute_btn.onclick = muteVolume;
    replay_btn.onclick = replayMedia;


    // PLAY/PAUSE ON BUTTON CLICK
    function togglePlay(){

        // CHECK IF VIDEO IS RUNNING
        if(mediaPlayer.paused === true){

            mediaPlayer.play();
            changeButtonType(this, 'glyphicon-play', 'glyphicon-pause');

        }else{

            mediaPlayer.pause();
            changeButtonType(this, 'glyphicon-pause', 'glyphicon-play');

        }

    }


    // STOP MEDIA ON BUTTON CLICK
    function stopMedia(){

        mediaPlayer.pause();
        mediaPlayer.currentTime = 0;

        // reset play button
        changeButtonType(playBtn, 'glyphicon-pause', 'glyphicon-play');

    }


    // CHANGE BUTTON LABEL
    function changeButtonType(btn, remove, add) {
       //btn.title = value;
       //btn.innerHTML = value;

       $(btn).removeClass(remove);
       $(btn).addClass(add);
       //btn.className = value;

    }


    // UPDATE PROGRESS BAR
    function updateProgressBar() {

       // UPDATE PROGRESS BAR
       var progressBar = document.getElementById('progress-bar');
       var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
       //progressBar.value = percentage;
       $('#progress-bar').css('width', percentage+'%').attr('aria-valuenow', percentage);
       //progressBar.innerHTML = percentage + '% played';

    }


    // UPDATE CURRENT VIDEO TIME
    function updateTime() {

        var currentTime = document.getElementById('currentTime');
        var time;

        if(mediaPlayer.duration < 3600){
            time = new Date(mediaPlayer.currentTime*1000).toUTCString().replace(/.*(\d{2}:\d{2}).*/, "$1");
        }else{
            time = new Date(mediaPlayer.currentTime*1000).toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        }

        currentTime.innerHTML = time;

    }


    // CHANGE VOLUME
    function changeVolume() {

        if (this.id === 'volumeInc_btn') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
            else mediaPlayer.volume -= (mediaPlayer.volume === 0 ? 0 : 0.1);

        mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);

    }


    // MUTE VOLUME
    function muteVolume() {

        if (mediaPlayer.muted) {
            //changeButtonType(this, 'Mute');
            mediaPlayer.muted = false;
        }else {
            //changeButtonType(this, 'Unmute');
            mediaPlayer.muted = true;
        }

    }


    // REPLAY MEDIA
    function replayMedia() {

        mediaPlayer.currentTime = 0;
        mediaPlayer.play();
        changeButtonType(playBtn, 'glyphicon-play', 'glyphicon-pause');

    }

} // END OF INIT FUNCTION









/*
jQuery(document).ready(function( $ ) {

    // GET VIDEO ELEMENT
    video = document.querySelector("#myVideo");


    // BUTTON ONCLICK
    $( "#play_btn" ).click(function() {


        // CHECK IF VIDEO IS RUNNING
        if(video.paused == true){

            video.play();
            $(this).text('Stop')

        }else{

            video.pause();
            $(this).text('Play')

        }

    });

});*/
