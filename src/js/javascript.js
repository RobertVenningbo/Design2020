 /****************************************\
|     Lavet af: Thomas                    |
\****************************************/

var i = 0;

M.AutoInit();

function filePreview(imgSRC) {
  if (i == 0) {
    var imageContainer = document.getElementById("duplicater" + 0);
    var img = imageContainer.querySelector("img");
    img.src = imgSRC;
  } else {
    duplicate();
    var imageContainer = document.getElementById("duplicater" + i);
    var img = imageContainer.querySelector("img");
    img.src = imgSRC;
  }
  i++;
}

function uploadPressed() {
  var img = canvas.toDataURL("image/png");
  filePreview(img);
}


 /***************************************************************\
| Made by Oskar & Jeppe with help from Philip, Robert and Thomas |       
\***************************************************************/

var canvas = new fabric.Canvas("C");
var currentColor = "#000000";
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var grayScale = false;
var currentImage;
var imgHeight;
var imgWidth;

function setBackgroundImage(input) {
  canvas.setWidth(600);
  canvas.setHeight(500);
  document.getElementById("picture-text").value = "";
  canvas.clear();
  currentColor = "#000000";
  document.getElementById("color-button").style.color = "#FFFFFF";
  canvas.isDrawingMode = false;
  document.getElementById("draw-on-canvas-button").style.backgroundColor = "#81939D"; //reset drawing icon on picture load
  return new Promise((resolve, reject) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
      fabric.Image.fromURL(reader.result, function (img) {
        currentImage = img;
        document.getElementById("edit-modal-trigger").click();
        fitPictureToCanvas(img);
      });
      resolve(e.target.result);
      };
      reader.onerror = () => {
        reject();
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      reject();
    }
  });
}

function fitPictureToCanvas(img){
  
    scalePictureToWidth(img);
  
  canvas.setBackgroundImage(img);
  canvas.requestRenderAll();
  if (document.getElementById("canvas-container").offsetWidth < canvasWidth) {
    fitResponsiveCanvas();
    scalePictureToWidth(currentImage);
  }
  document.getElementById("picture-text").style.width = document.getElementById("C").style.width;
  document.getElementById("canvas-buttons").style.width = document.getElementById("C").style.width;
}

function scalePictureToWidth(img) {
  img.scaleToWidth(canvas.width);
  var scaleY = canvas.width / img.width;
  canvas.setHeight(img.height * scaleY);
}

function scalePictureToHeight(img) {
  img.scaleToHeight(canvas.height);
  var scaleX = canvas.height / img.height;
  canvas.setWidth(img.width * scaleX);
}

function removeObject() {
  canvas.remove(canvas.getActiveObject());
}

function toggleDrawOnCanvas() {
  if (canvas.isDrawingMode == true) {
    canvas.isDrawingMode = false;
    document.getElementById("draw-on-canvas-button").style.backgroundColor = "#81939D";
  } else {
    canvas.isDrawingMode = true;
    document.getElementById("draw-on-canvas-button").style.backgroundColor = "#64727a";
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = 3;
  }
}

color_input.onchange = (event) => {
  currentColor = document.getElementById("color_input").value;
  canvas.freeDrawingBrush.color = currentColor;
  document.getElementById("color-button").style.color = currentColor;
};

 /****************************************************************\ 
| Inspired by: https://github.com/fabricjs/fabric.js/issues/1270  |
\****************************************************************/

window.onresize = (event) => {
  if (document.getElementById("canvas-container").offsetWidth < canvasWidth) {
    fitResponsiveCanvas();
    if (currentImage != null){
      scalePictureToWidth(currentImage);
    }
  }
  document.getElementById("picture-text").style.width= document.getElementById("C").style.width;
  document.getElementById("canvas-buttons").style.width = document.getElementById("C").style.width;
};

function fitResponsiveCanvas() { 
  let containerSize = {
    width: document.getElementById("canvas-container").offsetWidth,
  };
  canvas.setWidth(containerSize.width);
}

