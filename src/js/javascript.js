/*$(document).ready(function () {
  $(".sidenav").sidenav();
});
*/
var i = 0;

/*document.addEventListener("DOMContentLoaded", function () {
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});
*/
M.AutoInit();

function chooseFile() {
  document.getElementById("fileInput").click();
}

function filePreview(imgSRC) {   
  /*var img = document.getElementById("imagePreview");
  img.src = reader.result;
  img.width = 300;*/
  duplicate();
  var imageContainer = document.getElementById("duplicater" + i);
  i++;
  var img = imageContainer.querySelector("img");
  img.src = imgSRC;
}

function uploadePressed(){
var img = canvas.toDataURL("image/png");
filePreview(img);
}

var canvas = new fabric.Canvas('C');
var canvasWidth  = canvas.width;
var canvasHeight = canvas.height;
var currentImage;
var imgHeight;
var imgWidth;

function setBackgroundImage(input){
  canvas.setWidth(500);
  canvas.setHeight(500);
  document.getElementById("pictureText").value = "";
  canvas.clear();
  return new Promise((resolve, reject) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {          
        fabric.Image.fromURL(reader.result, function (img) {   
        currentImage = img;       
        if (img.height > img.width){
          scalePictureToHeight(img);
        } else {
          scalePictureToWidth(img);
        }   
        canvas.setBackgroundImage(img);
        canvas.requestRenderAll();
        
        document.getElementById("modalTriggerButton").click();
        if(document.getElementById('canvasContainer').offsetWidth < canvasWidth){
          fitResponsiveCanvas();
          scalePictureToWidth(currentImage);
        }
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

function scalePictureToWidth(img) {
  img.scaleToWidth(canvas.width);
  var scaleY = canvas.width / img.width;
  canvas.setHeight(img.height*scaleY);
}

function scalePictureToHeight(img){
  img.scaleToHeight(canvas.height);
  var scaleX = canvas.height / img.height;
  canvas.setWidth(img.width*scaleX);
}

function removeObject(){
  canvas.remove(canvas.getActiveObject());
}

function toggleDrawOnCanvas(){
  if(canvas.isDrawingMode == true){
    canvas.isDrawingMode = false;
    document.getElementById("drawOnCanvasButton").style.backgroundColor = "#81939D";
  } else {
    canvas.isDrawingMode = true;
    document.getElementById("drawOnCanvasButton").style.backgroundColor = "#64727a";
    canvas.freeDrawingBrush.width = 3;
  }
}

document.getElementById("colorInput").onchange = (event) =>{
  
  document.getElementById("colorButton").style.color = document.getElementById("colorInput").value;
  canvas.freeDrawingBrush.color = document.getElementById("colorInput").value;
}

 /***********************************************\ 
| Mangler at skrive hvor resize er taget fra     |
\***********************************************/ 



window.onresize = (event) => {
  if(document.getElementById('canvasContainer').offsetWidth < canvasWidth){
    fitResponsiveCanvas();
    scalePictureToWidth(currentImage);
  }
};

function fitResponsiveCanvas() {
  // canvas dimensions
  let canvasSize = {
    width: 500,
  };
  // canvas container dimensions
  let containerSize = {
    width: document.getElementById('canvasContainer').offsetWidth
  };
  let scaleRatio = Math.min(containerSize.width / canvasSize.width);
  canvas.setWidth(containerSize.width);         
}

function Addtext() {
  var text = document.getElementById("pictureText").value;
  canvas.add(new fabric.IText(text, {
      left: 100,
      top: 100,
      fill: document.getElementById("colorInput").value,
      stroke: "#000000",
      strokeWidth: 0.3,
      fontSize: 35
  }));
  document.getElementById("pictureText").value = "";
}

document.getElementById("pictureText").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      Addtext();
  }
});

  
 /***********************************************\ 
| Taken from https://codepen.io/Jadev/pen/mLNzmB |
\***********************************************/ 

canvas.on('object:added',function(){
  if(!isRedoing){
    h = [];
  }
  isRedoing = false;
});

var isRedoing = false;
var h = [];

function undo(){
  if(canvas._objects.length>0){
   h.push(canvas._objects.pop());
   canvas.renderAll();
  }
}

function redo(){  
  if (h.length > 0) {
    isRedoing = true;
   canvas.add(h.pop());
  }
}

/*function filePreview() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("image-input").files[0]);

  oFReader.onload = function (oFREvent) {
      document.getElementById("imageId").src = oFREvent.target.result;
  };
}
*/

function duplicate() {
  var original = document.getElementById("duplicater" + i); 

  var clone = original.cloneNode(true); // "deep" clone
  
  clone.children[0].children[1].children[1].children[0].value = ""; //Sætter 'description' til empty string
  clone.children[0].children[1].children[0].value = ""; //Sætter 'title' til empty string

  clone.children[0].children[1].children[1].children[0].id = ("imageDesc" + i); //Så consolen ikke brokker sig over elementer med samme id.
  clone.children[0].children[1].children[0].id = ("imageDesc" + i);             //Så consolen ikke brokker sig over elementer med samme id.
  clone.id = "duplicater" + (i + 1); // there can only be one element with an ID
  clone.querySelector("img").id = "drag" + (i + 1);
  //let child = clone.querySelector("img");
  //child.addEventListener("click", chooseFile());
  //onclick = chooseFile(); // event handlers are not cloned

  original.parentNode.appendChild(clone);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("src", ev.target.id);
}

var modal = document.getElementById("modalPreview")
 //inspireret af https://www.w3schools.com/howto/howto_css_modal_images.asp (IKKE ALT ER TAGET DERFRA)
function show(event){
  event.preventDefault();
  var target = event.target; //billedets URL man klikker på
  var modalImg = document.getElementById("img01"); // billedet man overskriver
   modalImg.src = target.src; //datatransfer
   modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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

var limit = 2; // <---max no. of lines you want in textarea
var textarea = document.getElementById("imageDesc");
var spaces = textarea.getAttribute("cols");

textarea.onkeydown = function () {

/****************************************************************************\ 
| Taken from https://stackoverflow.com/questions/22731394/max-lines-textarea |
\****************************************************************************/

  var lines = textarea.value.split("\n");

   for (var i = 0; i < lines.length; i++) 
   {
         if (lines[i].length <= spaces) continue;
         var j = 0;

        var space = spaces;

        while (j++ <= spaces) 
        {
           if (lines[i].charAt(j) === " ") space = j;  
        }
    lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
    lines[i] = lines[i].substring(0, space);
  }
    if(lines.length>limit)
    {
        textarea.style.color = 'red';
        setTimeout(function(){
            textarea.style.color = '';
        },500);
    }    
   textarea.value = lines.slice(0, limit).join("\n");
};
