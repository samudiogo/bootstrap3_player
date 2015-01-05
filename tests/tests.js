/* global $, QUnit */
'use strict';

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
QUnit.module( "before exploration", {
  beforeEach: function() {
    self.seek_slider = $('.playa > section > div > input');
    self.play_button = $('.playa > section > button:first-child');
    self.mute_button = $('.playa button.btn:nth-child(4)');
    self.volume_slider = $('.playa div.btn:nth-child(5) > input:nth-child(1)');     
    self.volume_level = '0.13';
  }
});


// 'play sequence: mute button sets volume slider to zero and toggle remembers previous volume'
// OK when audio NOT enclosed in `div #qunit-fixture`.

// We want to do a test that shows that the UI controls are working rather than wait on DOM events directly 
QUnit.skip( // skip when audio enclosed in `#qunit-fixture` it'll fail first time! 
    'play sequence: mute button sets volume slider to zero and toggle remembers previous volume' , 
    function ( assert ) {

    var delay = 1000; // milliseconds
    var volume_level = '0.13';

    // quiet: we're testing
    self.volume_slider.val(volume_level);
    self.volume_slider.trigger('change');

    // wait for the volume slider's round-trip side-effect
    // mute button is notified by an audio volumechange 
    var done_1 = assert.async();
    var done_2 = assert.async();
    var done_3 = assert.async();
    var done_4 = assert.async();

    setTimeout(function() {
        self.play_button.trigger('click');

        // wait for the play button's riund-trip side-effect
        // seek slider is notified by audio.currentTime
        setTimeout(function() {
            self.play_button.trigger('click'); // stop play
            assert.ok( self.seek_slider.val() > '0', 'volume slider remains approximately in non-zero position after pause');
            self.mute_button.trigger('click'); // mute
            assert.ok( true, 'mute button clicked (to mute) after volume slider checked' );

            // wait for the mute button to have a round-trip effect on the volume slider
            setTimeout(function() {
                assert.equal( self.volume_slider.val(), '0', 'mute button sets volume slider to zero' );
                self.mute_button.trigger('click'); // unmute
                assert.ok( true, 'mute button clicked (to UN-mute) after volume slider checked' );

                // again, wait for the mute button to have a round-trip effect on the volume slider
                setTimeout(function() {
                    assert.equal( self.volume_slider.val(), self.volume_level, 'volume has been restored' );
                    done_4();
                }, delay); // wait this long before calling the function above   
                done_3();
            }, delay); // wait for slider to adjust          
            done_2();
        }, delay); // wait for the audio to play for a mo 
        done_1();
    }, delay); // wait this long before pressing the pause button 
});
