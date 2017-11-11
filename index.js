var PDFDocument = require ('pdfkit');
var ArucoMarker = require('aruco-marker');
var SVGtoPDF = require('svg-to-pdfkit');
var random = require("node-random");

PDFDocument.prototype.addSVG = function(svg, x, y, options) {
  return SVGtoPDF(this, svg, x, y, options), this;
};

var fs = require('fs');

var size = 125;

var offset = 18;


doc = new PDFDocument();

doc.pipe(fs.createWriteStream('markers.pdf'));
doc.fontSize(8);

for (var i = 0; i < 5; ++i) {
  for (var j = 0; j < 4; ++j) {
    
    var id = randomIntInc(0, 1023);
    var marker = new ArucoMarker(id);

    var svg = marker.toSVG();

    var x = offset + j * (size + offset + 5);
    var y = offset + i * (size + offset - 3);
    
    doc.addSVG(svg, x, y,{width: size, height: size});
	       
    doc.text('id= ' + id, x, y + size + 2);
  }
}

doc.end();


function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
