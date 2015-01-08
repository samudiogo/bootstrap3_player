### Main differences between `bootstrap-player` and `bootstrap3_player`

#### Reduced dependencies

- `html5slider.js` no longer required since Firefox 23 (it's now at 34 at this time of writing)
- Font Awesome no longer required thanks to [Glyphicons](http://glyphicons.com/) for the Halflings glyphs font that comes free of cost with Bootstrap 3

#### <a name="cdiff"></a>CSS differences

- Reduced custom css: greater reliance on Bootstrap 3 component styling; particularly buttons and button groups. 
- Bootstrap 3 classes replace many Bootstrap 2 classes. Notably:  
        -   `span*` => `col-xs-*`   
        xs elements stay horizontal when player button rows narrow whereas the other device width classes stack  
        -   `.disabled`  => opaque property on `input[type="range"]`.  
        (`.disabled` disables the sliders as well as styling them opaquely)  
        -   `.icon-spin` => `glyphicon glyphicon-refresh spin`  
-  `.spin` introduced to apply rotation keyframes to `glyphicon-refresh`

#### Javascript differences

-  Functionality of William Randol's [bootstrap-player](https://github.com/WilliamRandol/bootstrap-player) not changed 
-  Changes only made to incorporate [CSS Differences](#cdiff)
-  Program statements indented per jslint / jshint for future readers
-  A very few comments added for the benefit of future readers 

#### Live demo

-  Bootstrap 3 grid classes:  
    -  absolutely addressed links to external files used in the demo  
    -  redundant css and js links removed
-  `index.html` is all the "how to" documenntation really required. Please raise an issue if I am wrong.

