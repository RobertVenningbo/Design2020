/*$(document).ready(function () {
  $(".sidenav").sidenav();
});
*/
var i = 0;

document.addEventListener("DOMContentLoaded", function () {
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
});
/*
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


var limit = 2; // <---max no of lines you want in textarea
var textarea = document.getElementById("imageDesc");
var spaces = textarea.getAttribute("cols");

textarea.onkeyup = function() {
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
 ev.currentTarget.replaceChild (span, spanTgt);
 spanParent.appendChild (spanTgt);
})

const api = 'https://itu-sdbg-s2020.now.sh/api/themes';
async function changeTheme(clicked_id) {
  const response = await fetch(api);
  const json = await response.json();
  if(clicked_id == "0") {
    document.getElementById("nav").classList.add('indigo');
    document.getElementById("upload_btn").classList.add('blue');
    document.getElementById("title").style["font-family"] = "Helvetica";
    document.getElementById("card-title").style["font-family"] = "Helvetica";


    
  }
  if(clicked_id == "1") {
    console.log(json.themes[0].id);
    console.log(json.themes[0].styles['secondaryColor']);
    document.getElementById("card-title").style["font-name"] = json.themes[0].styles['fontName'];
    document.getElementById("card-title").style["font-family"] = json.themes[0].styles['fontFamily'];
    document.getElementById("title").style["font-family"] = json.themes[0].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[0].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[0].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
  if(clicked_id == "2") {
    console.log(json.themes[1].id);
    document.getElementById("card-title").style["font-name"] = json.themes[1].styles['fontName'];
    document.getElementById("card-title").style["font-family"] = json.themes[1].styles['fontFamily'];
    document.getElementById("title").style["font-family"] = json.themes[1].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[1].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[1].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
  if(clicked_id == "3") {
    console.log(json.themes[2].id);
    document.getElementById("card-title").style["font-name"] = json.themes[2].styles['fontName'];
    document.getElementById("card-title").style["font-family"] = json.themes[2].styles['fontFamily'];
    document.getElementById("title").style["font-family"] = json.themes[2].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[2].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[2].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
}
