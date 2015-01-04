/* global $, QUnit */
'use strict';

// Note:
// strangely the bound events do not show in the Firefox inspector (34.05) when 
// the player is enclosed within the QUnit fixture 

QUnit.test( 'audio controls have been replaced by player skin', function ( assert ) {
    assert.expect( 3 );

    var song_controls = $('audio[controls]').html();
    assert.ok( song_controls === undefined );

    var song = $('audio');
    assert.ok( song !== undefined );

    var player = $('.playa').html();
    assert.ok( player !== undefined );
});

QUnit.test( 'remaining audio element has no native controls', function ( assert ) {
    var audio = $('audio');
    var aprop = $(audio).prop('controls');
    assert.ok( !aprop );
});

QUnit.test( 'time button initially to zero', function( assert ) {
    var time_button = $('.playa > section > a.btn');
    var time_tooltip = time_button.data('originalTitle');
    assert.equal(time_tooltip, 'Click to Reset<hr style="padding:0; margin:0;" />Position: 00:00');
});

QUnit.test( 'seek slider initially to zero', function( assert ) {
    var seek_slider = $('.playa > section > div > input');
    assert.equal(seek_slider.attr('value'), 0);
});

// This one is not suitable for automated testing as the latency of the browser is so unpredictable.
// Not entirely satisfactory since you have to run the test suite more than once to achieve sufficent response from the browser.
// But we want to do a test that shows that the UI controls are working rather than wait on DOM events directly 
QUnit.test( 
    'play sequence: mute button sets volume slider to zero and toggle remembers previous volume' , 
    function ( assert ) {

    var play_button = $('.playa > section > button:first-child');
    var seek_slider = $('.playa > section > div > input');
    var mute_button = $('button.btn:nth-child(4)');
    var volume_slider = $('div.btn:nth-child(5) > input:nth-child(1)');
    var delay = 4000; // milliseconds
    var test_level = '0.13';

    // quiet: we're testing
    volume_slider.val(test_level);
    volume_slider.trigger('change');

    // wait for the volume slider's round-trip side-effect
    // mute button is notified by an audio volumechange 
    var done_1 = assert.async();
    setTimeout(function() {
        play_button.trigger('click');

        // wait for the play button's riund-trip side-effect
        // seek slider is notified by audio.currentTime
        var done_2 = assert.async();
        setTimeout(function() {
            play_button.trigger('click'); // stop play
            assert.equal(seek_slider.val(), '0', 'volume slider remains approximately in poistion after pause');
            mute_button.trigger('click'); // mute

            var done_3 = assert.async();
            setTimeout(function() {
                assert.equal( volume_slider.val(), '0', 'mute button sets volume slider to zero' );
                mute_button.trigger('click'); // unmute

                var done_4 = assert.async();
                setTimeout(function() {
                    // volume should have been restored
                    assert.equal( volume_slider.val(), test_level );

                    done_4();
                    done_3();
                    done_2();
                    done_1();

                }, delay); // wait this long before calling the function above   

            }, delay); // wait for slider to adjust 
            
        }, delay); // wait for the audio to play for a mo 

    }, delay); // wait this long before pressing the play button 
});
