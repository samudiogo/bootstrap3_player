/* global $, QUnit, console */
'use strict';
// Note:
// unusually the bound events within the QUnit fixture do not show in Firefox inspector
QUnit.test( 'audio controls have been replaced by player skin', function ( assert ) {
    assert.expect( 3 );

    var song_controls = $('audio[controls]').html();
    assert.ok( song_controls === undefined );

    var song = $('audio');
    assert.ok( song !== undefined );

    var player = $('.playa').html();
    assert.ok( player !== undefined );
});

QUnit.test( 'audio element has no native controls', function ( assert ) {
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


QUnit.test( 'mute button sets volume slider to zero and remembers previous volume' , function ( assert ) {
    var song = $('audio');
    var play_button = $('.playa > section > button:first-child');
    var seek_slider = $('.playa > section > div > input');
    var mute_button = $('button.btn:nth-child(4)');
    var volume_slider = $('div.btn:nth-child(5) > input:nth-child(1)');
    var done_1 = assert.async();
    var done_2 = assert.async();
    var done_3 = assert.async();
    var done_4 = assert.async();
    volume_slider.val('0.25');
    volume_slider.trigger('change');

    // wait for the volume slider's round-trip side-effect
    // mute button is notified by an audio volumechange 
    setTimeout(function() {
        play_button.trigger('click');
        done_1();
    }, 500); // wait this long before calling the function above    
    // wait for the play button's riund-trip side-effect
    // seek slider is notified by audio.currentTime
    setTimeout(function() {
        // stop play
        play_button.trigger('click');
        assert.ok(seek_slider.val() > '0');
        mute_button.trigger('click'); // mute
        done_2();
    }, 1000); // wait this long before calling the function above    
    setTimeout(function() {
        assert.equal( volume_slider.val(), '0' );
        mute_button.trigger('click'); // unmute
        done_3();
    }, 1500); // wait this long before calling the function above    
    setTimeout(function() {
        // volume should have been restored
        assert.equal( volume_slider.val(),  '0.25' );
        done_4();
    }, 2000); // wait this long before calling the function above    
});
