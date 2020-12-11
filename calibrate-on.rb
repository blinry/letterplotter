def run gcode
    puts gcode
    `echo "#{gcode}" | picocom -b 115200 /dev/ttyACM0`
end

#run("G28")
run("G90") # absolute positioning
run("G21") # unit: mm
run("G0 X0 Y50 F4000")
run("G0 Z1 F500")
