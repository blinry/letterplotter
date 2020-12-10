default:
	ruby make.rb
plot:
	./juicy-gcode-0.2.0.1/juicy-gcode result.svg -f juicy-gcode-flavour > output.gcode
	sh send.sh
