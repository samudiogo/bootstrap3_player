/* global $, QUnit, self, F, console */
'use strict';

// Functional tests of the UI elements using FuncUnit
// FuncUnit manages the behaviour of the QUnit run server so that
// 1) test steps are run in the intended sequence and 
// 2) the completion of the asynchronous UI operations are properly waited for
// `F` invokes FuncUnit tests. F is a "copy" of $, created using jQuery.sub.
// FuncUnit requires that test html is not within `div #qunit-fixture`.

QUnit.module( "Functional test", {
  beforeEach: function() {

    // It was decided not to have id's on the production markup
    // So we add jQuery collections and html id's here for clarity in testing only
    self.seek_slider    = $('.playa > section > div > input');
    self.play_button    = $('.playa > section > button:first-child');
    self.mute_button    = $('.playa button.btn:nth-child(4)');
    self.volume_slider  = $('.playa div.btn:nth-child(5) > input:nth-child(1)');  
    self.time_info_slr  =   '.playa button.text-muted'; // not a very robust selector 
    self.time_info      = $(self.time_info_slr); 

   // Add some id's to the UI controls for testing only
    self.mute_button.attr(  'id', 'mute_button');
    self.seek_slider.attr(  'id', 'seek_slider');
    self.play_button.attr(  'id', 'play_button');
    self.volume_slider.attr('id', 'volume_slider');
    // self.time_info.attr(    'id', 'time_info'); // No point: player script often overwrites id attribute

    self.mute_volume_up     = '<i class="glyphicon glyphicon-volume-up"></i>';
    self.mute_volume_down   = '<i class="glyphicon glyphicon-volume-down"></i>';
    self.mute_volume_mute   = '<i class="glyphicon glyphicon-volume-off"></i>';

    F('#seek_slider').exists( function () {
        $('#seek_slider').val('0').trigger('change'); // start from the beginning at each  test
    }).wait(2000);

  } // beforeEach
}); // module

QUnit.test( 'audio controls have been replaced by player skin', function ( assert ) {
    
    F('audio').exists('there is a remaining audio element' );

    F('audio[controls]').missing('remaining audio element has no native controls');

    F('.playa').exists(
        function () {
            assert.ok(true, 'DOM checks complete');
        }, 'the player skin has been created' );

});

QUnit.test( 'play sequence:', function( assert ) {

    var preferred_volume = '0.1'; // during testing
    var seek_max;

    F('#seek_slider').val('0', 'seek slider initially at zero');

    F(self.time_info_slr).exists(
        function () {
            var tooltip =  F(self.time_info_slr).data('originalTitle');
            var text =  F(self.time_info_slr).text();
            seek_max = Number($('#seek_slider').prop('max'));
            // tests run in ECMAScript 6 - compatible browsers e.g. Firefox 34
            assert.ok(true, 'the next assertion may fail with a script error in Safari \
                and Chrome and older versions of Firefox');
            assert.ok(tooltip.contains('Position:'), 'time button ToolTip initial shows position');
            assert.ok(text !== '00:00', 'time button initial shows song length');
        });

    F('#mute_button').click().html(self.mute_volume_mute, 'clicking mute sets the mute icon to mute');

    // FuncUnit drag doesn't seem to work on this `input type="range"` slider
    F('#volume_slider').exists( function () {
        self.volume_slider.val(preferred_volume).trigger('change');
        });

    F('#volume_slider').val(preferred_volume, 'wait for volume slider to go low');

    F('#mute_button').html(self.mute_volume_down, 'lowering the volume slider changes the mute icon');

    // quiet: we're testing
    F('#mute_button').click().html(self.mute_volume_mute, 'clicking mute changes the mute icon to "muted"');

    F('#play_button').click(); // toggle: start play

    F(self.time_info_slr).exists(
        function () {
            var tooltip =  F(self.time_info_slr).data('originalTitle');
            var song_position =  F(self.time_info_slr).text();
            // tests run in ECMAScript 6 - compatible browsers e.g. Firefox 34
            assert.ok(tooltip.contains('Position:'), 'time button ToolTip  shows position during play when muted');
            assert.ok(song_position === '00:00' , 'time button itself shows duration of play');
        });

    F('#mute_button').click().html(self.mute_volume_down, 'clicking mute changes the mute icon to "volume is low"');

    F('#volume_slider').val(preferred_volume, 'toggling mute restores previous volume');

    F(self.time_info_slr).wait(3000).exists( /// give it time to start playing
        function () {
            var tooltip =  F(self.time_info_slr).data('originalTitle');
            // tests run in ECMAScript 6 - compatible browsers e.g. Firefox 34
            return  tooltip.contains('Length:');
        }, 'time button ToolTip  shows current time (length) during play when not muted');
    
    F('#seek_slider').exists( 
        function () {
            $('#seek_slider').val(seek_max - 5).trigger('change'); 
            assert.ok(true, 'skipping to the end of the track');
        // }).wait(3000);
        });

    F('#seek_slider').val('0', 'seek slider finally at zero');

});


