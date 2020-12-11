default:
	ruby make.rb
	inkscape result-sorted.svg
plot:
	./juicy-gcode-0.2.0.1/juicy-gcode result-sorted.svg -f juicy-gcode-flavour > output.gcode
	sh send.sh
