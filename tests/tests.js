/* global $, QUnit, self, F, console */
'use strict';

//  Functional tests of the UI elements using FuncUnit
// `F` invokes FuncUnit tests. F is a "copy" of $, created using jQuery.sub.
// FuncUnit requires that test html is not within `div #qunit-fixture`.

QUnit.test( 'audio controls have been replaced by player skin', function ( assert ) {
    
    F('audio').exists('there is a remaining audio element' );

    F('audio[controls]').missing('remaining audio element has no native controls');

    F('.playa').exists('the player skin has been created' );

});


QUnit.module( "Play sequence", {
  beforeEach: function() {

    // It was decided not to have id's on the production markup
    // So we add jQury collections and html id's here for clarity in testing
    self.seek_slider    = $('.playa > section > div > input');
    self.play_button    = $('.playa > section > button:first-child');
    self.mute_button    = $('.playa button.btn:nth-child(4)');
    self.volume_slider  = $('.playa div.btn:nth-child(5) > input:nth-child(1)');  
    self.time_info_sel  =   '.playa button.text-muted'; // not a very robust selector 
    self.time_info      = $(self.time_info_sel); 

   // Add some id's to the UI controls for testing only
    self.mute_button.attr(  'id', 'mute_button');
    self.seek_slider.attr(  'id', 'seek_slider');
    self.play_button.attr(  'id', 'play_button');
    self.volume_slider.attr('id', 'volume_slider');
    // self.time_info.attr(    'id', 'time_info'); // Player script overwrites id attribute

    self.mute_volume_up     = '<i class="glyphicon glyphicon-volume-up"></i>';
    self.mute_volume_down   = '<i class="glyphicon glyphicon-volume-down"></i>';
    self.mute_volume_mute   = '<i class="glyphicon glyphicon-volume-off"></i>';

  } // beforeEach
}); // module

QUnit.test( 'play sequence:', function( assert ) {

    F('#seek_slider').val('0', 'seek slider initially to zero');

    F(self.time_info_sel).exists(
        function () {
            var info =  F('.playa button.text-muted').data('originalTitle');
            var text =  F('.playa button.text-muted').text();
            // console.log(info, text);
            // tests run in ECMAScript 6 - compatible browsers e.g. Firefox 34
            assert.ok(info.contains('Position:'), 'time button ToolTip initial shows position');
            assert.ok(text !== '00:00', 'time button initial shows song length');
        });

    F('#mute_button').click().html(self.mute_volume_mute, 'clicking mute sets the mute icon to mute');

    F('#volume_slider').exists( function () {
        self.volume_slider.val('0.3').trigger('change');
        });

    F('#volume_slider').val('0.3');

    F('#mute_button').html(self.mute_volume_down, 'lowering the volume slider changes the mute icon');

    // quiet: we're testing
    F('#mute_button').click().html(self.mute_volume_mute, 'clicking mute changes the mute icon');

    F('#play_button').click();

    F(self.time_info_sel).exists(
        function () {
            var info =  F('.playa button.text-muted').data('originalTitle');
            var text =  F('.playa button.text-muted').text();
            // console.log(info, text);
            // tests run in ECMAScript 6 - compatible browsers e.g. Firefox 34
            assert.ok(info.contains('Position:'), 'time button ToolTip  shows position during play');
            assert.ok(text === '00:00' , 'time button itself shows duration of play');
        });
});