function Addtext() {
  var text = document.getElementById("picture-text").value;
  canvas.add(
    new fabric.IText(text, {
      left: 100,
      top: 100,
      fill: currentColor,
      stroke: "#000000",
      strokeWidth: 0.3,
      fontSize: 35,
    })
  );
  document.getElementById("picture-text").value = "";
}

document.getElementById("picture-text").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      Addtext();
    }
  });


 /***********************************************\ 
|Taken from: https://codepen.io/Jadev/pen/mLNzmB |
\***********************************************/

canvas.on("object:added", function () {
  if (!isRedoing) {
    h = [];
  }
  isRedoing = false;
});

var isRedoing = false;
var h = [];

function undo() {
  if (canvas._objects.length > 0) {
    h.push(canvas._objects.pop());
    canvas.renderAll();
  }
}

function redo() {
  if (h.length > 0) {
    isRedoing = true;
    canvas.add(h.pop());
  }
}

function toggleGrayScale(){
  if(grayScale == true){
    currentImage.filters=[];
    currentImage.applyFilters();
    fitPictureToCanvas(currentImage);
    document.getElementById("grayScaleIcon").textContent = "invert_colors";
    grayScale = false;
  } else {
    fabric.textureSize = 4096;
    currentImage.filters.push(new fabric.Image.filters.Grayscale());
    var tmpImage = currentImage;
    tmpImage.applyFilters();
    fitPictureToCanvas(tmpImage);
    document.getElementById("grayScaleIcon").textContent = "invert_colors_off";
    grayScale = true;
  }
}

//tooltips
const elemsToolTip = document.querySelectorAll(".tooltipped");
const instanceTooltip = M.Tooltip.init(elemsToolTip, {
  enterDelay: 600
}) 


 /******************************************************\
|     Made by: Thomas with help from Robert & Philip    |
\******************************************************/

function duplicate() {
  var original = null;
  for (let index = 0; index < 1000; index++) { 
    original = document.getElementById("duplicater" + (index));
    if(original != null){
      break;
    }
  }
  
  var clone = original.cloneNode(true); // "deep" clone

  clone.children[0].children[1].children[1].children[0].value = ""; //Sætter 'description' til empty string
  clone.children[0].children[1].children[0].value = ""; //Sætter 'title' til empty string

  clone.children[0].children[1].children[1].children[0].id = "imageDesc" + i; //Så consolen ikke brokker sig over elementer med samme id.
  clone.children[0].children[1].children[0].id = "pic-title" + i; //Så consolen ikke brokker sig over elementer med samme id.
  clone.children[0].children[2].children[0].id = "trashCan" + i;
  clone.id = "duplicater" + i; // there can only be one element with an ID
  clone.querySelector("img").id = "drag" + i;

  original.parentNode.appendChild(clone);
}

 /****************************\
|     Made by: Robert         |
\****************************/


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("src", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var src = document.getElementById(ev.dataTransfer.getData("src"));
  var srcParent = src.parentNode;
  var tgt = ev.currentTarget.firstElementChild;

  const first = src.parentNode.parentNode.children.item(1);
  const last = ev.currentTarget.parentNode.children.item(1);

  const firstClone = first.cloneNode(true);
  const lastClone = last.cloneNode(true);

  ev.currentTarget.replaceChild(src, tgt);
  srcParent.appendChild(tgt);
  last.replaceWith(firstClone);
  first.replaceWith(lastClone);
}

