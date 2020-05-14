/*$(document).ready(function () {
  $(".sidenav").sidenav();
});
*/
var i = 0;

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});

function chooseFile() {
  document.getElementById("fileInput").click();
}

function filePreview(input) {
  return new Promise((resolve, reject) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        /*var img = document.getElementById("imagePreview");
        img.src = reader.result;
        img.width = 300;*/
        duplicate();
        var imageContainer = document.getElementById("duplicater" + i);
        i++;
        var img = imageContainer.querySelector("img");
        img.src = reader.result;
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
  clone.querySelector("span").innerText = ("happy boiii" + i); //DETTE ER EN TEST
  clone.id = "duplicater" + (i + 1); // there can only be one element with an ID
  clone.querySelector("img").id = ("drag" + (i+1)); 
  
  //let child = clone.querySelector("img");
  //child.addEventListener("click", chooseFile());
  //onclick = chooseFile(); // event handlers are not cloned

  original.parentNode.appendChild(clone);
}

function allowDrop (ev) {
  ev.preventDefault ();
}

function drag (ev) {
 ev.dataTransfer.setData ("src", ev.target.id);
}

function drop (ev) {
 ev.preventDefault ();
 var src = document.getElementById (ev.dataTransfer.getData ("src"));
 var srcParent = src.parentNode;
 var tgt = ev.currentTarget.firstElementChild;


 var span = document.getElementById (ev.dataTransfer.getData ("span"));//virker ikke  
 var spanParent = src.parentNode;                                      //virker ikke
 var spanTgt = ev.currentTarget.firstElementChild;                     //virker ikke 
 ev.currentTarget.replaceChild (src, tgt);                             //virker ikke  
 srcParent.appendChild (tgt);                                          //virker ikke

 ev.currentTarget.replaceChild (span, spanTgt);
 spanParent.appendChild (spanTgt);
}