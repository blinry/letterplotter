var paper = require("paper-jsdom")
var opentype = require("opentype.js")
const fs = require("fs")

function combineGroup(compound, group) {
    with (paper) {
        for(var i = 0; i < group.children.length; i++) {
            var child = group.children[i]
            if (child instanceof Group) {
                combineGroup(compound, child)
            } else if (child instanceof CompoundPath) {
                for(var j = 0; j < child.children.length; j++) {
                    compound.addChild(child.children[j].clone({insert: false}))
                }
            } else if (child instanceof Path) {
                compound.addChild(child.clone({insert: false}))
            } else {
                console.log(child)
            }
        }
    }
}

function svgLoaded(item, data) {
    with (paper) {
    //var group = new Group()

    var rect = new Rectangle(new Point(0, 0), new Size(w, h))
    var shape = new Path.Rectangle(rect)
    shape.strokeColor = "black"

    var address = new Rectangle(new Point(0.5*w, 0.6*h), new Size(0.43*w, 0.3*h))
    var shape2 = new Path.Rectangle(address)
    shape2.strokeColor = "black"

    //new PointText({point: new Point(0.53*w, 0.68*h), content: text, strokeColor: "black", fontSize: h/20.7, fontFamily: "Almendra Display"})

    var cutrect = new Rectangle(new Point(border, border), new Size(w-2*border, h-2*border))
    var cutrectshape = new Path.Rectangle(cutrect)
    cutrectshape.remove()

    item.fitBounds(cutrect, true)
    item.scale(1.01) // to remove the outline
    var c = new CompoundPath()
    var newc = new CompoundPath()
    combineGroup(c, item)
    //c.strokeColor = "black"
    for(var i = 0; i < c.children.length; i++) {
        var child = c.children[i]
        newc.addChild(child.intersect(cutrectshape, {trace: false}))
    }

    var newc2 = new CompoundPath()
    for(var i = 0; i < newc.children.length; i++) {
        var child = newc.children[i]
        newc2.addChild(child.subtract(shape2, {trace: false}))
    }

    newc2.strokeColor = "black"

    c.remove()
    newc.remove()

    shape.remove()
    shape2.remove()
    everything.addChild(newc2)

    //downloadAsSVG("map")

    var text = fs.readFileSync("text", "utf8")
    opentype.load("AlmendraDisplay-Regular.ttf", function (err, font) {
        var lines = text.split("\n")
        for (var line = 0; line < lines.length; line++) {
            var y = 0.68*h + line*h/20.7*1.2
            var fontpaths = font.getPaths(lines[line], 0.53*w, y, h/20.7)
            for(var i = 0; i<fontpaths.length; i++) {
                const svg = '' +
                '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="'+w+'px" height="'+h+'">' +
                fontpaths[i].toSVG() +
                '</svg>';
                project.importSVG(svg, {onLoad: function(item, data) {
                    item.strokeColor = "black"
                    everything.addChild(item)

                }, expandShapes: true})
            }

        }

        //everything.rotate(90)
        //everything.translate(-(w/2-h/2), w/2-h/2)
        everything.translate(offset_x, -offset_y)

        var svg = paper.project.exportSVG({asString: true})
        fs.writeFile("result.svg", svg, function (err, data) {
            if (err) {
                return console.log(err);
            }
        })
    })
    }
}

var border = 5 * 96 / 25.4
var w = 162 * 96 / 25.4
var h = 113 * 96 / 25.4

var offset_x = -6 * 96/25.4
var offset_y = 19 * 96/25.4

with (paper) {
    paper.setup(new Size(w, h))

    var everything = new Group()

    paper.project.importSVG("map.svg", {onLoad: svgLoaded, expandShapes: true, insert: false})
}
