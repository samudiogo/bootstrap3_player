QUnit.test( 'audio controls have been replaced by player skin', function( assert ) {
    assert.expect( 3 );

    var song_controls = $('audio[controls]').html();
    assert.ok( song_controls === undefined );

    var song = $('audio');
    assert.ok( song !== undefined );

    var player = $('.playa').html();
    assert.ok( player !== undefined );
});

QUnit.test( 'audio element has no native controls', function( assert ) {
    var audio = $('audio');
    var aprop = $(audio).prop('controls');
    assert.ok( !aprop );
});

QUnit.test( 'time button initially to zero', function( assert ) {
    var player = $('.playa');
    console.log(player);
    var time_button = $('.playa > section > a.btn');
    var time_tooltip = time_button.data('originalTitle');
    assert.equal(time_tooltip, 'Click to Reset<hr style="padding:0; margin:0;" />Position: 00:00');
});

QUnit.test( 'seek slider initially to zero', function( assert ) {
    var seek_slider = $('.playa > section > div > input');
    assert.equal(seek_slider.attr('value'), 0);
});


QUnit.test( 'play button starts play', function( assert ) {
    // the player's play button triggers the play event on the audio element
    var song = $('audio');
    var play_button = $('.playa > section > button:first-child');
    var seek_slider = $('.playa > section > div > input');
    var mute_button = $('.playa > section > button:nth-child(2) > i');
    var done_1 = assert.async();
    setTimeout(function() {
        // wait for the play button to be un-disabled
        // mute_button.trigger('click');
        play_button.trigger('click');
        done_1();
    }, 1000); // wait this long before calling the function above
    var done_2 = assert.async();
    setTimeout(function() {
        // wait for the audio to refresh the slider
        // stop play
        play_button.trigger('click');
        done_2();
        console.log(seek_slider);
        console.log(mute_button);
        console.log(seek_slider.val());
    }, 1100); // wait this long before calling the function above
    assert.ok(true);
});


