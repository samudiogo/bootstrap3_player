Testing notes:
-----------

-  Run tests in ECMAScript 6-compatible browser e.g. Firefox 34 or later
-  [FuncUnit testing library](http://funcunit.com/index.html) is used for Functional Tests with waits for asynchrous events e.g. round trip from mute button -> audio element action -> event listener on volume slider etc.
-  FuncUnit adds  to [QUnit](http://api.qunitjs.com/)'s more basic async support.
-  Don't test include player html in `#qunit-fixture`  when running FuncUnit tests. i.e. Our test script consists of just one Functional Test with FuncUnit vs lots of atomic Unit Tests with QUnit.
-  The test files BeBopAliens.ogg and BeBopAliens.mp3 are my original work and available to you under [Creative Commens Licence 0](http://creativecommons.org/about/cc0)
