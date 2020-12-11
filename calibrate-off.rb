def run gcode
    puts gcode
    `echo "#{gcode}" | picocom -b 115200 /dev/ttyACM0`
end

#run("G28")
run("G90") # absolute positioning
run("G21") # unit: mm
run("G0 Z5 F500")
