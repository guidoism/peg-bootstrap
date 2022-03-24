# peg-bootstrap
A PEG that compiles itself: Kragen's [original writeup](peg.md).

The `guido` directory contains a tweaked version of kragen's output.js
that is prettified and a tweaked PEG file to complement those changes.

    cd guido
    make kragen.js

This will run `kragen.js` on `krangen.peg`, prettify the output and then
do a diff against the original.

