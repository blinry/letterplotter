default:
	#ruby make.rb
	./juicy-gcode-0.2.0.1/juicy-gcode map.svg -f juicy-gcode-flavour > output.gcode
	#sh send.sh
