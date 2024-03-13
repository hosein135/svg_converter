var image;

function run(){
	let svggg = gg;
	document.querySelector("#userSVG").value = svggg;
const svgDraw = document.getElementById("svgDraw");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const DOMURL = window.URL || window.webkitURL || window;

let svg;

// append the SVG to the SVG area
function appendSVG() {
	let svgValue = document.querySelector("#userSVG").value;
	const wrapper = document.createElement("div");
	wrapper.innerHTML = svgValue;
	svg = wrapper.firstChild;
	svgDraw.innerHTML = "";
	svgDraw.appendChild(svg);
}

// create the PNG Image
function createImage(type = "png") {
	canvas.width = svg.clientWidth;
	canvas.height = svg.clientHeight;

	const svgString = new XMLSerializer().serializeToString(svg);

	const img = new Image();

	const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });

	const url = DOMURL.createObjectURL(svgBlob);

	img.src = url;
	img.onload = () => {
		// redraw the image
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			// Set red component to 255
			data[i] = 255;
			// Set green component to 0
			data[i + 1] = 255;
			// Set blue component to 0
			data[i + 2] = 255;
		  }
		  ctx.putImageData(imageData, 0, 0);
		  var modifiedImageDataUrl = canvas.toDataURL('image/jpeg');
		DOMURL.revokeObjectURL(url);
		image = canvas.toDataURL(`image/${type}`);
		let imgg = document.createElement("img");
		imgg.src = modifiedImageDataUrl;
		document.querySelector(".imageHere").innerHTML = "";
		
		const span = document.createElement('span');
		const br = document.createElement('br');
		span.classList.add('badge', 'badge-dark', 'float-right');
		span.innerText = type;
		
		document.querySelector(".imageHere").appendChild(span);
		document.querySelector(".imageHere").appendChild(br);
		document.querySelector(".imageHere").appendChild(imgg);
	};
}

// initial append
appendSVG();
function downloadFilteredImage(imageUrl, filter) {
	const img = new Image();
	img.crossOrigin = "anonymous"; // Allow cross-origin image loading if necessary
  
	img.onload = function() {
	  const canvas = document.createElement("canvas");
	  const ctx = canvas.getContext("2d");
  
	  // Set canvas dimensions based on image
	  canvas.width = img.width;
	  canvas.height = img.height;
  
	  // Apply the desired filter using CSS filters polyfill (if needed)
	  if (typeof ctx.filter === "undefined") {
		// Use a polyfill if filter is not natively supported
		console.warn("CSS filters not natively supported. Using polyfill...");
		// Implement or include a CSS filter polyfill here
	  } else {
		ctx.filter = filter;
	  }
  
	  // Draw the image onto the canvas with the filter applied
	  ctx.drawImage(img, 0, 0);
  
	  // Download the canvas content as an image
	  const link = document.createElement("a");
	  link.href = canvas.toDataURL("image/jpeg"); // Adjust format as needed (e.g., "image/png")
	  link.download = svgName + ".jpg"; // Choose a desired filename
	  link.click();
	};
  
	// Set the image source and trigger loading
	img.src = imageUrl;
  }
// LISTENERS
createImage("jpeg");
document.querySelector("#convertJPG").addEventListener("click", () => {
		const imageUrl = image;
const filter = "invert(100%)"; // Customize the filter as needed

downloadFilteredImage(imageUrl, filter);
});
function down(){
	
};
    document.querySelector("#convertSVG").addEventListener("click", () => {
        let content = document.getElementById('svgDraw').innerHTML;
        var link2 = document.createElement('a');
        link2.href = 'data:attachment/text,' + encodeURI(content);
        link2.download = svgName + '.svg';
        link2.click();
    });
    document.querySelector("#convertPNG").addEventListener("click", () => {
        let content = document.getElementById('svgDraw').innerHTML;
//        let last = new XMLSerializer().serializeToString(content.documentElement);
        function saveSVGAsPNG(svg_string, fileName) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set the canvas dimensions to match the SVG
  const svgElement = document.createElement('div');
  svgElement.innerHTML = svg_string;
  const svgWidth = svgElement.querySelector('svg').getAttribute('width');
  const svgHeight = svgElement.querySelector('svg').getAttribute('height');
  canvas.width = parseInt(svgWidth);
  canvas.height = parseInt(svgHeight);

  canvg(canvas, svg_string, { ignoreMouse: true, ignoreAnimation: true });

  // Convert the canvas to PNG image data
  const pngDataUrl = canvas.toDataURL('image/png');


  const link1 = document.createElement('a');
  link1.href = pngDataUrl;
  link1.download = fileName;
                

  link1.click();
        }
        saveSVGAsPNG(content, svgName + ".png");
        });
};
let gg;
const svgString = localStorage.getItem('svg');
let svgName = localStorage.getItem('svg_name');
displaySVG(svgString);

function handleFileSelect(event) {
    const file = event.target.files[0];

    if (!file) {
        alert('No file selected.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const svgContent = event.target.result;
        displaySVG(svgContent);
        svgName = "image";
    };

    reader.readAsText(file);
}

function displaySVG(svgContent) {
	
    const svgContainer = document.getElementById('svgDraw');
    svgContainer.innerHTML = svgContent;
	gg = svgContent;
	run();
}

//png file generator - end
const btn2 = document.querySelector('#convertPDF');
btn2.addEventListener('click', function () {
    let svg = document.getElementsByTagName("svg")[0];
let doc = new PDFDocument({compress: false});
    SVGtoPDF(doc, svg, 0, 0);
    let stream = doc.pipe(blobStream());
    stream.on('finish', () => {
      let blob = stream.toBlob('application/pdf');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = svgName + ".pdf";
      link.click();
    });
    doc.end();
});