var modal = document.getElementById("preview-modal")
function show(event){
  event.preventDefault();
  document.getElementById("photo-modal-trigger").click;
  var target = event.target; //billedet man klikker på
  var modalImg = document.getElementById("img01"); // billedet man overskriver
   modalImg.src = target.src; //datatransfer
   var captionText = document.getElementById("caption");
   var descText = document.getElementById("caption1");
   captionText.innerHTML = target.parentNode.parentNode.children[1].children[0].value; //henter billedets "title"-tekst
   descText.innerHTML = target.parentNode.parentNode.children[1].children[1].children[0].value; //henter billedets "description"-tekst
   modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

var limit = 2; // <---max no. of lines you want in textarea
var textarea = document.getElementById("imageDesc");
var spaces = textarea.getAttribute("cols");

textarea.onkeydown = function () {
 /****************************************************************************\ 
| Taken from https://stackoverflow.com/questions/22731394/max-lines-textarea  |
\****************************************************************************/

  var lines = textarea.value.split("\n");

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length <= spaces) continue;
    var j = 0;

    var space = spaces;

    while (j++ <= spaces) {
      if (lines[i].charAt(j) === " ") space = j;
    }
    lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
    lines[i] = lines[i].substring(0, space);
  }
  if (lines.length > limit) {
    textarea.style.color = "red";
    setTimeout(function () {
      textarea.style.color = "";
    }, 500);
  }
  textarea.value = lines.slice(0, limit).join("\n");
};


 /****************************************\
|     Made by: Philip                     |
\****************************************/

function removeCard(event){
  if(document.getElementsByClassName("card").length > 1) {
    if (window.confirm("Are you sure you want to delete this picture?")) { 
      event.preventDefault();
      var src = event.target;
      superParent = src.parentNode.parentNode.parentNode;
      superParent.remove();
    }else{
      return;
    }
  }else{
    alert("Unfortunately you can't delete a picture if only one picture is left.")
  }
}

const api = 'https://itu-sdbg-s2020.now.sh/api/themes';
async function changeTheme(clicked_id) {
  const response = await fetch(api);
  const json = await response.json();
  if(clicked_id == "0" || clicked_id == "4") {
    document.getElementById("nav").style.backgroundColor = "#0FA3B1";
    document.getElementById("upload-button").style.backgroundColor = "#81939D";
    document.getElementById("title").style["font-family"] = "Helvetica";
    document.getElementById("plus-button").style.backgroundColor = "#81939D";
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = "Helvetica";
        document.getElementsByClassName("card-title")[i].style["font-family"] = "Helvetica";
    }
  }
  if(clicked_id == "1" || clicked_id == "5") {
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = json.themes[0].styles['fontName'];
        document.getElementsByClassName("card-title")[i].style["font-family"] = json.themes[0].styles['fontFamily'];
    }
    document.getElementById("upload-button").classList.remove('color-tertiary');
    document.getElementById("plus-button").classList.remove('color-tertiary');
    document.getElementById("title").style["font-family"] = json.themes[0].styles['fontFamily'];
    document.getElementById("upload-button").style.backgroundColor = "#" + json.themes[0].styles['primaryColor'];
    document.getElementById("plus-button").style.backgroundColor = "#" + json.themes[0].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[0].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    
  }
  if(clicked_id == "2" || clicked_id == "6") {
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = json.themes[1].styles['fontName'];
        document.getElementsByClassName("card-title")[i].style["font-family"] = json.themes[1].styles['fontFamily'];
    }
    document.getElementById("upload-button").classList.remove('color-tertiary');
    document.getElementById("plus-button").classList.remove('color-tertiary');

    document.getElementById("title").style["font-family"] = json.themes[1].styles['fontFamily'];
    document.getElementById("upload-button").style.backgroundColor = "#" + json.themes[1].styles['primaryColor'];
    document.getElementById("plus-button").style.backgroundColor = "#" + json.themes[1].styles['primaryColor'];

    document.getElementById("nav").style.backgroundColor = "#" + json.themes[1].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    
  }
  if(clicked_id == "3" || clicked_id == "7") {
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = json.themes[2].styles['fontName'];
        document.getElementsByClassName("card-title")[i].style["font-family"] = json.themes[2].styles['fontFamily'];
    }
    document.getElementById("upload-button").classList.remove('color-tertiary');
    document.getElementById("plus-button").classList.remove('color-tertiary');

    document.getElementById("title").style["font-family"] = json.themes[2].styles['fontFamily'];
    document.getElementById("upload-button").style.backgroundColor = "#" + json.themes[2].styles['primaryColor'];
    document.getElementById("plus-button").style.backgroundColor = "#" + json.themes[2].styles['primaryColor'];

    document.getElementById("nav").style.backgroundColor = "#" + json.themes[2].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    
  }
}