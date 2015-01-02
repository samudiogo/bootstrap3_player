bootstrap3_player
================

An HTML5 Audio Player Skin For Twitter Bootstrap 3

### Requires:

  * Twitter Bootstrap 3 - http://twitter.github.com/bootstrap/
  * jQuery - http://jquery.com/

### Forked from William Randol's [bootstrap-player](https://github.com/WilliamRandol/bootstrap-player)

 -  `bootstrap-player` is great for Bootstrap 2
 -  All the functionality of William Randol's player is preserved   
 (subject to QUnit test suite in progress :waxing_crescent_moon:)

### Main differences

#### Reduced dependencies

- `html5slider.js` no longer required since Firefox 23 (it's now at 34 at this time of writing)
- Font Awesome no longer required thanks to [Glyphicons](http://glyphicons.com/) for the Halflings glyphs font that comes free of cost with Bootstrap 3

#### <a name="cdiff"></a>CSS differences

- Reduced custom css: greater reliance on Bootstrap 3 component styling  
- Bootstrap 3 classes replace many Bootstrap 2 classes. Notably:  
        -   `span*` => `col-xs-*`   
        xs elements stay horizontal when player button rows narrow whereas the other device width classes stack  
        -   `.disabled`  => opaque property on `input[type="range"]`.  
        (`.disabled` disables the sliders as well as styling them opaquely)  
        -   `.icon-spin` => `glyphicon glyphicon-refresh spin`  
-  `.spin` introduced to apply rotation keyframes to `glyphicon-refresh`

#### Javascript differences

-  Changes only made to incorporate [CSS Differences](#cdiff)

### Live demo

As development server is available :waxing_crescent_moon:

### Screenshots

-  Audio with no additional data ![](bPlayer_demo_data_no.png?raw=true)

-  Audio with data - collapsed ![](bPlayer_demo_data_0.png?raw=true)

-  Audio with data - expanded ![](bPlayer_demo_data_1.png?raw=true)




