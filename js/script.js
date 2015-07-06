/*jslint browser: true*/
/*global $, jQuery, console*/
/*jslint indent: 4, maxerr: 50, vars: true, regexp: true, sloppy: true */
jQuery(document).ready(function ($) {

    'use strict';


    /***************************************/
    /***          INIT VARIABLES         ***/
    /***************************************/

    // GET MEDIA PLAYER ELEMENTS
    var mediaPlayer = document.getElementById('videoPlayer'),
        playBtn = document.getElementById('play_btn'),
        stopBtn = document.getElementById('stop_btn'),
        volumeInc_btn = document.getElementById('volumeInc_btn'),
        replay_btn = document.getElementById('replay_btn');

    // DISABLE VIDEO DEFAULT CONTROLS
    mediaPlayer.controls = false;

    // INITIALIZE VOLUME TO 50%
    mediaPlayer.volume = 0.5;



    /***************************************/
    /***            FUNCTIONS            ***/
    /***************************************/

    // CHANGE BUTTON LABEL
    function changeButtonType(btn, remove, add) {

        $(btn).removeClass(remove);
        $(btn).addClass(add);

    }


    // PLAY/PAUSE ON BUTTON CLICK
    function togglePlay() {

        // CHECK IF VIDEO IS RUNNING
        if (mediaPlayer.paused === true) {

            mediaPlayer.play();
            changeButtonType(this, 'glyphicon-play', 'glyphicon-pause');

        } else {

            mediaPlayer.pause();
            changeButtonType(this, 'glyphicon-pause', 'glyphicon-play');

        }

    }


    // STOP MEDIA ON BUTTON CLICK
    function stopMedia() {

        mediaPlayer.pause();
        mediaPlayer.currentTime = 0;

        // reset play button
        changeButtonType(playBtn, 'glyphicon-pause', 'glyphicon-play');

    }


    // UPDATE PROGRESS BAR
    function updateProgressBar() {

        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
        $('#progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);

    }


    // UPDATE CURRENT VIDEO TIME
    function updateTime() {

        var currentTime = document.getElementById('currentTime'),
            time;

        if (mediaPlayer.duration < 3600) {
            time = new Date(mediaPlayer.currentTime * 1000).toUTCString().replace(/.*(\d{2}:\d{2}).*/, "$1");
        } else {
            time = new Date(mediaPlayer.currentTime * 1000).toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        }

        currentTime.innerHTML = time;

    }


    // SHOW OR HIDE SLIDER ON CLICK
    function showSlider() {

        // CHECK IF SLIDER IS VISIBLE OR NOT
        if ($('#sliderContainer').css('display') === 'none') {

            $('#sliderContainer').fadeIn('slow');

        } else {

            $('#sliderContainer').fadeOut('slow');

        }

    }


    // CHANGE VOLUME
    function changeVolume(volumeLevel) {

        if (volumeLevel < 0) {
            mediaPlayer.volume = 0;
        } else {
            mediaPlayer.volume = volumeLevel;
        }

    }


    // MUTE VOLUME
    /*
    function muteVolume() {

        if (mediaPlayer.muted) {
            //changeButtonType(this, 'Mute');
            mediaPlayer.muted = false;
        } else {
            //changeButtonType(this, 'Unmute');
            mediaPlayer.muted = true;
        }

    }
    */


    // REPLAY MEDIA
    function replayMedia() {

        mediaPlayer.currentTime = 0;
        mediaPlayer.play();
        changeButtonType(playBtn, 'glyphicon-play', 'glyphicon-pause');

    }


    function setProgressWidth() {

        // GET THE WIDTH OF EACH ELEMENT IN THE MEDIA CONTROL SECTION (INCLUDING THE 45PX OF SPACE INBETWEEN)
        // AND SUBSTRACT THEM FROM TOTAL WIDTH TO CALCULATE THE SPACE LEFT AVAILABLE FOR THE PROGRESS BAR
        var widthAvailable = $('.media-controls').width() - $('#playControls').width() -
                             $('#timeContainer').width() - $('#volumeControls').width() - 38 + "px";

        $('#progressContainer').css("width", widthAvailable);

    }





    /***************************************/
    /***          SET LISTENERS         ***/
    /***************************************/

    // SET PROGRESS BAR WIDTH DYNAMICALL ON LOAD AND RESIZE!
    $(window).resize(setProgressWidth);
    setProgressWidth();

    // BUTTON LISTENERS
    playBtn.onclick = togglePlay;
    stopBtn.onclick = stopMedia;
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
    mediaPlayer.addEventListener('timeupdate', updateTime, false);
    volumeInc_btn.onclick = showSlider;
    replay_btn.onclick = replayMedia;






/*****************************************/
/***        jQuery UI Slider          ***/
/****************************************/

    $(function () {

        // CREATE AN INSTANCE ON THE SLIDE OBJECT
        var slider = $('#slider');

        slider.slider({
            range: "min",
            min: 0,
            max: 100,
            orientation: "vertical",
            value: 50,

            // EVENT WHEN SLIDER IS IN USE
            slide: function () {

                // GET THE VALUE OF THE SLIDER
                var value = slider.slider('value');

                // CALL PARENT FUNCTION TO CHANGE VOLUME
                changeVolume((value / 100).toFixed(1));

                // CHANGE BUTTON ICON ACCORDING TO VOLUME LEVEL
                if ((value / 100).toFixed(1) <= 0.0) {
                    $('#volumeInc_btn').removeClass('icon-volume-up icon-volume-down').addClass('icon-volume-off');
                } else if ((value / 100).toFixed(1) <= 0.4) {
                    $('#volumeInc_btn').removeClass('icon-volume-off icon-volume-up').addClass('icon-volume-down');
                } else if ((value / 100).toFixed(1) <= 0.8) {
                    $('#volumeInc_btn').removeClass('icon-volume-off icon-volume-down').addClass('icon-volume-up');
                }

            }

        });

    });

});
