# Letterplotter

Generates map drawing for an envelope from an address.

## Requirements

- Ruby
- `osmtogeojson`
- `mapshaper`
- `juicy-gcode`
- `svgsort`
- `rlwrap`
- `pronsole`

## To calibrate on a 3D printer

- Auto home.
- Mesh bed levelling.
- Put pen in pen attachment.
- Adjust the pen until a Z-coordinate of 2 mm puts the tip gently on the paper, so that it leaves a mark.
- Move axes until pen tip is directly over the lower left corner of your paper. Put the correct `offset_x` and `offset_y` values in `index.js`.

## To run

- Put an address in `text`
- Run `make`
- Inspect `result-sorted.svg`. If you're happy, run `make plot`.
