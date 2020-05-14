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
    document.getElementById("pic-title").style["font-name"] = json.themes[0].styles['fontName'];
    document.getElementById("pic-title").style["font-family"] = json.themes[0].styles['fontFamily'];
    document.getElementById("title").style["font-family"] = json.themes[0].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[0].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[0].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
  if(clicked_id == "2") {
    document.getElementById("pic-title").style["font-name"] = json.themes[1].styles['fontName'];
    document.getElementById("pic-title").style["font-family"] = json.themes[1].styles['fontFamily'];
    document.getElementById("title").style["font-family"] = json.themes[1].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[1].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[1].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
  if(clicked_id == "3") {
    document.getElementById("pic-title").style["font-name"] = json.themes[2].styles['fontName'];
    document.getElementById("pic-title").style["font-family"] = json.themes[2].styles['fontFamily'];
    document.getElementById("title").style["font-family"] = json.themes[2].styles['fontFamily'];
    document.getElementById("upload_btn").style.backgroundColor = "#" + json.themes[2].styles['primaryColor'];
    document.getElementById("nav").style.backgroundColor = "#" + json.themes[2].styles['secondaryColor'];
    document.getElementById("nav").classList.remove('indigo');
    document.getElementById("upload_btn").classList.remove('blue');
  }
}
