require "cgi"
require "json"

address = CGI.escape(IO.readlines("text")[1..-1].join(",").gsub("\n", ""))
p address

json = `curl "https://nominatim.openstreetmap.org/search?q=#{address}&format=json&addressdetails=0"`
json = JSON.parse(json)

size_x = 0.01
size_y = 0.005

lat = json[0]["lat"].to_f + rand()*size_y/10 - rand()*size_y/20
lon = json[0]["lon"].to_f + size_x/2 + rand()*size_x/10 - rand()*size_x/20
p lat
p lon

left = lon - size_x
right = lon + size_x

bottom = lat - size_y
top = lat + size_y

`wget https://api.openstreetmap.org/api/0.6/map?bbox=#{left},#{bottom},#{right},#{top} -O map.osm`
`osmtogeojson map.osm > map.geojson`
`mapshaper -i map.geojson -clip bbox=#{left},#{bottom},#{right},#{top} -proj webmercator -style fill=none stroke=black stroke-width=1 -o format=svg`
`node .`
