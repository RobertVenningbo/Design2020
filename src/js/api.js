const api = 'https://itu-sdbg-s2020.now.sh/api/themes';
async function changeTheme(clicked_id) {
  const response = await fetch(api);
  const json = await response.json();
  if(clicked_id == "0") {
    document.getElementById("nav").style.backgroundColor = "#0FA3B1";
    document.getElementById("upload_btn").style.backgroundColor = "#81939D";
    document.getElementById("title").style["font-family"] = "Helvetica";
    document.getElementById("plusbtn").style.backgroundColor = "#81939D";
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = "Helvetica";
        document.getElementsByClassName("card-title")[i].style["font-family"] = "Helvetica";
    }
  }
  if(clicked_id == "1") {
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = json.themes[0].styles['fontName'];
        document.getElementsByClassName("card-title")[i].style["font-family"] = json.themes[0].styles['fontFamily'];
    }
    document.getElementById("title").style["font-family"] = json.themes[0].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[0].styles['primaryColor'];
    document.getElementById("plusbtn").style.backgroundColor = "#" + json.themes[0].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[0].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
  if(clicked_id == "2") {
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = json.themes[1].styles['fontName'];
        document.getElementsByClassName("card-title")[i].style["font-family"] = json.themes[1].styles['fontFamily'];
    }
    document.getElementById("title").style["font-family"] = json.themes[1].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[1].styles['primaryColor'];
    document.getElementById("plusbtn").style.backgroundColor = "#" + json.themes[1].styles['primaryColor'];

    document.getElementById("nav").style.backgroundColor = "#" + json.themes[1].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
  if(clicked_id == "3") {
    for(var i = 0; i < document.getElementsByClassName("card-title").length; i++) {
        document.getElementsByClassName("card-title")[i].style["font-name"] = json.themes[2].styles['fontName'];
        document.getElementsByClassName("card-title")[i].style["font-family"] = json.themes[2].styles['fontFamily'];
    }
    document.getElementById("title").style["font-family"] = json.themes[2].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[2].styles['primaryColor'];
    document.getElementById("plusbtn").style.backgroundColor = "#" + json.themes[2].styles['primaryColor'];

    document.getElementById("nav").style.backgroundColor = "#" + json.themes[2].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
}
